import React, { useState } from 'react';
import { 
  ShieldAlert, 
  HelpCircle, 
  Database, 
  Activity, 
  User, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Play
} from 'lucide-react';

export default function Topbar({ 
  currentAnalysis, 
  onSelectScenario, 
  activeScenario 
}) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <header className="h-16 bg-[#090f1d] border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">ANALYSIS ID:</span>
            <span className="text-cyan-400 font-bold">{currentAnalysis?.analysis_id || 'GN-2026-VG01'}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">SOURCE:</span>
            <span className="text-slate-200">{currentAnalysis?.images?.satellite_source || 'Bhuvan / Sentinel-2'}</span>
          </div>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED ANALYSIS
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Demo Mode Badge */}
          <button
            onClick={() => setShowDemoModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-300 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/30 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>DEMO MODE</span>
          </button>

          {/* User Icon */}
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Demo Mode Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Prototype Demo Mode Active</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  This prototype uses pre-loaded synthetic remote-sensing datasets to demonstrate the full GeoNarrate workflow. Real Bhuvan WMS / Cartosat / RISAT feeds can be connected directly via the data ingestion layer.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Select Pre-Packaged Demo Scenario:</h4>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  {
                    id: "vegetation_loss",
                    name: "1. Seasonal Crop Harvest & Deforestation",
                    region: "Cauvery Delta, Tamil Nadu",
                    detail: "NDVI reduction (-18.7%), agricultural clearing"
                  },
                  {
                    id: "flood_expansion",
                    name: "2. Monsoon River Flooding & Water Inundation",
                    region: "Kaziranga Basin, Assam",
                    detail: "NDWI increase (+21.8%), submerged buffer zone"
                  },
                  {
                    id: "urban_expansion",
                    name: "3. Industrial Park Clearing & Construction",
                    region: "Devanahalli Corridor, Bengaluru",
                    detail: "Built-up & land clearing (+14.4%)"
                  }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      onSelectScenario(sc.id);
                      setShowDemoModal(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      activeScenario === sc.id
                        ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md shadow-cyan-950'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-cyan-200">{sc.name}</div>
                      <div className="text-slate-400 mt-0.5">{sc.region} • {sc.detail}</div>
                    </div>
                    <Play className={`w-4 h-4 ${activeScenario === sc.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-[11px] text-slate-400 font-mono">
              <span className="text-amber-400">NOTE:</span> GeoNarrate NEVER asks an LLM to guess from raw pixels. The deterministic remote-sensing engine computes auditable statistics first.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg"
              >
                Close & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
