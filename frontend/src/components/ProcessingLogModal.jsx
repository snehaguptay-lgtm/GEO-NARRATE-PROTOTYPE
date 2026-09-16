import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function ProcessingLogModal({ logs = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-900/80 hover:bg-slate-800/80 flex items-center justify-between text-slate-300 font-mono transition-all"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white">Execution & Pipeline Log</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            {logs.length} Steps Logged
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[11px]">{isOpen ? 'Collapse' : 'Expand Log'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-900">
            <span>DETAILED REMOTE SENSING ENGINE TRACE</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Log'}</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-600 select-none">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-cyan-300">{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
