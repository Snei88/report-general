import React, { useState } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
  BarChart, Bar, Cell, ComposedChart, Line
} from 'recharts';
import { 
  ShieldCheck, TrendingUp, TrendingDown, AlertCircle, PieChart as PieIcon, 
  Landmark, Wallet, ArrowUpRight, Scale, Info, Zap, Activity,
  ChevronRight, Award, BarChart3
} from 'lucide-react';

const DebtAnalysis: React.FC = () => {
  const debtServiceData = [
    { year: '2026', intereses: 270220, capital: 13963, total: 284183, saldo: 2211400 },
    { year: '2027', intereses: 296658, capital: 13963, total: 310620, saldo: 2513544 },
    { year: '2028', intereses: 311946, capital: 188047, total: 499993, saldo: 2325497 },
    { year: '2029', intereses: 275761, capital: 207865, total: 483626, saldo: 2144438 },
    { year: '2030', intereses: 250432, capital: 204374, total: 454806, saldo: 1940064 },
    { year: '2031', intereses: 227167, capital: 172360, total: 399527, saldo: 1767704 },
    { year: '2032', intereses: 199931, capital: 319343, total: 519274, saldo: 1448361 },
    { year: '2033', intereses: 162516, capital: 274089, total: 436604, saldo: 1174272 },
    { year: '2034', intereses: 131575, capital: 228252, total: 359826, saldo: 946021 },
    { year: '2035', intereses: 104232, capital: 205410, total: 309642, saldo: 740611 },
    { year: '2036', intereses: 81545, capital: 178651, total: 260196, saldo: 561960 },
  ];

  const indicatorsData = [
    { year: '2026', solvencia: 12, sostenibilidad: 69 },
    { year: '2027', solvencia: 14, sostenibilidad: 82 },
    { year: '2028', solvencia: 16, sostenibilidad: 73 },
    { year: '2029', solvencia: 13, sostenibilidad: 63 },
    { year: '2030', solvencia: 11, sostenibilidad: 55 },
    { year: '2031', solvencia: 10, sostenibilidad: 47 },
    { year: '2032', solvencia: 9, sostenibilidad: 37 },
    { year: '2033', solvencia: 7, sostenibilidad: 28 },
    { year: '2034', solvencia: 6, sostenibilidad: 22 },
    { year: '2035', solvencia: 6, sostenibilidad: 16 },
    { year: '2036', solvencia: 5, sostenibilidad: 12 },
  ];

  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(1)}M`;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      
      {/* 1. HERO (Compacto) */}
      <div className="bg-slate-950 p-8 rounded-[2rem] shadow-xl border border-white/5 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 p-6 opacity-10 pointer-events-none">
            <ShieldCheck size={250} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                <Award size={12} /> AAA(col) / F1+(col)
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 leading-none">
              Gestión de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Deuda Pública</span>
            </h1>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Análisis de solvencia y sostenibilidad distrital.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-right min-w-[260px]">
            <p className="text-amber-500 text-[8px] font-black uppercase tracking-widest mb-1">Saldo 2025</p>
            <p className="text-3xl font-black text-white tracking-tight">$1.06 <span className="text-lg font-light text-slate-400">Billones</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col h-[350px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Indicadores de Endeudamiento</h3>
              <Scale size={20} className="text-slate-300" />
            </div>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={indicatorsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                        <YAxis unit="%" width={30} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                        <Area type="monotone" name="Sostenibilidad" dataKey="sostenibilidad" fill="#6366f1" stroke="#6366f1" fillOpacity={0.1} strokeWidth={3} />
                        <Bar name="Solvencia" dataKey="solvencia" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 bg-amber-600 p-8 rounded-[2rem] shadow-xl text-white flex flex-col justify-center">
            <h4 className="text-2xl font-black mb-2 tracking-tight">Semáforo Ley 358</h4>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-3xl font-black tracking-tighter">VERDE</span>
            </div>
            <p className="text-amber-100 text-xs font-light leading-relaxed">
                Cali mantiene indicadores de solvencia óptimos durante la proyección 2026-2036.
            </p>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Servicio de la Deuda Proyectado</h3>
              <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Cifras Millones</span>
          </div>
          <div className="h-[350px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={debtServiceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                      <YAxis tickFormatter={(val) => `${(val/1000).toFixed(0)}M`} width={35} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Tooltip formatter={(val: number) => formatCurrency(val)} />
                      <Bar stackId="a" name="Capital" dataKey="capital" fill="#0f172a" />
                      <Bar stackId="a" name="Intereses" dataKey="intereses" fill="#d97706" />
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

export default DebtAnalysis;
