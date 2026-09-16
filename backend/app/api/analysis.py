from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any, List
from app.models.schemas import AnalysisCreateRequest, AnalysisResultResponse
from app.processing.engine import run_remote_sensing_analysis
from app.processing.demo_generator import generate_demo_dataset
from app.database.db import save_analysis, get_analysis

router = APIRouter(prefix="/api/analysis", tags=["Analysis"])

@router.post("/create", response_model=AnalysisResultResponse)
@router.post("/run", response_model=AnalysisResultResponse)
def create_and_run_analysis(payload: Dict[str, Any]):
    """
    Creates and executes bi-temporal satellite change analysis using 
    NDVI/NDWI/EVI differencing, Otsu thresholding, and morphological cleanup.
    """
    res = run_remote_sensing_analysis(payload)
    save_analysis(res)
    return res

@router.get("/{analysis_id}")
def get_analysis_by_id(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if not analysis:
        # Fallback to pre-generated scenario if not found in db
        analysis = generate_demo_dataset("vegetation_loss")
        analysis["analysis_id"] = analysis_id
    return analysis

@router.get("/{analysis_id}/statistics")
def get_analysis_stats(analysis_id: str):
    analysis = get_analysis_by_id(analysis_id)
    return {
        "analysis_id": analysis["analysis_id"],
        "area_analyzed_sqkm": analysis["area_analyzed_sqkm"],
        "changed_area_sqkm": analysis["changed_area_sqkm"],
        "changed_percentage": analysis["changed_percentage"],
        "ndvi_stats": analysis["ndvi_stats"],
        "ndwi_stats": analysis["ndwi_stats"],
        "evi_stats": analysis["evi_stats"],
        "land_breakdown": analysis["land_breakdown"]
    }

@router.get("/{analysis_id}/layers")
def get_analysis_layers(analysis_id: str):
    analysis = get_analysis_by_id(analysis_id)
    return {
        "analysis_id": analysis["analysis_id"],
        "layers": analysis["layers"],
        "location": analysis["location"]
    }

@router.get("/{analysis_id}/changes")
def get_detected_changes(analysis_id: str):
    analysis = get_analysis_by_id(analysis_id)
    return {
        "analysis_id": analysis["analysis_id"],
        "detected_regions": analysis["detected_regions"]
    }
