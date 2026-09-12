from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import imports, auth, stories, chapters, scenes

app = FastAPI(
    title="Interactive Visual Storytelling API",
    description="API for the interactive cinematic web comic reading platform.",
    version="1.0.0"
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(stories.router, prefix="/api/v1/stories", tags=["stories"])
app.include_router(chapters.router, prefix="/api/v1", tags=["chapters"])
app.include_router(scenes.router, prefix="/api/v1", tags=["scenes"])
app.include_router(imports.router, prefix="/api/v1/import", tags=["import"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Interactive Visual Storytelling API"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
