from fastapi import APIRouter
from typing import List, Dict, Any
from app.database.db import get_all_analyses, save_analysis
from app.processing.demo_generator import generate_demo_dataset

router = APIRouter(prefix="/api", tags=["History"])

@router.get("/history")
def get_analysis_history():
    all_runs = get_all_analyses()
    if not all_runs:
        # Pre-seed database with 3 SIH demo scenarios
        ds1 = generate_demo_dataset("vegetation_loss")
        ds2 = generate_demo_dataset("flood_expansion")
        ds3 = generate_demo_dataset("urban_expansion")
        
        save_analysis(ds1)
        save_analysis(ds2)
        save_analysis(ds3)
        
        all_runs = [ds1, ds2, ds3]
        
    return all_runs
