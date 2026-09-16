import React from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { Cpu, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <span>System Architecture & Engineering Methodology</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          SIH26167: SatQuery AI Vision-Language Assistant for Remote Sensing Image Analysis via Text Queries.
        </p>
      </div>

      <ArchitectureDiagram />

      {/* Technical Approach & Feasibility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">Why Deterministic Remote Sensing Beats Raw VLM Guessing</h3>
          <p className="text-slate-300 leading-relaxed">
            Standard Vision-Language Models (VLMs) frequently hallucinate quantitative metrics and fail to extract exact sub-pixel boundaries from raw multi-band satellite rasters.
          </p>
          <ul className="space-y-2 text-slate-300 font-mono text-[11px]">
            <li className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Zero Training Data Required (runs deterministically).
            </li>
            <li className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Runs on Standard CPU (no expensive GPU cluster needed).
            </li>
            <li className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Native ISRO Bhuvan / Cartosat / RISAT API integration ready.
            </li>
            <li className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Deployable directly at district revenue & disaster offices.
            </li>
          </ul>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">Grounded LLM Prompt Guardrail Architecture</h3>
          <p className="text-slate-300 leading-relaxed">
            The LLM receives a structured JSON context payload containing exact pre-computed spectral index differences, Otsu threshold masks, and spatial polygon areas.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[10px] text-cyan-300">
            &#123;<br/>
            &nbsp;&nbsp;"analysis_id": "GN-2026-VG01",<br/>
            &nbsp;&nbsp;"area_analyzed_sqkm": 2.45,<br/>
            &nbsp;&nbsp;"changed_area_sqkm": 0.46,<br/>
            &nbsp;&nbsp;"ndvi_diff": -0.18,<br/>
            &nbsp;&nbsp;"ndwi_diff": +0.19,<br/>
            &nbsp;&nbsp;"detection_method": "Otsu thresholding"<br/>
            &#125;
          </div>
        </div>
      </div>
    </div>
  );
}
