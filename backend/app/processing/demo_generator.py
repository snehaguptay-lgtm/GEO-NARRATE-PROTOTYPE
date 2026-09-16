import numpy as np
import math
import uuid
import datetime
from typing import Dict, Any, List

def generate_demo_dataset(scenario_id: str = "vegetation_loss") -> Dict[str, Any]:
    """
    Generates synthetic bi-temporal satellite statistics, spectral arrays, 
    and GeoJSON detected change regions for SIH prototype demo modes.
    """
    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    if scenario_id == "flood_expansion":
        analysis_id = "GN-2026-FL02"
        title = "Monsoon River Flooding & Water Expansion"
        location = {
            "name": "Kaziranga Basin, Assam (Brahmaputra Valley)",
            "lat": 26.5775,
            "lng": 93.1711,
            "zoom": 12
        }
        images = {
            "date_before": "2026-05-10",
            "date_after": "2026-07-28",
            "satellite_source": "ISRO Cartosat-3 / Sentinel-1 SAR",
            "cloud_cover_before": 1.5,
            "cloud_cover_after": 8.2
        }
        area_analyzed = 3.12
        changed_area = 0.68
        changed_pct = 21.8
        
        ndvi_stats = {"before_mean": 0.65, "after_mean": 0.42, "difference_mean": -0.23, "percentage_change": -35.3}
        ndwi_stats = {"before_mean": -0.15, "after_mean": 0.28, "difference_mean": 0.43, "percentage_change": 286.6}
        evi_stats = {"before_mean": 0.52, "after_mean": 0.31, "difference_mean": -0.21, "percentage_change": -40.3}
        
        land_breakdown = {
            "unchanged_sqkm": 2.44,
            "vegetation_loss_sqkm": 0.45,
            "vegetation_gain_sqkm": 0.03,
            "water_increase_sqkm": 0.68,
            "water_decrease_sqkm": 0.00,
            "builtup_change_sqkm": 0.02
        }
        
        # GeoJSON Regions
        center_lat, center_lng = 26.5775, 93.1711
        regions = [
            {
                "id": "REG-FL-01",
                "region_name": "Brahmaputra Overflow Inundation Zone - East",
                "change_type": "Water Expansion",
                "area_sqkm": 0.42,
                "ndvi_diff": -0.38,
                "ndwi_diff": +0.56,
                "evi_diff": -0.32,
                "detection_method": "Otsu Thresholding on NDWI Difference",
                "center_lat": center_lat + 0.008,
                "center_lng": center_lng + 0.012,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [center_lng + 0.005, center_lat + 0.005],
                            [center_lng + 0.018, center_lat + 0.006],
                            [center_lng + 0.021, center_lat + 0.014],
                            [center_lng + 0.008, center_lat + 0.015],
                            [center_lng + 0.005, center_lat + 0.005]
                        ]]
                    },
                    "properties": {"name": "Zone A: High Water Inundation", "severity": "High"}
                }
            },
            {
                "id": "REG-FL-02",
                "region_name": "Southern Lowland Agriculture Inundation",
                "change_type": "Water Expansion",
                "area_sqkm": 0.26,
                "ndvi_diff": -0.42,
                "ndwi_diff": +0.48,
                "evi_diff": -0.35,
                "detection_method": "SAR + Optical Fusion & Otsu Threshold",
                "center_lat": center_lat - 0.009,
                "center_lng": center_lng - 0.007,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [center_lng - 0.012, center_lat - 0.014],
                            [center_lng - 0.002, center_lat - 0.012],
                            [center_lng - 0.004, center_lat - 0.004],
                            [center_lng - 0.014, center_lat - 0.006],
                            [center_lng - 0.012, center_lat - 0.014]
                        ]]
                    },
                    "properties": {"name": "Zone B: Submerged Rice Paddies", "severity": "Moderate"}
                }
            }
        ]

    elif scenario_id == "urban_expansion":
        analysis_id = "GN-2026-UR03"
        title = "Industrial Park Land Clearance & Construction"
        location = {
            "name": "Devanahalli Corridor, Bengaluru",
            "lat": 13.2455,
            "lng": 77.7123,
            "zoom": 13
        }
        images = {
            "date_before": "2026-01-15",
            "date_after": "2026-08-30",
            "satellite_source": "Bhuvan Cartosat-2 / Sentinel-2B",
            "cloud_cover_before": 0.8,
            "cloud_cover_after": 2.1
        }
        area_analyzed = 2.85
        changed_area = 0.41
        changed_pct = 14.4
        
        ndvi_stats = {"before_mean": 0.58, "after_mean": 0.39, "difference_mean": -0.19, "percentage_change": -32.7}
        ndwi_stats = {"before_mean": -0.22, "after_mean": -0.25, "difference_mean": -0.03, "percentage_change": 13.6}
        evi_stats = {"before_mean": 0.46, "after_mean": 0.28, "difference_mean": -0.18, "percentage_change": -39.1}
        
        land_breakdown = {
            "unchanged_sqkm": 2.44,
            "vegetation_loss_sqkm": 0.38,
            "vegetation_gain_sqkm": 0.01,
            "water_increase_sqkm": 0.00,
            "water_decrease_sqkm": 0.02,
            "builtup_change_sqkm": 0.41
        }
        
        center_lat, center_lng = 13.2455, 77.7123
        regions = [
            {
                "id": "REG-UR-01",
                "region_name": "Phase-2 Industrial Layout Land Clearing",
                "change_type": "Urban Expansion",
                "area_sqkm": 0.29,
                "ndvi_diff": -0.45,
                "ndwi_diff": -0.04,
                "evi_diff": -0.38,
                "detection_method": "Otsu Thresholding + Morphological Cleanup",
                "center_lat": center_lat + 0.004,
                "center_lng": center_lng - 0.006,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [center_lng - 0.010, center_lat + 0.001],
                            [center_lng - 0.002, center_lat + 0.002],
                            [center_lng - 0.001, center_lat + 0.009],
                            [center_lng - 0.009, center_lat + 0.008],
                            [center_lng - 0.010, center_lat + 0.001]
                        ]]
                    },
                    "properties": {"name": "Industrial Sector Clearing", "severity": "High"}
                }
            },
            {
                "id": "REG-UR-02",
                "region_name": "New Access Road & Concrete Foundation",
                "change_type": "Urban Expansion",
                "area_sqkm": 0.12,
                "ndvi_diff": -0.32,
                "ndwi_diff": -0.02,
                "evi_diff": -0.27,
                "detection_method": "Otsu Thresholding on Surface Reflectance",
                "center_lat": center_lat - 0.005,
                "center_lng": center_lng + 0.007,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [center_lng + 0.003, center_lat - 0.008],
                            [center_lng + 0.011, center_lat - 0.007],
                            [center_lng + 0.012, center_lat - 0.002],
                            [center_lng + 0.004, center_lat - 0.003],
                            [center_lng + 0.003, center_lat - 0.008]
                        ]]
                    },
                    "properties": {"name": "Arterial Road Expansion", "severity": "Moderate"}
                }
            }
        ]

    else:
        # Default: Vegetation Loss (Agricultural harvest / deforestation in Cauvery Delta)
        scenario_id = "vegetation_loss"
        analysis_id = "GN-2026-VG01"
        title = "Seasonal Crop Harvest & Deforestation Scan"
        location = {
            "name": "Cauvery Delta, Tamil Nadu",
            "lat": 10.7870,
            "lng": 79.1378,
            "zoom": 12
        }
        images = {
            "date_before": "2026-03-15",
            "date_after": "2026-09-10",
            "satellite_source": "Bhuvan Cartosat-3 / Sentinel-2",
            "cloud_cover_before": 2.1,
            "cloud_cover_after": 4.5
        }
        area_analyzed = 2.45
        changed_area = 0.46
        changed_pct = 18.7
        
        ndvi_stats = {"before_mean": 0.62, "after_mean": 0.44, "difference_mean": -0.18, "percentage_change": -29.0}
        ndwi_stats = {"before_mean": -0.12, "after_mean": 0.07, "difference_mean": 0.19, "percentage_change": 158.3}
        evi_stats = {"before_mean": 0.48, "after_mean": 0.35, "difference_mean": -0.13, "percentage_change": -27.1}
        
        land_breakdown = {
            "unchanged_sqkm": 1.99,
            "vegetation_loss_sqkm": 0.46,
            "vegetation_gain_sqkm": 0.04,
            "water_increase_sqkm": 0.12,
            "water_decrease_sqkm": 0.03,
            "builtup_change_sqkm": 0.01
        }
        
        center_lat, center_lng = 10.7870, 79.1378
        regions = [
            {
                "id": "REG-VG-01",
                "region_name": "Northern Agriculture Sector (Crop Harvest Area)",
                "change_type": "Vegetation Loss",
                "area_sqkm": 0.31,
                "ndvi_diff": -0.42,
                "ndwi_diff": +0.12,
                "evi_diff": -0.34,
                "detection_method": "Otsu Thresholding on NDVI Difference",
                "center_lat": center_lat + 0.007,
                "center_lng": center_lng - 0.003,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [center_lng - 0.008, center_lat + 0.003],
                            [center_lng + 0.002, center_lat + 0.004],
                            [center_lng + 0.003, center_lat + 0.011],
                            [center_lng - 0.007, center_lat + 0.010],
                            [center_lng - 0.008, center_lat + 0.003]
                        ]]
                    },
                    "properties": {"name": "Crop Field Post-Harvest Clearing", "severity": "High"}
                }
            },
            {
                "id": "REG-VG-02",
                "region_name": "Eastern Irrigation Canal Water Ingress",
                "change_type": "Water Expansion",
                "area_sqkm": 0.15,
                "ndvi_diff": -0.22,
                "ndwi_diff": +0.38,
                "evi_diff": -0.18,
                "detection_method": "Otsu Thresholding on NDWI Difference",
                "center_lat": center_lat - 0.004,
                "center_lng": center_lng + 0.008,
                "geojson": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [center_lng + 0.004, center_lat - 0.008],
                            [center_lng + 0.012, center_lat - 0.007],
                            [center_lng + 0.011, center_lat - 0.001],
                            [center_lng + 0.003, center_lat - 0.002],
                            [center_lng + 0.004, center_lat - 0.008]
                        ]]
                    },
                    "properties": {"name": "Irrigation Overflow Zone", "severity": "Moderate"}
                }
            }
        ]

    logs = [
        f"{now_str} [INGEST] Ingesting bi-temporal optical & SAR raster feeds from {images['satellite_source']}",
        f"{now_str} [ALIGN] Performing automatic co-registration & spatial warping (sub-pixel accuracy < 0.2px)",
        f"{now_str} [MASK] Cloud & shadow masking complete (Cloud cover: {images['cloud_cover_before']}% / {images['cloud_cover_after']}%)",
        f"{now_str} [INDICES] Computing surface spectral indices (NDVI, NDWI, EVI) for T1 and T2",
        f"{now_str} [DIFF] Generating temporal index difference matrices (ΔNDVI, ΔNDWI, ΔEVI)",
        f"{now_str} [OTSU] Computing bi-modal histogram and applying Otsu Automatic Thresholding",
        f"{now_str} [MORPH] Applying morphological opening (kernel 3x3) and closing to clean noise",
        f"{now_str} [VECTOR] Vectorizing binary mask into {len(regions)} major spatial change polygons",
        f"{now_str} [VERIFY] Generating verified geospatial statistics & grounding payload"
    ]

    return {
        "analysis_id": analysis_id,
        "title": title,
        "scenario_id": scenario_id,
        "location": location,
        "images": images,
        "status": "VERIFIED ANALYSIS",
        "area_analyzed_sqkm": area_analyzed,
        "changed_area_sqkm": changed_area,
        "changed_percentage": changed_pct,
        "confidence_score": 98.4,
        "processing_time_seconds": 1.42,
        "timestamp": now_str,
        "ndvi_stats": ndvi_stats,
        "ndwi_stats": ndwi_stats,
        "evi_stats": evi_stats,
        "land_breakdown": land_breakdown,
        "detected_regions": regions,
        "processing_logs": logs,
        "layers": {
            "base": "satellite",
            "ndvi_diff": "heatmap_ndvi",
            "ndwi_diff": "heatmap_ndwi",
            "evi_diff": "heatmap_evi",
            "change_mask": "geojson_overlay"
        }
    }
