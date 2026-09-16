import React from 'react';
import { ArrowRight, Database, Sliders, Activity, Sparkles, MessageSquareCode, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ArchitectureDiagram() {
  const steps = [
    {
      num: "1. Ingest",
      title: "Bi-temporal Ingestion",
      desc: "Fetch bi-temporal optical + SAR image pairs from Bhuvan WMS / Cartosat / RISAT / Sentinel.",
      icon: Database,
      color: "from-blue-600 to-cyan-700"
    },
    {
      num: "2. Preprocess",
      title: "Alignment & Masking",
      desc: "Sub-pixel image co-registration, cloud/shadow masking & SAR speckle filtering.",
      icon: Sliders,
      color: "from-cyan-600 to-blue-700"
    },
    {
      num: "3. Compute Indices",
      title: "Spectral Indices",
      desc: "Compute NDVI, NDWI, EVI arrays for T1 & T2, then calculate matrix difference ΔIndex.",
      icon: Activity,
      color: "from-teal-600 to-cyan-700"
    },
    {
      num: "4. Detect Change",
      title: "Otsu & Cleanup",
      desc: "Apply Otsu bimodal thresholding & morphological opening/closing noise cleanup.",
      icon: Sparkles,
      color: "from-indigo-600 to-blue-800"
    },
    {
      num: "5. Query & Narrate",
      title: "Grounded LLM Layer",
      desc: "LLM receives ONLY verified statistics JSON to generate explainable Q&A + map evidence.",
      icon: MessageSquareCode,
      color: "from-amber-600 to-cyan-600"
    }
  ];

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>System Architecture & Pipeline Flow</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              SIH26167
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            End-to-end processing pipeline from satellite raster ingestion to grounded AI narration.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
          <ShieldCheck className="w-4 h-4" /> 100% Grounded Architecture
        </div>
      </div>

      {/* 5-Step Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 relative hover:border-cyan-500/40 transition-all hover:bg-slate-800/50 group"
            >
              <div className="space-y-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-mono font-bold text-cyan-400">{step.num}</div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-4 h-4 text-cyan-500/60" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tech Stack Strip */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-400">Core Technology Stack:</span>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          {["Python", "FastAPI", "GDAL / Rasterio", "NumPy", "OpenCV", "SQLite / PostgreSQL", "React", "Leaflet.js", "Grounded LLM API"].map((tech, i) => (
            <span key={i} className="px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
