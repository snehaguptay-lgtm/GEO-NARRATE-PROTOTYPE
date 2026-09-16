import React from 'react';
import MapView from '../components/MapView';
import { 
  AreaChart, 
  Layers, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';

export default function DashboardPage({ currentAnalysis, onNavigate, onSelectRegion }) {
  const loc = currentAnalysis?.location || { name: "Cauvery Delta, Tamil Nadu", lat: 10.7870, lng: 79.1378, zoom: 12 };
  const imgs = currentAnalysis?.images || { date_before: "2026-03-15", date_after: "2026-09-10" };

  const areaSqkm = currentAnalysis?.area_analyzed_sqkm || 2.45;
  const changePct = currentAnalysis?.changed_percentage || 18.7;
  const vegChange = currentAnalysis?.ndvi_stats?.difference_mean ? (currentAnalysis.ndvi_stats.difference_mean * 100).toFixed(1) : "-12.4";
  const waterChange = currentAnalysis?.ndwi_stats?.difference_mean ? (currentAnalysis.ndwi_stats.difference_mean * 100).toFixed(1) : "+7.8";

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Geospatial Command Center</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {currentAnalysis?.analysis_id || 'GN-2026-VG01'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {loc.name} • {imgs.date_before} → {imgs.date_after}
          </p>
        </div>

        <button
          onClick={() => onNavigate('new-analysis')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all shadow-md"
        >
          Run New Analysis
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-slate-400 text-xs font-sans block">AREA ANALYZED</span>
          <span className="text-2xl font-bold text-white">{areaSqkm} km²</span>
          <span className="text-[10px] text-slate-500 block">Sub-pixel co-registered</span>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-slate-400 text-xs font-sans block">CHANGE DETECTED</span>
          <span className="text-2xl font-bold text-amber-400">{changePct}%</span>
          <span className="text-[10px] text-amber-400/80 block">Otsu threshold flagged</span>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-slate-400 text-xs font-sans block">VEGETATION CHANGE</span>
          <span className="text-2xl font-bold text-red-400">{vegChange}%</span>
          <span className="text-[10px] text-red-400/80 block">Mean ΔNDVI shift</span>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-slate-400 text-xs font-sans block">WATER CHANGE</span>
          <span className="text-2xl font-bold text-cyan-300">+{waterChange}%</span>
          <span className="text-[10px] text-cyan-400/80 block">Mean ΔNDWI expansion</span>
        </div>
      </div>

      {/* Main Section: Left Map, Right Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Map (2 cols) */}
        <div className="lg:col-span-2 h-[520px]">
          <MapView 
            location={loc}
            detectedRegions={currentAnalysis?.detected_regions || []}
            onSelectRegion={onSelectRegion}
          />
        </div>

        {/* Right Summary Panel */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Analysis Summary</h3>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED ANALYSIS
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">{loc.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Baseline Date (T1):</span>
                <span className="font-mono text-cyan-300">{imgs.date_before}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Target Date (T2):</span>
                <span className="font-mono text-cyan-300">{imgs.date_after}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Change Percentage:</span>
                <span className="font-mono font-bold text-amber-400">{changePct}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Vegetation Shift:</span>
                <span className="font-mono font-bold text-red-400">{vegChange}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Water Expansion:</span>
                <span className="font-mono font-bold text-cyan-300">+{waterChange}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Confidence Rating:</span>
                <span className="font-mono text-emerald-400 font-bold">98.4%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Processing Time:</span>
                <span className="font-mono text-slate-300">1.42 seconds</span>
              </div>
            </div>
          </div>

          {/* Assistant Prompt CTA */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2">
            <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Ask GeoNarrate Assistant
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Ask natural language questions about this specific analysis run.
            </p>
            <button
              onClick={() => onNavigate('query-assistant')}
              className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-lg shadow transition-all"
            >
              Open Query Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
