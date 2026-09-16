from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api", tags=["System & Datasets"])

@router.get("/datasets")
def get_available_datasets():
    return [
        {
            "id": "vegetation_loss",
            "title": "Seasonal Agricultural Harvest & Deforestation Scan",
            "location": "Cauvery Delta, Tamil Nadu",
            "before_date": "March 2026",
            "after_date": "September 2026",
            "satellite": "Bhuvan Cartosat-3 / Sentinel-2",
            "resolution": "10m Optical",
            "primary_change": "Vegetation Reduction (-18.7%)",
            "description": "Bi-temporal analysis of irrigated agricultural zones showing harvest clearance and canal ingress."
        },
        {
            "id": "flood_expansion",
            "title": "Monsoon Inundation & River Overflow Mapping",
            "location": "Kaziranga Basin, Assam",
            "before_date": "May 2026",
            "after_date": "July 2026",
            "satellite": "ISRO Cartosat-3 / Sentinel-1 SAR",
            "resolution": "10m SAR + Optical",
            "primary_change": "Water Inundation (+21.8%)",
            "description": "Multi-sensor analysis during heavy monsoon rains highlighting submerged agricultural and wildlife buffer zones."
        },
        {
            "id": "urban_expansion",
            "title": "Industrial Park Land Clearing & Infrastructure",
            "location": "Devanahalli Corridor, Bengaluru",
            "before_date": "January 2026",
            "after_date": "August 2026",
            "satellite": "Bhuvan Cartosat-2 / Sentinel-2B",
            "resolution": "5m High-Resolution",
            "primary_change": "Built-up & Land Clearing (+14.4%)",
            "description": "Urban development tracking showing loss of scrubland and construction of new industrial facilities."
        }
    ]

@router.get("/system/status")
def get_system_status():
    return {
        "status": "ONLINE",
        "mode": "DEMO / BHUVAN READY",
        "cpu_processing": "READY",
        "gdal_rasterio": "SIMULATED / ACTIVE",
        "otsu_engine": "ACTIVE",
        "llm_narration": "GROUNDED_STRICT_JSON",
        "version": "1.0.0-SIH2026"
    }
