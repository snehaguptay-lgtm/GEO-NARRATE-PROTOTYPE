import React from 'react';
import { 
  Play, 
  Sparkles, 
  Layers, 
  MessageSquareCode, 
  ShieldCheck, 
  Globe2, 
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function LandingPage({ onNavigate, onExploreDemo }) {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a1226] to-[#080d1a] border border-cyan-500/30 p-8 md:p-14 tech-grid-bg shadow-2xl">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SMART INDIA HACKATHON 2026 • PROBLEM STATEMENT SIH26167</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            GeoNarrate
          </h1>

          <p className="text-lg md:text-xl font-medium text-cyan-300">
            Explainable Change-Detection & Query Assistant for Satellite Imagery
          </p>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Ask natural-language questions about bi-temporal satellite imagery and receive verified, explainable answers grounded strictly in measurable geospatial statistics computed via deterministic spectral algorithms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('new-analysis')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm shadow-lg shadow-cyan-950 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-black" />
              Start New Analysis
            </button>

            <button
              onClick={onExploreDemo}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Explore Demo Scenarios
            </button>
          </div>
        </div>

        {/* Hero Decorative Satellite Graphic Overlay */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-sm pointer-events-none p-4">
          <div className="w-full h-full rounded-full border border-cyan-400/30 flex items-center justify-center relative animate-spin" style={{ animationDuration: '30s' }}>
            <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#00b4d8] absolute -top-2"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] absolute -bottom-1"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Globe2 className="w-16 h-16 text-cyan-400 opacity-80 mb-2" />
            <span className="font-mono text-xs font-bold text-cyan-300">ISRO / BHUVAN COMPATIBLE</span>
            <span className="text-[10px] text-slate-400 mt-1">NDVI • NDWI • EVI • Otsu</span>
          </div>
        </div>
      </section>

      {/* 3 Key Capabilities Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Core System Capabilities</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">100% Deterministic & Auditable</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 01 Detect */}
          <div className="bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 p-6 rounded-2xl space-y-3 transition-all hover:bg-slate-800/40">
            <div className="text-xs font-mono font-bold text-cyan-400">[01] DETECT</div>
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Spectral Change Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detect measurable land-use changes using NDVI, NDWI, EVI differencing, Otsu bimodal thresholding, and morphological cleanup.
            </p>
          </div>

          {/* 02 Explain */}
          <div className="bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 p-6 rounded-2xl space-y-3 transition-all hover:bg-slate-800/40">
            <div className="text-xs font-mono font-bold text-cyan-400">[02] EXPLAIN</div>
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Grounded LLM Narration</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Convert verified statistical matrices into natural-language explanations without ever hallucinating numbers or guessing from raw pixels.
            </p>
          </div>

          {/* 03 Verify */}
          <div className="bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 p-6 rounded-2xl space-y-3 transition-all hover:bg-slate-800/40">
            <div className="text-xs font-mono font-bold text-cyan-400">[03] VERIFY</div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interactive Map Evidence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inspect exact map overlays, polygon boundaries, spectral difference metrics, and mathematical methodology behind every answer.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Strip */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-slate-400 font-mono">SUPPORTED ECOSYSTEM & STACK:</span>
        <div className="flex flex-wrap gap-3 font-mono font-bold text-cyan-300">
          {["Bhuvan", "Cartosat", "RISAT", "Sentinel", "Python", "FastAPI", "Rasterio", "React", "Leaflet"].map((t, i) => (
            <span key={i} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
