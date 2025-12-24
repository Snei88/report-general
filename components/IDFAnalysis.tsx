
import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, 
  ReferenceLine
} from 'recharts';
import { 
  TrendingDown, Scale, Building2, ExternalLink, Activity, Target,
  Globe, BarChart2, ShieldCheck, TrendingUp
} from 'lucide-react';

const IDFAnalysis: React.FC = () => {
  const historicalData = [
    { year: '2000', score: 52 }, { year: '2005', score: 58 }, { year: '2010', score: 81 },
    { year: '2015', score: 79 }, { year: '2019', score: 79 }, { year: '2020', score: 70 },
    { year: '2021', score: 65 }, { year: '2022', score: 66 }, { year: '2023', score: 69.6 },
    { year: '2024', score: 58.3 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
      
      <div className="bg-[#020617] p-12 md:p-14 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none">
            <Scale size={350} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-teal-400 border border-white/20 text-xs font-black uppercase tracking-[0.3em] mb-8">
                    <Activity size={16} /> Evaluación de Gestión Fiscal DNP
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.95] uppercase italic">
                    Desempeño <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Fiscal Distrital</span>
                </h1>
                <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto lg:mx-0">
                    Diagnóstico técnico de solvencia. Cali se ubica actualmente en rango de <span className="text-white font-bold underline decoration-[#4c1d95]">Vulnerabilidad Fiscal (58.3)</span>.
                </p>
            </div>

            <div className="flex items-center gap-8 w-full lg:w-auto">
                <div className="bg-white/5 backdrop-blur-3xl px-12 py-10 rounded-[2.5rem] border border-white/10 text-right min-w-[240px] shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#4c1d95]"></div>
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-2">Puntaje Global</p>
                    <p className="text-6xl font-black text-white tracking-tighter">58.3</p>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl px-12 py-10 rounded-[2.5rem] border border-white/10 text-right min-w-[240px] shadow-2xl">
                    <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-2">Estatus DNP</p>
                    <p className="text-4xl font-black text-red-500 italic">RIESGO</p>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic border-l-8 border-[#4c1d95] pl-8">Evolución Histórica (2000 - 2024)</h3>
                <p className="text-slate-500 text-lg font-medium italic mt-2">Trayectoria del puntaje bajo nueva metodología de desempeño.</p>
            </div>
            <div className="flex gap-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#4c1d95] shadow-lg shadow-purple-200"></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Puntaje Cali</span>
                </div>
                <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
                    <div className="w-12 h-1 bg-red-500 rounded-full"></div>
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Umbral de Riesgo</span>
                </div>
            </div>
        </div>

        <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                    <defs>
                        <linearGradient id="colorIDF" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4c1d95" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#4c1d95" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 800}} dy={20} />
                    <YAxis domain={[40, 90]} hide />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', shadow: '2xl', padding: '20px'}} />
                    <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="12 12" strokeWidth={3} />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4c1d95" 
                      strokeWidth={6} 
                      fill="url(#colorIDF)" 
                      dot={{ r: 8, fill: '#4c1d95', strokeWidth: 4, stroke: '#fff' }} 
                      activeDot={{ r: 12, fill: '#0d9488' }} 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IDFAnalysis;
