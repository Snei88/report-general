
import React, { useMemo } from 'react';
import { CaliProgram } from '../types';
import { 
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, Leaf, ShieldCheck, Target, Globe, Zap, BarChart3, 
  Activity, ArrowUpRight, TrendingUp, Wallet, Landmark
} from 'lucide-react';

const COLORS = {
  reconciliada: '#4c1d95', // Púrpura Cali 500+
  renovada: '#0d9488',      // Teal Sostenibilidad
  gobierno: '#1e1b4b',      // Navy Institucional
  accent: '#2dd4bf',        // Menta Claro
};

export default function Dashboard({ data }: { data: CaliProgram[] }) {
  const totalBudget = data.reduce((sum, p) => sum + p.totalBudget, 0);
  
  const budgetByPurpose = useMemo(() => {
    const grouped = data.reduce((acc, curr) => {
      acc[curr.purpose] = (acc[curr.purpose] || 0) + curr.totalBudget;
      return acc;
    }, {} as Record<string, number>);
    
    return [
      { name: 'Cali Reconciliada', value: grouped['Reconciliada'] || 0, color: COLORS.reconciliada, icon: Users },
      { name: 'Cali Renovada', value: grouped['Renovada'] || 0, color: COLORS.renovada, icon: Leaf },
      { name: 'Buen Gobierno', value: grouped['Buen Gobierno'] || 0, color: COLORS.gobierno, icon: ShieldCheck },
    ];
  }, [data]);

  const yearlyTrend = useMemo(() => {
    return [
      { year: '2024', Rec: 0, Ren: 0, Gob: 0 },
      { year: '2025', Rec: 0, Ren: 0, Gob: 0 },
      { year: '2026', Rec: 0, Ren: 0, Gob: 0 },
      { year: '2027', Rec: 0, Ren: 0, Gob: 0 },
    ].map(item => {
      data.forEach(p => {
        const key = p.purpose === 'Reconciliada' ? 'Rec' : p.purpose === 'Renovada' ? 'Ren' : 'Gob';
        // @ts-ignore
        item[key] += p[`budget${item.year}`] || 0;
      });
      return item;
    });
  }, [data]);

  const formatCurrency = (val: number) => `$${(val / 1000000).toFixed(2)}B`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Banner Principal - CALI CAPITAL PACÍFICA DE COLOMBIA */}
      <div className="bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#0d9488] rounded-[3.5rem] p-10 md:p-14 overflow-hidden text-white shadow-2xl relative border border-white/5">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <Globe size={400} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-teal-300 border border-white/20 text-xs font-black uppercase tracking-[0.2em] mb-6">
                <Target size={14} /> Plan de Desarrollo 2024 - 2027
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic">
              Cali Capital <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Pacífica de Colombia</span>
            </h1>
            <p className="text-slate-200 text-xl font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
              Consolidado plurianual de inversión y programas estratégicos alineados a la <span className="font-black underline decoration-teal-400">Visión 500+</span>.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 text-right min-w-[340px] shadow-2xl">
                <p className="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Presupuesto Total</p>
                <p className="text-5xl font-black text-white tracking-tight">
                  {formatCurrency(totalBudget).split(' ')[0]} <span className="text-2xl font-light text-teal-500/50 italic">B</span>
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-4">Cifras Distritales en COP</p>
          </div>
        </div>
      </div>

      {/* Radar de Gestión Distrital - Executive Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 group hover:border-teal-500 transition-all shadow-sm">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-all">
                <Activity size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ley 617 / CGR</p>
                <p className="text-xl font-black text-slate-900">36.44%</p>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Cumplimiento Óptimo</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 group hover:border-purple-500 transition-all shadow-sm">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all">
                <TrendingUp size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avance Físico POAI</p>
                <p className="text-xl font-black text-slate-900">62.8%</p>
                <span className="text-[9px] font-bold text-purple-500 uppercase tracking-tighter">Promedio Sectores</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 group hover:border-indigo-500 transition-all shadow-sm">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Wallet size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saldo Deuda 2025</p>
                <p className="text-xl font-black text-slate-900">$1.06 B</p>
                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">Stock Afirmado AAA</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 group hover:border-amber-500 transition-all shadow-sm">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                <Landmark size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Desempeño Fiscal</p>
                <p className="text-xl font-black text-slate-900">58.3</p>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-tighter">Nivel Vulnerable</span>
            </div>
          </div>
      </div>

      {/* KPI Cards por Propósito */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {budgetByPurpose.map((item, idx) => (
           <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-[#4c1d95] transition-all group relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="p-5 rounded-2xl text-white shadow-lg shadow-current/20" style={{ backgroundColor: item.color }}>
                        <item.icon size={28} />
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Peso Fiscal</p>
                        <p className="text-xl font-black text-slate-900">{((item.value / totalBudget) * 100).toFixed(1)}%</p>
                    </div>
                </div>
                
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 italic">{item.name}</h3>
                <p className="text-4xl font-black text-slate-900 tracking-tight">
                    {formatCurrency(item.value)}
                </p>
                <div className="mt-8 w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full transition-all duration-1000" style={{ width: `${(item.value / totalBudget) * 100}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
           </div>
         ))}
      </div>

      {/* Gráficos de Tendencia y Composición */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 h-[500px] flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic border-l-8 border-[#4c1d95] pl-6">Curva de Inversión 2024-2027</h3>
              <div className="flex gap-6">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#4c1d95]"></div><span className="text-xs font-black text-slate-400 uppercase tracking-widest">Rec.</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0d9488]"></div><span className="text-xs font-black text-slate-400 uppercase tracking-widest">Ren.</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#1e1b4b]"></div><span className="text-xs font-black text-slate-400 uppercase tracking-widest">Gob.</span></div>
              </div>
            </div>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyTrend}>
                        <defs>
                            <linearGradient id="grad-p" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4c1d95" stopOpacity={0.2}/><stop offset="95%" stopColor="#4c1d95" stopOpacity={0}/></linearGradient>
                            <linearGradient id="grad-t" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/><stop offset="95%" stopColor="#0d9488" stopOpacity={0}/></linearGradient>
                            <linearGradient id="grad-n" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1e1b4b" stopOpacity={0.2}/><stop offset="95%" stopColor="#1e1b4b" stopOpacity={0}/></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 800}} dy={10} />
                        <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(1)}B`} width={45} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', shadow: '2xl', padding: '16px'}} />
                        <Area type="monotone" dataKey="Rec" name="Reconciliada" stackId="1" stroke="#4c1d95" fill="url(#grad-p)" strokeWidth={5} />
                        <Area type="monotone" dataKey="Ren" name="Renovada" stackId="1" stroke="#0d9488" fill="url(#grad-t)" strokeWidth={5} />
                        <Area type="monotone" dataKey="Gob" name="Gobierno" stackId="1" stroke="#1e1b4b" fill="url(#grad-n)" strokeWidth={5} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 bg-[#020617] p-10 rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden border border-white/5">
            <h3 className="text-2xl font-black text-white mb-10 uppercase tracking-widest text-center italic">Mezcla <span className="text-teal-400">Financiera</span></h3>
            <div className="flex-1 relative min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={budgetByPurpose} cx="50%" cy="50%" innerRadius={80} outerRadius={115} paddingAngle={10} dataKey="value" stroke="none">
                            {budgetByPurpose.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none -mt-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Inversión</p>
                    <p className="text-xl font-black text-white tracking-tighter italic">Cali 500+</p>
                </div>
            </div>
            <div className="mt-10 space-y-4">
               {budgetByPurpose.map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-teal-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-lg font-black text-white">{((item.value/totalBudget)*100).toFixed(1)}%</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
