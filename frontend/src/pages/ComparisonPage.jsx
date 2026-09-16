import React from 'react';
import SplitViewer from '../components/SplitViewer';
import { SplitSquareVertical, Calendar, MapPin } from 'lucide-react';

export default function ComparisonPage({ currentAnalysis }) {
  const loc = currentAnalysis?.location || { name: "Cauvery Delta, Tamil Nadu" };
  const imgs = currentAnalysis?.images || { date_before: "2026-03-15", date_after: "2026-09-10" };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Bi-Temporal Satellite Image Comparison</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            {currentAnalysis?.analysis_id || 'GN-2026-VG01'}
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Compare pre-change baseline (T1) vs post-change target (T2) satellite imagery using interactive swipe and blending controls.
        </p>
      </div>

      <SplitViewer analysisData={currentAnalysis} />
    </div>
  );
}
