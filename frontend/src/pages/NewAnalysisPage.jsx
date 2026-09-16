import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Satellite, 
  Layers, 
  Play, 
  Check, 
  Loader2, 
  Sparkles, 
  Sliders, 
  CheckCircle2 
} from 'lucide-react';

export default function NewAnalysisPage({ onAnalysisComplete }) {
  const [step, setStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState("");

  // Form State
  const [selectedScenario, setSelectedScenario] = useState("vegetation_loss");
  const [locationName, setLocationName] = useState("Cauvery Delta, Tamil Nadu");
  const [lat, setLat] = useState(10.7870);
  const [lng, setLng] = useState(79.1378);

  const [dateBefore, setDateBefore] = useState("2026-03-15");
  const [dateAfter, setDateAfter] = useState("2026-09-10");
  const [satelliteSource, setSatelliteSource] = useState("Bhuvan Cartosat-3 / Sentinel-2");

  const [useNdvi, setUseNdvi] = useState(true);
  const [useNdwi, setUseNdwi] = useState(true);
  const [useEvi, setUseEvi] = useState(true);
  const [useOtsu, setUseOtsu] = useState(true);
  const [useMorphology, setUseMorphology] = useState(true);
  const [useSar, setUseSar] = useState(false);

  const pipelineSteps = [
    "1. Ingesting bi-temporal imagery feeds...",
    "2. Co-registering T1 and T2 images...",
    "3. Cloud & speckle masking...",
    "4. Computing spectral indices (NDVI, NDWI, EVI)...",
    "5. Calculating temporal difference matrices...",
    "6. Applying Otsu automatic thresholding...",
    "7. Executing morphological cleanup (Opening/Closing)...",
    "8. Vectorizing change mask polygons...",
    "9. Preparing verified statistics & grounding payload..."
  ];

  const handleRunPipeline = () => {
    setIsRunning(true);
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current <= pipelineSteps.length) {
        setProgress(Math.round((current / pipelineSteps.length) * 100));
        setCurrentStepText(pipelineSteps[current - 1]);
      } else {
        clearInterval(interval);
        setIsRunning(false);

        // Submit to handler
        onAnalysisComplete({
          location: { name: locationName, lat: parseFloat(lat), lng: parseFloat(lng), zoom: 12 },
          images: { date_before: dateBefore, date_after: dateAfter, satellite_source: satelliteSource },
          config: { scenario_id: selectedScenario, use_ndvi: useNdvi, use_ndwi: useNdwi, use_evi: useEvi, use_otsu: useOtsu, use_sar_fallback: useSar }
        });
      }
    }, 450);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Step-by-Step Change Detection Wizard</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure geographic area of interest, bi-temporal satellite rasters, and spectral index parameters.
        </p>
      </div>

      {/* Workflow Stepper Indicator */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { num: 1, label: "1. Location" },
          { num: 2, label: "2. Images" },
          { num: 3, label: "3. Algorithms" },
          { num: 4, label: "4. Run Analysis" }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => !isRunning && setStep(s.num)}
            className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
              step === s.num
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950'
                : step > s.num
                ? 'bg-slate-900 border-emerald-800/60 text-emerald-400'
                : 'bg-slate-900/50 border-slate-800 text-slate-500'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* STEP 1: SELECT LOCATION */}
      {step === 1 && (
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">STEP 1 — Select Area of Interest (AOI)</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Preset Demo Scenario Region:</label>
              <select
                value={selectedScenario}
                onChange={(e) => {
                  setSelectedScenario(e.target.value);
                  if (e.target.value === "vegetation_loss") {
                    setLocationName("Cauvery Delta, Tamil Nadu"); setLat(10.7870); setLng(79.1378);
                  } else if (e.target.value === "flood_expansion") {
                    setLocationName("Kaziranga Basin, Assam"); setLat(26.5775); setLng(93.1711);
                  } else {
                    setLocationName("Devanahalli Corridor, Bengaluru"); setLat(13.2455); setLng(77.7123);
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
              >
                <option value="vegetation_loss">Cauvery Delta, Tamil Nadu — Seasonal Crop Harvest</option>
                <option value="flood_expansion">Kaziranga Basin, Assam — Monsoon River Overflow</option>
                <option value="urban_expansion">Devanahalli Corridor, Bengaluru — Industrial Park Clearing</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Location Name:</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Latitude (°N):</label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Longitude (°E):</label>
                <input
                  type="number"
                  step="0.0001"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl shadow"
            >
              Continue to Step 2 →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT IMAGES */}
      {step === 2 && (
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Satellite className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">STEP 2 — Select Bi-Temporal Satellite Imagery</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* BEFORE */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="font-bold text-cyan-400 font-mono block">BEFORE (Baseline Capture)</span>
              <div>
                <label className="text-slate-300 block mb-1">Acquisition Date:</label>
                <input
                  type="date"
                  value={dateBefore}
                  onChange={(e) => setDateBefore(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                />
              </div>
              <div className="h-32 bg-blue-950/40 rounded border border-slate-800 flex items-center justify-center font-mono text-[11px] text-cyan-300">
                [T1 RASTER PREVIEW: {dateBefore}]
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="font-bold text-emerald-400 font-mono block">AFTER (Target Capture)</span>
              <div>
                <label className="text-slate-300 block mb-1">Acquisition Date:</label>
                <input
                  type="date"
                  value={dateAfter}
                  onChange={(e) => setDateAfter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                />
              </div>
              <div className="h-32 bg-emerald-950/40 rounded border border-slate-800 flex items-center justify-center font-mono text-[11px] text-emerald-300">
                [T2 RASTER PREVIEW: {dateAfter}]
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1 text-xs font-semibold">Satellite Data Source Feed:</label>
            <select
              value={satelliteSource}
              onChange={(e) => setSatelliteSource(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-xs"
            >
              <option value="Bhuvan Cartosat-3 / Sentinel-2">ISRO Bhuvan Cartosat-3 / Sentinel-2 Optical (10m)</option>
              <option value="Cartosat-2 High Resolution">ISRO Cartosat-2 High-Resolution (2.5m)</option>
              <option value="RISAT-1A SAR Feed">ISRO RISAT-1A Synthetic Aperture Radar (SAR)</option>
              <option value="Sentinel Hub API Feed">Sentinel Hub WMS Feed</option>
              <option value="Demo Dataset">Synthetic Prototype Demo Dataset</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl">
              ← Back
            </button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-cyan-500 text-black font-extrabold text-xs rounded-xl">
              Continue to Step 3 →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ALGORITHMS */}
      {step === 3 && (
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">STEP 3 — Select Remote Sensing Algorithms</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <label className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
              <input type="checkbox" checked={useNdvi} onChange={(e) => setUseNdvi(e.target.checked)} className="mt-1 accent-cyan-500" />
              <div>
                <span className="font-bold text-cyan-300 block">NDVI (Normalized Difference Vegetation Index)</span>
                <span className="text-slate-400 text-[11px]">(NIR - Red)/(NIR + Red) for vegetation health analysis.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
              <input type="checkbox" checked={useNdwi} onChange={(e) => setUseNdwi(e.target.checked)} className="mt-1 accent-cyan-500" />
              <div>
                <span className="font-bold text-cyan-300 block">NDWI (Normalized Difference Water Index)</span>
                <span className="text-slate-400 text-[11px]">(Green - NIR)/(Green + NIR) for water body detection.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
              <input type="checkbox" checked={useEvi} onChange={(e) => setUseEvi(e.target.checked)} className="mt-1 accent-cyan-500" />
              <div>
                <span className="font-bold text-cyan-300 block">EVI (Enhanced Vegetation Index)</span>
                <span className="text-slate-400 text-[11px]">Corrects for atmospheric noise and canopy background.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
              <input type="checkbox" checked={useOtsu} onChange={(e) => setUseOtsu(e.target.checked)} className="mt-1 accent-cyan-500" />
              <div>
                <span className="font-bold text-cyan-300 block">Otsu Automatic Thresholding</span>
                <span className="text-slate-400 text-[11px]">Computes optimal bimodal threshold on difference histogram.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
              <input type="checkbox" checked={useMorphology} onChange={(e) => setUseMorphology(e.target.checked)} className="mt-1 accent-cyan-500" />
              <div>
                <span className="font-bold text-cyan-300 block">Morphological Cleanup</span>
                <span className="text-slate-400 text-[11px]">Opening/Closing operators remove speckle noise.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer">
              <input type="checkbox" checked={useSar} onChange={(e) => setUseSar(e.target.checked)} className="mt-1 accent-cyan-500" />
              <div>
                <span className="font-bold text-cyan-300 block">SAR Radar Fallback (RISAT-1A)</span>
                <span className="text-slate-400 text-[11px]">Penetrates cloud cover using microwave backscatter.</span>
              </div>
            </label>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl">
              ← Back
            </button>
            <button onClick={() => setStep(4)} className="px-6 py-2.5 bg-cyan-500 text-black font-extrabold text-xs rounded-xl">
              Continue to Execution →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RUN ANALYSIS */}
      {step === 4 && (
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Play className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">STEP 4 — Execute Deterministic Analysis</h3>
          </div>

          {!isRunning && progress === 0 && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/50 mx-auto flex items-center justify-center text-cyan-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Ready to Run Analysis</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Executing spectral differencing, Otsu thresholding, and morphological cleanup for {locationName}.
              </p>

              <button
                onClick={handleRunPipeline}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                RUN CHANGE DETECTION NOW
              </button>
            </div>
          )}

          {isRunning && (
            <div className="py-6 space-y-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">{currentStepText}</span>
                <span className="text-amber-400 font-bold">{progress}%</span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-cyan-400 font-bold">PIPELINE EXECUTION LOG:</div>
                {pipelineSteps.slice(0, Math.ceil((progress / 100) * pipelineSteps.length)).map((log, i) => (
                  <div key={i} className="text-slate-400 text-[11px]">{log}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
