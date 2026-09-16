import React from 'react';
import { Info, ShieldCheck, Cpu, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Info className="w-6 h-6 text-cyan-400" />
          <span>About GeoNarrate & SIH 2026 Project</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Explainable Change-Detection & Query Assistant for Satellite Imagery • Problem Statement SIH26167 (Team TECH6).
        </p>
      </div>

      {/* Problem & Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="font-bold text-amber-400 text-sm uppercase tracking-wider">THE PROBLEM</h3>
          <p className="text-slate-300 leading-relaxed">
            Satellite image analysis often requires specialized GIS software, remote sensing expertise, and manual spectral band calculations. Standard black-box AI vision models hallucinate numbers and cannot be trusted for government land-revenue or disaster relief decisions.
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="font-bold text-cyan-400 text-sm uppercase tracking-wider">THE GEONARRATE SOLUTION</h3>
          <p className="text-slate-300 leading-relaxed">
            GeoNarrate pairs auditable, deterministic spectral index differencing (NDVI, NDWI, EVI) and Otsu thresholding with a strictly grounded LLM narration layer. The user gets plain-language answers backed by clickable map evidence.
          </p>
        </div>
      </div>

      {/* Core Architectural Principles */}
      <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Core Engineering Principles</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {[
            { title: "Explainability & Auditability", desc: "Every answer includes exact mathematical spectral difference parameters and method traces." },
            { title: "Zero Custom Training Data", desc: "Operates deterministically using physics-based optical surface reflectance formulas." },
            { title: "Standard CPU Execution", desc: "Designed for modest government server budgets without requiring expensive GPU clusters." },
            { title: "Multi-Sensor Support", desc: "Supports Optical (Cartosat/Sentinel) and SAR (RISAT) all-weather cloud-penetrating feeds." },
            { title: "ISRO Bhuvan Integration", desc: "Natively connects to Indian satellite data feeds via WMS and raster services." },
            { title: "Grounded AI Guardrails", desc: "LLM is strictly prohibited from guessing metrics from raw pixels." }
          ].map((p, idx) => (
            <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 font-sans text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {p.title}
              </span>
              <p className="text-slate-400 text-[11px] font-sans leading-normal">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap / Extension Prospects (From SIH PDF Slide 5) */}
      <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Future Roadmap & Deployment Expansion</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 block">SAR + Optical Fusion</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Combine RISAT SAR with Cartosat optical for 24/7 all-weather day and night flood monitoring.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 block">Field-Verification App</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Mobile app for ground teams to navigate to flagged change polygons and record ground truth.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 block">Bhashini Multilingual Narration</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Integrate Government of India Bhashini APIs for Indian regional language state-level adoption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
