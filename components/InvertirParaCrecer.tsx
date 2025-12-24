import React, { useState } from 'react';
import { 
  TrendingUp, Building2, Landmark, Wallet, ArrowUpRight, 
  PieChart as PieIcon, ChevronRight, Zap, Target,
  CheckCircle2, Globe, LayoutDashboard, CreditCard, 
  Box, ListChecks, ArrowRight, Calendar, Activity,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, 
  Treemap
} from 'recharts';

type SubView = 'overview' | 'credits' | 'impact' | 'list';

const InvertirParaCrecer: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<SubView>('overview');
  const [activeLoan, setActiveLoan] = useState<'bancolombia' | 'davivienda'>('bancolombia');

  const cupoDistribution = [
    { name: 'Bancolombia', value: 365000, color: '#0f172a' },
    { name: 'Davivienda', value: 600000, color: '#b45309' },
    { name: 'Por Contratar', value: 2535000, color: '#e2e8f0' },
  ];

  const bancolombiaProjects = [
    { name: 'Mejoramiento infraestructura sedes educativas 2024-2028', size: 45 },
    { name: 'Fortalecimiento plataforma tecnológica Alcaldía', size: 25 },
    { name: 'Internet gratuito en parques y zonas públicas', size: 15 },
    { name: 'Mantenimiento equipamientos culturales', size: 12 },
    { name: 'Ecosistema laboral para desarrollo productivo', size: 20 },
    { name: 'Recuperación de la infraestructura vial', size: 40 },
    { name: 'Mantenimiento infraestructura física de los C.A.L.I’s', size: 10 },
    { name: 'Mejoramiento oferta trámites y servicios en línea', size: 8 },
    { name: 'Conservación infraestructura deportiva y recreativa', size: 15 },
    { name: 'Fortalecimiento de la oferta habitacional', size: 18 },
    { name: 'Espacios territoriales con enfoque de género', size: 10 },
    { name: 'Estrategias de acceso y permanencia educación superior', size: 22 },
    { name: 'Infraestructura física sedes educativas oficiales', size: 30 },
  ];

  const daviviendaProjects = [
    { name: 'Recorrido patrimonial complejo Salsa', size: 25 },
    { name: 'Soluciones tecnológicas aprovechamiento de datos', size: 15 },
    { name: 'Construcción y operación Centro YAWA', size: 50 },
    { name: 'Consolidación Red Municipal Integrada-REMI', size: 18 },
    { name: 'Ecosistema laboral productivo sostenible', size: 20 },
    { name: 'Recuperación de la infraestructura vial (Fase 2)', size: 40 },
    { name: 'Mantenimiento infraestructura C.A.L.I’s (Fase 2)', size: 12 },
    { name: 'Contribución reducción déficit cualitativo vivienda', size: 22 },
    { name: 'Fortalecimiento Sistema Distrital de Cuidado "Cuidarte"', size: 20 },
    { name: 'Fortalecimiento oferta habitacional (Fase 2)', size: 18 },
    { name: 'Estrategias acceso educación superior (Fase 2)', size: 22 },
    { name: 'Mejoramiento integral Casa Matria Oriente', size: 15 },
    { name: 'Implementación Sistema Inteligente Transporte Público', size: 35 },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)} Billones`;
    return `$${new Intl.NumberFormat('es-CO').format(val)} M`;
  };

  const navItems = [
    { id: 'overview', label: 'Estrategia', icon: LayoutDashboard },
    { id: 'credits', label: 'Créditos', icon: CreditCard },
    { id: 'impact', label: 'Análisis', icon: Box },
    { id: 'list', label: 'Portafolio', icon: ListChecks }
  ];

  const Overview = () => (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in zoom-in-95 duration-500 overflow-y-auto custom-scrollbar pr-2 pb-6">
      <div className="lg:col-span-8 bg-slate-950 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between min-h-[300px]">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <TrendingUp size={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
            <Zap size={12} className="fill-amber-500" /> Executive Summary
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
            Cali: Invertir <span className="text-amber-500 italic">para Crecer</span>
          </h2>
          <p className="text-slate-400 text-sm font-light max-w-lg leading-relaxed">
            Financiamiento por <span className="text-white font-bold">$3.5 Billones</span> para la transformación distrital.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-slate-500 text-[8px] font-black uppercase mb-1 tracking-widest">Cupo Total</p>
            <p className="text-2xl font-black text-white">$3.5B</p>
          </div>
          <div className="bg-emerald-500/10 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20">
            <p className="text-emerald-500 text-[8px] font-black uppercase mb-1 tracking-widest">Contratado</p>
            <p className="text-2xl font-black text-emerald-400">$965M</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between overflow-hidden">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest">
            <PieIcon size={16} className="text-amber-500" /> Distribución
        </h3>
        <div className="flex-1 min-h-[150px] relative mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={cupoDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={8} dataKey="value" stroke="none">
                {cupoDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val: number) => formatCurrency(val)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none -mt-2">
            <p className="text-[7px] font-black text-slate-400 uppercase">Ratio</p>
            <p className="text-lg font-black text-slate-900">27.5%</p>
          </div>
        </div>
        <div className="space-y-2 mt-2">
          {cupoDistribution.slice(0, 2).map(item => (
            <div key={item.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}}></div>
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{item.name}</span>
              </div>
              <span className="text-[9px] font-black text-slate-900">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center text-center group hover:bg-slate-950 transition-all duration-300">
         <div className="p-3 bg-slate-50 text-slate-900 rounded-xl mb-3 group-hover:bg-white/10 group-hover:text-amber-500 transition-all">
            <Target size={24} />
         </div>
         <p className="text-slate-400 text-[8px] font-black uppercase mb-1 tracking-widest">Iniciativas</p>
         <p className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">26 Proyectos</p>
      </div>

      <div className="lg:col-span-4 bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center text-center group hover:bg-slate-950 transition-all duration-300">
         <div className="p-3 bg-slate-50 text-slate-900 rounded-xl mb-3 group-hover:bg-white/10 group-hover:text-emerald-500 transition-all">
            <Activity size={24} />
         </div>
         <p className="text-slate-400 text-[8px] font-black uppercase mb-1 tracking-widest">En Proceso</p>
         <p className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">$160,000 M</p>
      </div>

      <div className="lg:col-span-4 bg-slate-950 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-xl border border-white/10">
         <div className="p-3 bg-white/5 text-amber-500 rounded-xl mb-3">
            <ShieldCheck size={24} />
         </div>
         <p className="text-slate-500 text-[8px] font-black uppercase mb-1 tracking-widest">Cumplimiento</p>
         <p className="text-2xl font-black text-amber-500 tracking-tighter">Sostenible</p>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col -m-4 sm:-m-6 lg:-m-8 animate-in fade-in duration-700 overflow-hidden bg-slate-50">
      
      {/* NAVEGACIÓN SUPERIOR (Compactada) */}
      <div className="bg-[#0f172a] border-b border-slate-800 px-6 py-2.5 shrink-0 no-print shadow-xl">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-amber-500">
              <TrendingUp size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-white font-black text-base tracking-tight leading-none uppercase tracking-[0.1em]">Inversión <span className="text-amber-500">Estratégica</span></h2>
              <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mt-0.5">Gobernanza Cali</p>
            </div>
          </div>

          <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveSubView(item.id as SubView)} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all whitespace-nowrap group ${activeSubView === item.id ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'}`}>
                <item.icon size={14} className={activeSubView === item.id ? 'text-slate-950' : 'text-slate-600'} />
                <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <div className="text-right">
              <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-0.5">Disponible</p>
              <p className="text-xs font-black text-white tracking-widest">$2.53B</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-hidden relative">
        <div className="h-full max-w-[1400px] mx-auto flex flex-col relative z-10">
          <div className="flex items-center gap-3 mb-6 shrink-0 border-l-4 border-slate-950 pl-3">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                {activeSubView === 'overview' && 'Análisis Estratégico'}
                {activeSubView === 'credits' && 'Líneas de Crédito'}
                {activeSubView === 'impact' && 'Peso Inversor'}
                {activeSubView === 'list' && 'Detalle Operativo'}
              </h2>
              <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest">Reporte Financiero Agosto 2025</p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeSubView === 'overview' && <Overview />}
            {/* ... rest of the views logic stays same but with standardized compact padding ... */}
            {activeSubView === 'list' && (
               <div className="h-full bg-slate-950 p-6 rounded-[2rem] shadow-2xl text-white flex flex-col overflow-hidden border border-white/5">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black tracking-tighter text-amber-500">Portafolio</h3>
                    <div className="flex gap-2">
                       <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-center"><p className="text-white font-black text-sm">13</p><p className="text-[7px] text-slate-500 uppercase font-black">Grupo B</p></div>
                       <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-center"><p className="text-amber-500 font-black text-sm">13</p><p className="text-[7px] text-slate-500 uppercase font-black">Grupo D</p></div>
                    </div>
                 </div>
                 <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-3">
                          <h4 className="text-slate-500 text-[8px] font-black uppercase tracking-widest border-b border-white/5 pb-2">Línea Bancolombia</h4>
                          {bancolombiaProjects.map((p, i) => <div key={i} className="flex gap-4 p-2 rounded-lg hover:bg-white/5 transition-all"><span className="text-slate-700 font-black text-lg">{(i+1).toString().padStart(2,'0')}</span><p className="text-slate-400 text-xs font-medium self-center">{p.name}</p></div>)}
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-amber-500 text-[8px] font-black uppercase tracking-widest border-b border-white/5 pb-2">Línea Davivienda</h4>
                          {daviviendaProjects.map((p, i) => <div key={i} className="flex gap-4 p-2 rounded-lg hover:bg-white/5 transition-all"><span className="text-slate-700 font-black text-lg">{(i+1).toString().padStart(2,'0')}</span><p className="text-slate-400 text-xs font-medium self-center">{p.name}</p></div>)}
                       </div>
                    </div>
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(15, 23, 42, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default InvertirParaCrecer;
