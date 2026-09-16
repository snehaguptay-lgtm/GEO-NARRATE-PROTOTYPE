import React, { useState } from 'react';
import { ShieldCheck, MapPin, ChevronDown, ChevronUp, Cpu, CheckCircle2 } from 'lucide-react';

export default function EvidenceCard({ evidence, onZoomToRegion }) {
  const [expanded, setExpanded] = useState(false);

  if (!evidence) return null;

  return (
    <div className="bg-[#0f172a] border border-cyan-500/40 rounded-xl p-4 space-y-3 shadow-lg text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200 tracking-wide uppercase text-[11px]">EVIDENCE BACKING THIS ANSWER</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
          GROUNDED STATS
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">NDVI Difference:</span>
          <span className={`text-sm font-bold ${evidence.ndvi_diff < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {evidence.ndvi_diff > 0 ? `+${evidence.ndvi_diff}` : evidence.ndvi_diff}
          </span>
        </div>
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">NDWI Difference:</span>
          <span className="text-sm font-bold text-cyan-300">
            {evidence.ndwi_diff > 0 ? `+${evidence.ndwi_diff}` : evidence.ndwi_diff}
          </span>
        </div>
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Changed Area:</span>
          <span className="text-sm font-bold text-amber-400">{evidence.changed_area_sqkm} km² ({evidence.changed_percentage}%)</span>
        </div>
        <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Detection Method:</span>
          <span className="text-xs text-slate-200 font-sans font-semibold">{evidence.detection_method}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onZoomToRegion(evidence.key_region_id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-md transition-all text-xs"
        >
          <MapPin className="w-3.5 h-3.5" />
          View Evidence on Map
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 text-[11px]"
        >
          <span>{expanded ? 'Hide Methodology' : 'How was this calculated?'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1.5 leading-relaxed">
          <div className="font-bold text-cyan-400">Auditable Remote Sensing Methodology:</div>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            <li>Bi-temporal optical rasters co-registered to sub-pixel precision (&lt;0.2px residual).</li>
            <li>Spectral indices calculated for T1 & T2: $NDVI = (NIR-Red)/(NIR+Red)$, $NDWI = (Green-NIR)/(Green+NIR)$.</li>
            <li>Matrix subtraction performed to create continuous differential layers $\Delta NDVI$ and $\Delta NDWI$.</li>
            <li>Otsu automatic thresholding algorithm identifies bimodal index change boundaries.</li>
            <li>Morphological opening/closing cleans noise and vectorizes change boundaries into GeoJSON polygons.</li>
            <li>LLM layer reads only these verified metrics to generate natural language explanations.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
