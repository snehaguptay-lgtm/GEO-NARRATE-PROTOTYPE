import React, { useState } from 'react';
import { Sliders, Calendar, Satellite, Info, Eye, Layers } from 'lucide-react';

export default function SplitViewer({ analysisData }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [mode, setMode] = useState('swipe'); // swipe, side, opacity
  const [opacity, setOpacity] = useState(0.5);
  const [showAnalysisLayer, setShowAnalysisLayer] = useState(false);

  const images = analysisData?.images || {
    date_before: "2026-03-15",
    date_after: "2026-09-10",
    satellite_source: "Bhuvan Cartosat-3 / Sentinel-2",
    cloud_cover_before: 2.1,
    cloud_cover_after: 4.5
  };

  const loc = analysisData?.location || { name: "Cauvery Delta, Tamil Nadu" };

  return (
    <div className="space-y-4">
      {/* Top controls */}
      <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('swipe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'swipe' ? 'bg-cyan-500 text-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Swipe Slider
          </button>
          <button
            onClick={() => setMode('side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'side' ? 'bg-cyan-500 text-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setMode('opacity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'opacity' ? 'bg-cyan-500 text-black shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Opacity Blend
          </button>
        </div>

        <div className="flex items-center gap-4">
          {mode === 'opacity' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Blend Opacity:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-28 accent-cyan-500"
              />
              <span className="font-mono text-cyan-400 w-8">{Math.round(opacity * 100)}%</span>
            </div>
          )}

          <button
            onClick={() => setShowAnalysisLayer(!showAnalysisLayer)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showAnalysisLayer
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {showAnalysisLayer ? 'Analysis Layer: ON' : 'Show Analysis Layer'}
          </button>
        </div>
      </div>

      {/* Main Image Comparison Area */}
      {mode === 'swipe' && (
        <div className="relative w-full h-[480px] rounded-xl overflow-hidden border border-slate-800 select-none bg-black">
          {/* After Image (Background) */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute top-4 right-4 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 font-bold z-10">
              AFTER — {images.date_after}
            </div>
            {/* Synthetic raster simulation */}
            <div className="w-full h-full opacity-60 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
              <span className="text-emerald-300 font-mono text-sm bg-slate-950/90 px-4 py-2 rounded-xl border border-emerald-800/50">
                Satellite Capture: {images.date_after} (NDVI Diff: {analysisData?.ndvi_stats?.difference_mean || -0.18})
              </span>
            </div>
          </div>

          {/* Before Image (Clipped Overlay) */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-amber-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden border-r-2 border-cyan-400 shadow-2xl"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="absolute top-4 left-4 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-cyan-400 font-bold z-10">
              BEFORE — {images.date_before}
            </div>
            <div className="w-[100vw] h-full opacity-60 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
              <span className="text-cyan-300 font-mono text-sm bg-slate-950/90 px-4 py-2 rounded-xl border border-cyan-800/50">
                Baseline Capture: {images.date_before}
              </span>
            </div>
          </div>

          {/* Change Mask Overlay */}
          {showAnalysisLayer && (
            <div className="absolute inset-0 pointer-events-none bg-red-500/20 mix-blend-overlay flex items-center justify-center">
              <div className="bg-red-950/90 border border-red-500 text-red-200 px-4 py-2 rounded-xl text-xs font-mono font-bold">
                OTSU DETECTED CHANGE MASK ACTIVE (18.7% AREA)
              </div>
            </div>
          )}

          {/* Slider Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />

          {/* Slider Visual Divider */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 z-20 pointer-events-none shadow-[0_0_15px_#00b4d8]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-400 text-black font-bold text-xs flex items-center justify-center shadow-lg">
              ↔
            </div>
          </div>
        </div>
      )}

      {mode === 'side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="h-[400px] rounded-xl border border-slate-800 relative bg-gradient-to-br from-blue-950 to-slate-900 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-950/80 px-3 py-1 rounded border border-cyan-900">
                BEFORE — {images.date_before}
              </span>
              <span className="text-[11px] text-slate-400">Cloud Cover: {images.cloud_cover_before}%</span>
            </div>
            <div className="text-center font-mono text-xs text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              [BEFORE OPTICAL SATELLITE RASTER]
              <div className="text-slate-300 text-sm mt-1">Mean NDVI: {analysisData?.ndvi_stats?.before_mean || 0.62}</div>
            </div>
            <div className="text-[11px] text-slate-400">Source: {images.satellite_source}</div>
          </div>

          {/* After */}
          <div className="h-[400px] rounded-xl border border-slate-800 relative bg-gradient-to-br from-emerald-950 to-slate-900 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-950/80 px-3 py-1 rounded border border-emerald-900">
                AFTER — {images.date_after}
              </span>
              <span className="text-[11px] text-slate-400">Cloud Cover: {images.cloud_cover_after}%</span>
            </div>
            <div className="text-center font-mono text-xs text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              [AFTER OPTICAL SATELLITE RASTER]
              <div className="text-slate-300 text-sm mt-1">Mean NDVI: {analysisData?.ndvi_stats?.after_mean || 0.44}</div>
            </div>
            <div className="text-[11px] text-slate-400">Source: {images.satellite_source}</div>
          </div>
        </div>
      )}

      {mode === 'opacity' && (
        <div className="h-[450px] rounded-xl border border-slate-800 relative bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute top-4 left-4 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-cyan-400">
            Blending Mode: {Math.round(opacity * 100)}% After / {Math.round((1 - opacity) * 100)}% Before
          </div>
          <div className="text-center font-mono text-sm text-cyan-300 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 max-w-md">
            Interactive Opacity Blend
            <p className="text-xs text-slate-400 mt-2">
              Showing composite overlay of {images.date_before} overlaid with {images.date_after}.
            </p>
          </div>
        </div>
      )}

      {/* Image Metadata Panel */}
      <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl text-xs grid grid-cols-2 md:grid-cols-6 gap-4">
        <div>
          <span className="text-slate-400 block text-[11px]">Acquisition Dates:</span>
          <span className="font-mono font-semibold text-white">{images.date_before} → {images.date_after}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Satellite Constellation:</span>
          <span className="font-semibold text-cyan-300">{images.satellite_source}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Spatial Resolution:</span>
          <span className="font-mono font-semibold text-slate-200">10m / Pixel</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Cloud Cover Residual:</span>
          <span className="font-mono font-semibold text-emerald-400">{images.cloud_cover_before}% / {images.cloud_cover_after}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Study Area Extent:</span>
          <span className="font-mono font-semibold text-slate-200">{analysisData?.area_analyzed_sqkm || 2.45} km²</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Center Coordinates:</span>
          <span className="font-mono font-semibold text-slate-200">{loc.lat?.toFixed(4)}, {loc.lng?.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}
