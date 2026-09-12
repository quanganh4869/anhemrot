import uuid
from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.domain import ImportJob, Asset
from app.services.import_pipeline import ImportPipeline

router = APIRouter()

MAX_FILE_SIZE = 50 * 1024 * 1024 # 50 MB

@router.post("/upload")
async def upload_asset(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    # Read file completely into memory (fine for <= 50MB, larger needs stream parsing)
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Max 50MB.")

    # Validate MIME securely (ignoring extension)
    try:
        mime_type = ImportPipeline.validate_file(file_bytes, file.filename)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Create Job in DB
    job_id = str(uuid.uuid4())
    job = ImportJob(id=job_id, filename=file.filename)
    db.add(job)
    await db.commit()

    # Enqueue Background Task
    background_tasks.add_task(
        ImportPipeline.process_job,
        job_id,
        file_bytes,
        file.filename,
        mime_type,
        db
    )

    return {"job_id": job_id, "status": "pending", "message": "File is being processed in the background."}

@router.get("/jobs/{job_id}")
async def get_job_status(job_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ImportJob).where(ImportJob.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {
        "id": job.id,
        "filename": job.filename,
        "status": job.status,
        "progress": job.progress,
        "error_message": job.error_message,
        "result_metadata": job.result_metadata
    }

@router.get("/assets")
async def list_assets(db: AsyncSession = Depends(get_db)):
    # Simple list API
    result = await db.execute(select(Asset).order_by(Asset.created_at.desc()))
    assets = result.scalars().all()
    return [{"id": a.id, "filename": a.filename, "url": a.storage_url, "mime_type": a.mime_type} for a in assets]
