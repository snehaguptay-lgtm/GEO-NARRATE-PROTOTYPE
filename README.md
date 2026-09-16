# GeoNarrate — Explainable Satellite Change-Detection & Query Assistant

<p align="center">
  <b>Smart India Hackathon 2026 (SIH 2026) Prototype</b><br>
  <b>Problem Statement ID:</b> SIH26167 | <b>Theme:</b> Space Technology | <b>Category:</b> Software<br>
  <b>Problem Title:</b> SatQuery AI: Vision-Language Assistant for Remote Sensing Image Analysis via Text Queries<br>
  <b>Team Name:</b> TECH6
</p>

---

## 📌 Abstract & Core Idea

**GeoNarrate** is an explainable, auditable satellite image change-detection and natural-language query assistant built specifically for government land-revenue offices, disaster management authorities (NDMA), and spatial planners.

### ❓ What It Does
A user asks a plain-language question about two bi-temporal satellite images of the same geographic region (e.g., *"What changed here since March?"*) and receives a **verified, explained answer** backed by exact spatial map evidence.

### 🔬 How It Solves the Brief
Instead of relying on black-box Vision-Language Models (VLMs) that hallucinate numerical values or guess directly from raw pixels, **GeoNarrate** employs a two-tier architecture:
1. **Deterministic Remote Sensing Engine**: Computes continuous matrix differences for $NDVI$ (Vegetation), $NDWI$ (Water), and $EVI$ (Enhanced Vegetation Index), applies **Otsu Automatic Bimodal Thresholding**, and performs **Morphological Cleanup** to vectorize change polygons.
2. **Grounded LLM Narration Layer**: A pretrained LLM receives **ONLY** pre-computed verified statistical metrics JSON. It strictly converts these numbers into human-readable narratives without ever inferring measurements beyond the data.

### ✨ What's Novel
- **Zero Training Data Required**: Operates deterministically using physics-based optical surface reflectance formulas.
- **CPU-Oriented Architecture**: Runs on standard CPU servers without requiring expensive GPU clusters.
- **ISRO Data Native**: Natively compatible with ISRO's Bhuvan WMS, Cartosat, and RISAT feeds.
- **District-Level Deployment**: Ready for local deployment at district land-revenue and disaster management offices.

---

## 🏗️ System Architecture & Workflow

The end-to-end technical approach follows a 5-step pipeline:

```
[1. INGEST] ──► [2. PREPROCESS] ──► [3. COMPUTE INDICES] ──► [4. DETECT CHANGE] ──► [5. QUERY & NARRATE]
Bi-temporal       Sub-pixel alignment   NDVI, NDWI & EVI      Otsu thresholding    Grounded LLM explains
Optical + SAR     & cloud/shadow mask   matrix differencing    & morphology cleanup  stats + map overlay
```

---

## 📊 Implementation Status

### ✅ Currently Implemented (Working Prototype Capabilities)

- [x] **Full-Stack Geoportal Interface**: Built with React 18, Leaflet.js, and an ISRO/Space-Tech dark-navy aesthetic.
- [x] **FastAPI Remote Sensing Backend**: REST APIs (`/api/analysis`, `/api/query`, `/api/history`, `/api/datasets`).
- [x] **Spectral Index Differencing Engine**: Continuous calculation of $\Delta NDVI$, $\Delta NDWI$, and $\Delta EVI$.
- [x] **Otsu Bimodal Thresholding & Morphological Cleanup**: Automated separation of significant land changes from background noise with opening/closing speckle filters.
- [x] **Interactive Leaflet Map Inspector**: Multi-layer toggles (`Base Map`, `Before`, `After`, `NDVI`, `NDWI`, `EVI`, `Detected Change`, `SAR`), color-coded legends, and clickable GeoJSON region popups.
- [x] **Split-Screen Image Comparison Tool**: Interactive **Swipe Slider**, **Side-by-Side** view, and **Opacity Blend** tool for $T_1$ vs $T_2$ satellite imagery.
- [x] **4-Step Analysis Wizard**: Step-by-step workflow with an animated 9-step processing pipeline runner and live execution logs.
- [x] **"Ask GeoNarrate" Grounded Q&A Assistant**: Chat interface with sample prompt pills, JSON context compiler, grounded response cards, and **"View Evidence on Map"** auto-zoom buttons.
- [x] **3 Built-In SIH Demo Scenarios**:
  1. *Seasonal Crop Harvest & Deforestation* (Cauvery Delta, TN — March vs Sept 2026).
  2. *Monsoon River Flooding & Water Inundation* (Kaziranga Basin, Assam — May vs July 2026).
  3. *Industrial Park Land Clearing & Construction* (Devanahalli Corridor, Bengaluru — Jan vs Aug 2026).
- [x] **Searchable Analysis History Log**: Full persistent database tracking past analysis runs.
- [x] **Onboard Fallback Narration Engine**: Operates 100% offline if external LLM API keys are omitted.

---

### 🚧 Being Implemented / Future Roadmap (SIH Presentation Alignment)

- [ ] **Multi-Sensor Fusion (SAR + Optical)**: Combining RISAT Synthetic Aperture Radar (SAR) with Cartosat optical feeds for 24/7 all-weather day/night coverage.
- [ ] **Infrastructure & Mining Monitoring**: Extending change detection algorithms to road network construction, illegal mining encroachment, and coastal erosion.
- [ ] **Field-Verification Mobile App**: On-ground mobile tool for field verification teams to navigate to flagged change polygons and confirm ground truth.
- [ ] **Bhashini Multilingual Narration**: Integration with Government of India Bhashini APIs for regional language translation across state land-revenue offices.
- [ ] **Direct ISRO Bhuvan Live WMS Connector**: Production WMS/WMTS live stream integration.

---

## 🛠️ Tech Stack Used

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Leaflet.js, Custom Space-Tech CSS, Lucide Icons |
| **Backend** | Python 3.10+, FastAPI, NumPy, OpenCV, SQLite / PostgreSQL |
| **Geospatial Processing** | Matrix differencing ($\Delta NDVI, \Delta NDWI, \Delta EVI$), Otsu bimodal thresholding, Morphological cleanup |
| **LLM Narration** | Grounded Gemini 1.5 Flash API client + Onboard deterministic fallback template engine |
| **Data Compatibility** | ISRO Bhuvan Geoportal WMS, Cartosat-2/3, RISAT-1A SAR, Sentinel-1/2 |

---

## 🚀 Installation & Local Setup

### 1. Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher & npm

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Backend API will run at `http://localhost:8000` (Swagger UI at `http://localhost:8000/docs`).

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend Web App will run at `http://localhost:3000`.

### 4. Single-Command Launcher
Alternatively, run both servers concurrently:
```bash
python run.py
```

---

## 📚 References & Research

1. **GeoChat**: Grounded vision-language model for remote sensing (Kuckreja et al., 2023). *arXiv:2311.15826*
2. **RS-LLaVA**: LLaVA fine-tuned for remote-sensing captioning & VQA (Bazi et al., 2024). *Remote Sensing journal, MDPI*
3. **Planet Labs × Anthropic**: Claude-powered geospatial change-analysis partnership (2025).
4. **Planet Labs × Microsoft AI for Good Lab**: "Queryable Earth" conversational satellite-search initiative.
5. **ISRO Bhuvan Geoportal**: Official Indian satellite imagery & WMS data access. *bhuvan.nrsc.gov.in*
6. **USGS**: NDVI / NDWI spectral index methodology reference. *usgs.gov*

---

<p align="center">
  <b>Smart India Hackathon 2026 — Team TECH6</b>
</p>
