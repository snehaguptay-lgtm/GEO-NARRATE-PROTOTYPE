from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.models.schemas import QueryRequest, QueryResponse
from app.narration.llm_narrator import generate_grounded_narration
from app.database.db import get_analysis, save_query
from app.processing.demo_generator import generate_demo_dataset

router = APIRouter(prefix="/api", tags=["Query & Narration"])

@router.post("/query", response_model=QueryResponse)
@router.post("/narrate", response_model=QueryResponse)
def ask_geonarrate(payload: QueryRequest):
    analysis_id = payload.analysis_id
    query_text = payload.query
    
    # Retrieve analysis statistics
    analysis_data = get_analysis(analysis_id)
    if not analysis_data:
        analysis_data = generate_demo_dataset("vegetation_loss")
        analysis_data["analysis_id"] = analysis_id
        
    # Generate grounded narration
    response = generate_grounded_narration(analysis_data, query_text)
    
    # Save query to history
    save_query(response)
    
    return response
