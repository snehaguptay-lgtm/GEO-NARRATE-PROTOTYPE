from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class LocationSelect(BaseModel):
    name: str = "Cauvery Delta, Tamil Nadu"
    lat: float = 10.7870
    lng: float = 79.1378
    zoom: int = 12

class ImageSelect(BaseModel):
    date_before: str = "2026-03-15"
    date_after: str = "2026-09-10"
    satellite_source: str = "Bhuvan Cartosat-3 / Sentinel-2"
    cloud_cover_before: float = 2.1
    cloud_cover_after: float = 4.5

class AnalysisConfig(BaseModel):
    scenario_id: str = "vegetation_loss" # vegetation_loss, flood_expansion, urban_expansion
    use_ndvi: bool = True
    use_ndwi: bool = True
    use_evi: bool = True
    use_otsu: bool = True
    use_morphology: bool = True
    use_sar_fallback: bool = False

class AnalysisCreateRequest(BaseModel):
    location: LocationSelect
    images: ImageSelect
    config: AnalysisConfig

class SpectralStats(BaseModel):
    before_mean: float
    after_mean: float
    difference_mean: float
    percentage_change: float

class CategoryBreakdown(BaseModel):
    unchanged_sqkm: float
    vegetation_loss_sqkm: float
    vegetation_gain_sqkm: float
    water_increase_sqkm: float
    water_decrease_sqkm: float
    builtup_change_sqkm: float

class DetectedRegion(BaseModel):
    id: str
    region_name: str
    change_type: str # "Vegetation Loss", "Water Expansion", "Urban Expansion"
    area_sqkm: float
    ndvi_diff: float
    ndwi_diff: float
    evi_diff: float
    detection_method: str = "Otsu Thresholding + Morphological Cleanup"
    center_lat: float
    center_lng: float
    geojson: Dict[str, Any]

class AnalysisResultResponse(BaseModel):
    analysis_id: str
    title: str
    scenario_id: str
    location: LocationSelect
    images: ImageSelect
    status: str = "VERIFIED ANALYSIS"
    area_analyzed_sqkm: float
    changed_area_sqkm: float
    changed_percentage: float
    confidence_score: float = 98.4
    processing_time_seconds: float = 1.42
    timestamp: str
    ndvi_stats: SpectralStats
    ndwi_stats: SpectralStats
    evi_stats: SpectralStats
    land_breakdown: CategoryBreakdown
    detected_regions: List[DetectedRegion]
    processing_logs: List[str]
    layers: Dict[str, str]

class QueryRequest(BaseModel):
    analysis_id: str
    query: str

class GroundedEvidence(BaseModel):
    ndvi_diff: float
    ndwi_diff: float
    changed_area_sqkm: float
    changed_percentage: float
    detection_method: str
    source_imagery: str
    analysis_id: str
    key_region_id: Optional[str] = None

class QueryResponse(BaseModel):
    query_id: str
    analysis_id: str
    user_query: str
    answer: str
    evidence: GroundedEvidence
    suggested_questions: List[str]
    timestamp: str
