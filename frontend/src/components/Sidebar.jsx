import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  SplitSquareVertical, 
  Layers, 
  MessageSquareCode, 
  History, 
  Cpu, 
  Info,
  Globe2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, systemStatus }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-analysis', label: 'New Analysis', icon: PlusCircle },
    { id: 'comparison', label: 'Image Comparison', icon: SplitSquareVertical },
    { id: 'change-detection', label: 'Change Detection', icon: Layers },
    { id: 'query-assistant', label: 'Query Assistant', icon: MessageSquareCode },
    { id: 'history', label: 'Analysis History', icon: History },
    { id: 'architecture', label: 'System Architecture', icon: Cpu },
    { id: 'about', label: 'About & Principles', icon: Info },
  ];

  return (
    <aside className="w-64 bg-[#090f1d] border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-950">
            <div className="w-full h-full bg-[#080d1a] rounded-[7px] flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                GeoNarrate
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                SIH'26
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">ISRO / Bhuvan Assistant</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/40 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Footbar */}
      <div className="p-3 m-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">System Status:</span>
          <span className="inline-flex items-center gap-1 font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 text-[11px]">
            <CheckCircle2 className="w-3 h-3" /> ONLINE
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Data Source:</span>
          <span className="font-mono text-cyan-400 font-semibold">DEMO / BHUVAN</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400">CPU Processing:</span>
          <span className="font-mono text-amber-400 font-semibold">READY</span>
        </div>
      </div>
    </aside>
  );
}
