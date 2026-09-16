import React, { useState } from 'react';
import MapView from '../components/MapView';
import { Layers, ShieldCheck, MapPin, Activity, Sparkles, Filter } from 'lucide-react';

export default function ChangeDetectionPage({ currentAnalysis, selectedRegion, onSelectRegion }) {
  const [activeLayer, setActiveLayer] = useState('Detected Change');
  const loc = currentAnalysis?.location || { name: "Cauvery Delta, Tamil Nadu", lat: 10.7870, lng: 79.1378, zoom: 12 };
  const regions = currentAnalysis?.detected_regions || [];
  const activeReg = selectedRegion || regions[0];

  const layerOptions = [
    'Base Map',
    'Before (T1)',
    'After (T2)',
    'NDVI Change',
    'NDWI Change',
    'EVI Change',
    'Detected Change',
    'SAR Radar'
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Verified Change Detection Inspection</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {currentAnalysis?.analysis_id || 'GN-2026-VG01'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click detected spatial change polygons on the map to inspect verified spectral parameters.
          </p>
        </div>

        {/* Layer Selector Bar */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0f172a] border border-slate-800 p-1.5 rounded-xl">
          {layerOptions.map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeLayer === layer
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View (2 cols) */}
        <div className="lg:col-span-2 h-[550px]">
          <MapView 
            location={loc}
            detectedRegions={regions}
            activeLayer={activeLayer}
            selectedRegionId={activeReg?.id}
            onSelectRegion={onSelectRegion}
          />
        </div>

        {/* Right Region Inspector Panel */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Detected Region Inspector</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                {activeReg?.id || 'REG-01'}
              </span>
            </div>

            {activeReg ? (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Region Name:</span>
                  <span className="font-bold text-white text-sm">{activeReg.region_name}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono">
                    <span className="text-slate-400 text-[10px] block">Affected Area:</span>
                    <span className="text-sm font-bold text-amber-400">{activeReg.area_sqkm} km²</span>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono">
                    <span className="text-slate-400 text-[10px] block">Change Type:</span>
                    <span className="text-sm font-bold text-cyan-300">{activeReg.change_type}</span>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono">
                    <span className="text-slate-400 text-[10px] block">NDVI Difference:</span>
                    <span className={`text-sm font-bold ${activeReg.ndvi_diff < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {activeReg.ndvi_diff > 0 ? `+${activeReg.ndvi_diff}` : activeReg.ndvi_diff}
                    </span>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono">
                    <span className="text-slate-400 text-[10px] block">NDWI Difference:</span>
                    <span className="text-sm font-bold text-cyan-300">
                      {activeReg.ndwi_diff > 0 ? `+${activeReg.ndwi_diff}` : activeReg.ndwi_diff}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-400">Detection Method:</div>
                  <div className="font-semibold text-white">{activeReg.detection_method}</div>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-800/60 text-[11px] text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Verified ground statistic computed deterministically from satellite matrices.</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 text-center py-10">
                Click a region polygon on the map to inspect stats.
              </div>
            )}
          </div>

          {/* Region List Quick Buttons */}
          <div className="space-y-2 border-t border-slate-800 pt-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">All Flagged Regions ({regions.length}):</span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelectRegion(r)}
                  className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-all ${
                    r.id === activeReg?.id
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="truncate font-semibold text-[11px]">{r.region_name}</span>
                  <span className="font-mono text-[10px] text-amber-400">{r.area_sqkm} km²</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
