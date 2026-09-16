import React, { useState } from 'react';
import EvidenceCard from '../components/EvidenceCard';
import { queryGeoNarrate } from '../services/api';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  User, 
  HelpCircle, 
  Loader2,
  MapPin
} from 'lucide-react';

export default function QueryAssistantPage({ currentAnalysis, onNavigate, onSelectRegion }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "system",
      text: "GeoNarrate Query Assistant initialized. Ask natural-language questions about the verified remote sensing statistics computed for this study area.",
      evidence: null
    }
  ]);

  const sampleQueries = [
    "What changed here since March?",
    "Where did vegetation decrease?",
    "Did the water body expand?",
    "How much total area changed?",
    "Which regions require field verification?",
    "Explain the major changes in simple terms."
  ];

  const handleSendQuery = async (queryTextToUse = null) => {
    const textToSend = queryTextToUse || query;
    if (!textToSend.trim() || loading) return;

    // Add user message
    const userMsg = { sender: "user", text: textToSend };
    setChatHistory(prev => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const res = await queryGeoNarrate(currentAnalysis?.analysis_id || "GN-2026-VG01", textToSend);
      const botMsg = {
        sender: "bot",
        text: res.answer,
        evidence: res.evidence,
        narrationMode: res.llm_narration_mode
      };
      setChatHistory(prev => [...prev, botMsg]);
    } catch (err) {
      setChatHistory(prev => [...prev, {
        sender: "bot",
        text: "Error executing query. Please try asking again.",
        evidence: null
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleZoomToRegion = (regionId) => {
    const reg = currentAnalysis?.detected_regions?.find(r => r.id === regionId) || currentAnalysis?.detected_regions?.[0];
    if (reg) {
      onSelectRegion(reg);
      onNavigate('change-detection');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header & Grounding Safety Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquareCode className="w-6 h-6 text-cyan-400" />
            <span>Ask GeoNarrate Assistant</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Query the bi-temporal satellite analysis using plain natural language questions.
          </p>
        </div>

        {/* Safety Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>LLM NARRATION — GROUNDED IN COMPUTED STATISTICS</span>
        </div>
      </div>

      {/* Sample Question Pills */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          Sample Queries (Click to Ask):
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 md:p-6 min-h-[420px] flex flex-col justify-between space-y-6 shadow-2xl">
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`space-y-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-4 rounded-2xl text-xs max-w-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-none shadow-md'
                  : msg.sender === 'system'
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px]'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow'
              }`}>
                {msg.sender === 'bot' && (
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-[10px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" /> GEONARRATE NARRATOR
                    </span>
                    <span className="text-slate-500">{msg.narrationMode || 'Grounded LLM'}</span>
                  </div>
                )}
                {msg.text}
              </div>

              {/* Attached Evidence Card */}
              {msg.evidence && (
                <div className="max-w-2xl text-left">
                  <EvidenceCard evidence={msg.evidence} onZoomToRegion={handleZoomToRegion} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-3 bg-slate-900/60 rounded-xl border border-slate-800 w-max">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              Generating grounded explanation from verified statistics...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }}
          className="flex items-center gap-3 bg-slate-900 p-2 rounded-xl border border-slate-800"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something about the detected changes..."
            className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-extrabold text-xs rounded-lg flex items-center gap-1.5 shadow transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}
