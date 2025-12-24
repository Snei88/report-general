
import React from 'react';
import { 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, 
  AreaChart, Area, ReferenceLine, Cell
} from 'recharts';
import { 
  ShieldCheck, Activity, Info, Scale, Landmark,
  CheckCircle2, FileText, TrendingUp, Zap
} from 'lucide-react';

const Ley617Analysis: React.FC = () => {
  const combinedData = [
    { year: '2019', value: 38.18, type: 'historico' },
    { year: '2021', value: 36.55, type: 'historico' },
    { year: '2023', value: 35.49, type: 'historico' },
    { year: '2024', value: 36.44, type: 'historico' },
    { year: '2026', value: 41.1, type: 'proyeccion' },
    { year: '2030', value: 40.9, type: 'proyeccion' },
    { year: '2036', value: 41.5, type: 'proyeccion' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isProjected = payload[0].payload.type === 'proyeccion';
      return (
        <div className="bg-[#020617] p-6 rounded-[1.5rem] shadow-2xl border border-white/10 text-white min-w-[200px]">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 border-b border-white/5 pb-2">{label}</p>
          <div className="space-y-3">
            <p className="text-xl font-black leading-none italic">
              Indicador: <span className={isProjected ? "text-teal-400" : "text-[#4c1d95]"}>{payload[0].value}%</span>
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {isProjected ? 'Proyectado MFMP' : 'Certificado Contraloría'}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700 max-w-[1600px] mx-auto">
      
      <div className="bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#1e1b4b] rounded-[3.5rem] p-12 md:p-16 overflow-hidden text-white shadow-2xl relative border border-white/5">
        <div className="absolute -right-20 -top-20 opacity-10 blur-3xl w-[500px] h-[500px] bg-teal-500 rounded-full"></div>
        <div className="absolute right-0 top-0 p-16 opacity-5 pointer-events-none">
            <Scale size={450} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-teal-400 border border-white/20 text-xs font-black uppercase tracking-[0.4em] mb-8">
                    <ShieldCheck size={18} /> Solvencia Distrital Cali 500+
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.85] uppercase italic">
                    Indicador de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white italic">Gestión Ley 617</span>
                </h2>
                <p className="text-slate-300 text-xl font-light leading-relaxed max-w-2xl italic">
                    Cumplimiento del límite legal de gastos de funcionamiento sobre ICLD. Holgura técnica proyectada: <span className="text-white font-bold underline decoration-teal-400">12% Promedio</span>.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full xl:w-auto">
                <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 text-right min-w-[240px] shadow-2xl">
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-2">CGR 2024</p>
                    <p className="text-5xl font-black text-white tracking-tighter italic">36.44%</p>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 text-right min-w-[240px] shadow-2xl">
                    <p className="text-[#4c1d95] text-[10px] font-black uppercase tracking-widest mb-2">Tope Legal</p>
                    <p className="text-5xl font-black text-white tracking-tighter italic">50.0%</p>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col h-[550px]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic border-l-8 border-[#4c1d95] pl-8">Trayectoria Consolidada (2019 - 2036)</h3>
                <p className="text-slate-500 text-lg font-medium italic mt-2">Relación histórica vs perspectiva del Marco Fiscal.</p>
            </div>
            <div className="flex flex-wrap items-center gap-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-200 shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-[6px] bg-[#4c1d95] shadow-lg"></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Histórico</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-[6px] bg-teal-500 shadow-lg"></div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Proyección</span>
                </div>
            </div>
        </div>

        <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedData}>
                    <defs>
                        <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4c1d95" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#4c1d95" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 800}} dy={20} />
                    <YAxis domain={[0, 60]} hide />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={50} stroke="#ef4444" strokeWidth={3} strokeDasharray="12 12" label={{ position: 'top', value: 'LÍMITE 50%', fill: '#ef4444', fontSize: 12, fontWeight: 900 }} />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        strokeWidth={8} 
                        fillOpacity={1}
                        fill="url(#colorL)"
                        dot={(props: any) => {
                            const { cx, cy, payload } = props;
                            const color = payload.type === 'historico' ? '#4c1d95' : '#0d9488';
                            {/* Fixed: Removed non-standard 'shadow' property from circle */}
                            return <circle cx={cx} cy={cy} r={8} fill={color} stroke="#fff" strokeWidth={4} />;
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Ley617Analysis;
