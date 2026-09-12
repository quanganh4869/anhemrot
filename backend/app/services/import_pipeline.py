import asyncio
import io
import uuid
from typing import List
import filetype
from PIL import Image
import fitz  # PyMuPDF
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from app.models.domain import ImportJob, JobStatus, Asset
from app.services.storage import StorageService

ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]

class ImportPipeline:
    @staticmethod
    def validate_file(file_bytes: bytes, filename: str) -> str:
        """Validates file signature. Returns the true MIME type."""
        kind = filetype.guess(file_bytes)
        if kind is None or kind.mime not in ALLOWED_MIME_TYPES:
            raise ValueError(f"Invalid file type. Allowed: {ALLOWED_MIME_TYPES}")
        return kind.mime

    @staticmethod
    async def process_job(job_id: str, file_bytes: bytes, filename: str, mime_type: str, session: AsyncSession):
        """Background worker function for processing the file."""
        try:
            # Update status to processing
            await session.execute(
                update(ImportJob).where(ImportJob.id == job_id).values(status=JobStatus.PROCESSING, progress=10)
            )
            await session.commit()

            assets_created = []

            if mime_type == "application/pdf":
                # Process PDF in thread to avoid blocking event loop
                assets_created = await asyncio.to_thread(
                    ImportPipeline._process_pdf_sync, file_bytes, job_id, session
                )
            else:
                # Process Single Image
                asset = await asyncio.to_thread(
                    ImportPipeline._process_image_sync, file_bytes, filename, mime_type, job_id
                )
                assets_created.append(asset)
            
            # Save assets to DB
            session.add_all(assets_created)
            
            # Mark completed
            await session.execute(
                update(ImportJob)
                .where(ImportJob.id == job_id)
                .values(
                    status=JobStatus.COMPLETED, 
                    progress=100,
                    result_metadata={"assets": [a.id for a in assets_created]}
                )
            )
            await session.commit()

        except Exception as e:
            await session.rollback()
            await session.execute(
                update(ImportJob).where(ImportJob.id == job_id).values(
                    status=JobStatus.FAILED, 
                    error_message=str(e)
                )
            )
            await session.commit()

    @staticmethod
    def _process_image_sync(file_bytes: bytes, filename: str, mime_type: str, job_id: str) -> Asset:
        """Processes a single image."""
        img = Image.open(io.BytesIO(file_bytes))
        width, height = img.size
        
        # Save to storage (we keep original extension or convert to webp)
        # For this pipeline, let's normalize to webp for performance if requested, 
        # but the prompt says "Admin có thể upload... WebP". We'll just save it as is.
        ext = filetype.guess_extension(file_bytes)
        ext = f".{ext}" if ext else ".bin"
        
        url = StorageService.save_file(file_bytes, ext)
        
        return Asset(
            id=str(uuid.uuid4()),
            filename=filename,
            storage_url=url,
            mime_type=mime_type,
            width=width,
            height=height,
            file_size=len(file_bytes),
            import_job_id=job_id
        )

    @staticmethod
    def _process_pdf_sync(file_bytes: bytes, job_id: str, session: AsyncSession) -> List[Asset]:
        """Extracts pages from PDF as high-quality WebP images."""
        assets = []
        pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
        
        total_pages = len(pdf_document)
        
        for page_num in range(total_pages):
            page = pdf_document.load_page(page_num)
            
            # Render page to a pixmap (image)
            # Matrix(2,2) increases resolution (approx 144 DPI)
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            
            # Convert to PIL Image
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            
            # Convert to WebP for optimized web delivery
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format="WEBP", quality=85)
            webp_bytes = img_byte_arr.getvalue()
            
            # Save to storage
            url = StorageService.save_file(webp_bytes, ".webp")
            
            asset = Asset(
                id=str(uuid.uuid4()),
                filename=f"page_{page_num + 1}.webp",
                storage_url=url,
                mime_type="image/webp",
                width=pix.width,
                height=pix.height,
                file_size=len(webp_bytes),
                import_job_id=job_id
            )
            assets.append(asset)
            
        pdf_document.close()
        return assets
