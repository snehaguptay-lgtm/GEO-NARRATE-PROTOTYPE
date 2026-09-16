import React, { useState, useEffect } from 'react';
import { fetchHistory } from '../services/api';
import { History, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HistoryPage({ onLoadAnalysis }) {
  const [historyList, setHistoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory().then(data => setHistoryList(data));
  }, []);

  const filtered = historyList.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.analysis_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-cyan-400" />
            <span>Analysis History Log</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Search and reload previously generated satellite change detection results.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, location..."
            className="bg-[#0f172a] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 w-64 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Analysis ID</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Dates (T1 → T2)</th>
                <th className="p-3.5">Changed Area</th>
                <th className="p-3.5">Primary Change</th>
                <th className="p-3.5">Satellite Feed</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filtered.map((item) => (
                <tr key={item.analysis_id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-cyan-400">{item.analysis_id}</td>
                  <td className="p-3.5 font-sans font-semibold text-white">{item.location?.name}</td>
                  <td className="p-3.5 text-slate-300">{item.images?.date_before} → {item.images?.date_after}</td>
                  <td className="p-3.5 font-bold text-amber-400">{item.changed_area_sqkm} km² ({item.changed_percentage}%)</td>
                  <td className="p-3.5 text-slate-300 font-sans">{item.detected_regions?.[0]?.change_type || 'Vegetation Loss'}</td>
                  <td className="p-3.5 text-slate-400">{item.images?.satellite_source}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onLoadAnalysis(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-black font-extrabold text-[11px] transition-all"
                    >
                      Load Result
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
