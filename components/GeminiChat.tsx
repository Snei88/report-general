
import React, { useState } from 'react';
import { analyzeInvestmentData } from '../services/geminiService';
import { CALI_PROGRAMS, STRATEGIC_PROJECTS } from '../constants';
import { Sparkles, Send, Loader2, Bot, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const GeminiChat: React.FC<any> = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    const context = `Plan de Desarrollo Cali 2024-2027 "Cali, Capital Pacífica de Colombia" y Visión Cali 500+. Presupuesto 7.8 Trillones.`;

    const result = await analyzeInvestmentData(query, context);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="bg-[#1e1b4b] p-8 rounded-t-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10"><Globe size={100} className="text-white" /></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="p-4 bg-teal-500 text-slate-900 rounded-2xl shadow-xl shadow-teal-500/20">
             <Bot size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Consultoría <span className="text-teal-400">Cali 500+</span></h3>
            <p className="text-slate-400 text-sm font-medium">Analista virtual para planeación financiera y estratégica del Distrito.</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white border-x border-slate-100 p-8 overflow-y-auto custom-sidebar-scroll">
        {!response && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-6 opacity-40">
                <Sparkles size={64} className="animate-pulse" />
                <p className="text-lg font-black uppercase tracking-widest italic">Inicia el análisis técnico...</p>
            </div>
        )}

        {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <Loader2 size={48} className="animate-spin text-teal-500" />
                <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic animate-pulse">Procesando metadatos fiscales...</p>
            </div>
        )}
        
        {response && !loading && (
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 prose prose-slate max-w-none shadow-inner italic font-medium text-slate-700 leading-relaxed animate-in slide-in-from-bottom-4 duration-500">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        )}
      </div>

      <div className="bg-slate-50 p-6 rounded-b-[2.5rem] border border-slate-100 border-t-0 shadow-sm">
        <div className="relative group">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: ¿Cuál es el impacto financiero del Tren de Cercanías en el MFMP?"
            className="w-full pl-8 pr-40 py-6 rounded-[2rem] border border-slate-200 focus:ring-4 focus:ring-[#4c1d95]/5 focus:outline-none bg-white text-slate-800 shadow-xl transition-all text-lg font-medium"
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button 
            onClick={handleAnalyze}
            disabled={loading || !query.trim()}
            className="absolute right-3 top-3 bottom-3 bg-[#4c1d95] text-white px-8 rounded-2xl hover:bg-[#1e1b4b] disabled:opacity-50 flex items-center gap-3 font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-purple-900/20 active:scale-95"
            >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            <span>Consultar</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
