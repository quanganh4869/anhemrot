from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Interactive Visual Storytelling API",
    description="API for the Scrollytelling platform",
    version="1.0.0"
)

# Setup CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Interactive Visual Storytelling API"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
