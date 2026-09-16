from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import analysis, query, datasets, history
from app.database.db import init_db

app = FastAPI(
    title="GeoNarrate API",
    description="Explainable Change-Detection & Query Assistant for Satellite Imagery (Smart India Hackathon 2026 - SIH26167)",
    version="1.0.0"
)

# Configure CORS for local prototype frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SQLite database schema
init_db()

# Register API routes
app.include_router(analysis.router)
app.include_router(query.router)
app.include_router(datasets.router)
app.include_router(history.router)

@app.get("/")
def root_status():
    return {
        "app": "GeoNarrate",
        "description": "Explainable Satellite Change Detection & Query Assistant",
        "event": "Smart India Hackathon 2026 (SIH26167 - Team TECH6)",
        "status": "ONLINE",
        "documentation": "/docs"
    }
