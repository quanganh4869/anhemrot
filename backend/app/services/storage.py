import os
import shutil
import uuid
from pathlib import Path

# Local storage path. In production, this would be an S3 bucket interface.
STORAGE_DIR = Path("/app/uploads") if os.environ.get("DOCKER_ENV") else Path("uploads")

class StorageService:
    @staticmethod
    def ensure_dir():
        STORAGE_DIR.mkdir(parents=True, exist_ok=True)

    @staticmethod
    def save_file(file_bytes: bytes, extension: str) -> str:
        """Saves a file and returns its storage URL/Object key."""
        StorageService.ensure_dir()
        file_id = str(uuid.uuid4())
        filename = f"{file_id}{extension}"
        filepath = STORAGE_DIR / filename
        
        with open(filepath, "wb") as f:
            f.write(file_bytes)
            
        # In a real app with S3, this returns the S3 URL.
        # Here we return a relative URL path that FastAPI will serve.
        return f"/uploads/{filename}"

    @staticmethod
    def delete_file(storage_url: str):
        filename = storage_url.split("/")[-1]
        filepath = STORAGE_DIR / filename
        if filepath.exists():
            os.remove(filepath)
