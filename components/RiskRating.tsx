
import React from 'react';
import { 
  ShieldCheck, Award, TrendingUp, BarChart3, Info, 
  ExternalLink, CheckCircle2, AlertTriangle, Scale, Building2,
  TrendingDown, FileText, ChevronRight, Zap, Globe, Landmark,
  Calendar, ArrowUpRight, History, MapPin
} from 'lucide-react';

const FITCH_ENTITY_URL = "https://www.fitchratings.com/entity/santiago-de-cali-distrito-especial-de-84112196";

const FitchLogo = () => (
  <a 
    href="https://www.fitchratings.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-baseline select-none hover:opacity-80 transition-opacity group"
  >
    <span className="text-[#be1622] font-serif text-4xl font-bold tracking-tight">Fitch</span>
    <span className="text-slate-700 font-sans text-4xl font-light tracking-tighter">Ratings</span>
    <ExternalLink size={14} className="ml-2 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
  </a>
);

const RiskRating: React.FC = () => {
  const factors = [
    { name: "Ingresos (Solidez)", rating: "Rango Medio", color: "bg-teal-50 text-teal-700 border-teal-100" },
    { name: "Gastos (Sost.)", rating: "Rango Medio", color: "bg-teal-50 text-teal-700 border-teal-100" },
    { name: "Liquidez (Solidez)", rating: "Rango Medio", color: "bg-teal-50 text-teal-700 border-teal-100" },
    { name: "Ahorro Corriente", rating: "Más Fuerte", color: "bg-purple-50 text-[#4c1d95] border-purple-100" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
      
      {/* Header - Identidad Fitch + Contexto Público */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 border-b border-slate-200 pb-10 gap-6">
          <FitchLogo />
          <div className="flex items-center gap-8 text-sm font-black text-slate-500 uppercase tracking-[0.3em] italic">
            <span className="flex items-center gap-2"><Globe size={18} /> Public Finance</span>
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-2"><MapPin size={18} /> Colombia</span>
          </div>
      </div>

      {/* Hero - Calificación Afirmada Cali 500+ */}
      <div className="bg-[#020617] rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute right-0 top-0 p-8 opacity-5 pointer-events-none">
              <ShieldCheck size={400} className="text-white" />
          </div>
          <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-16">
              <div className="max-w-3xl text-center xl:text-left">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#be1622]/10 text-[#ff4d4d] border border-[#be1622]/20 text-xs font-black uppercase tracking-[0.3em] mb-8">
                      <Zap size={16} className="animate-pulse fill-current" /> Reporte Vigente 2025
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight uppercase italic">
                      Santiago <span className="text-slate-500">de Cali</span>
                  </h1>
                  <p className="text-slate-300 text-2xl font-light italic leading-relaxed">
                      Fitch afirma la <span className="text-white font-bold underline decoration-[#be1622] decoration-4 underline-offset-8">Máxima Calificación Nacional</span> sustentada en un perfil crediticio robusto (AAA) y eficiencia en el ahorro corriente.
                  </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 shrink-0">
                  <div className="bg-[#be1622] p-12 rounded-[3rem] text-center min-w-[240px] shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
                      <p className="text-xs font-black text-white/60 uppercase mb-4 tracking-widest">Largo Plazo</p>
                      <p className="text-8xl font-black text-white tracking-tighter italic">AAA</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3rem] text-center min-w-[240px] border border-white/10 shadow-2xl">
                      <p className="text-slate-500 text-xs font-black uppercase mb-4 tracking-widest">Corto Plazo</p>
                      <p className="text-8xl font-black text-white tracking-tighter italic">F1+</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Factores de Calificación */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {factors.map((f, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-teal-500 transition-all duration-500">
                      <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest italic">{f.name}</h4>
                      <span className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest ${f.color} border-2 shadow-sm`}>{f.rating}</span>
                  </div>
              ))}
              
              {/* PCI Box */}
              <div className="md:col-span-2 bg-[#1e1b4b] p-12 rounded-[3.5rem] flex items-center gap-12 shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000"><Scale size={140} /></div>
                  <div className="p-8 bg-white/10 rounded-[2rem] border border-white/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 shrink-0">
                    <Scale size={48} />
                  </div>
                  <div>
                    <h4 className="font-black text-4xl mb-3 tracking-tighter uppercase italic">Perfil Individual (PCI)</h4>
                    <p className="text-slate-400 text-xl font-medium italic leading-relaxed">
                        Sustentado en un <span className="text-teal-400 font-bold">balance operativo proyectado</span> superior a $1.2 Billones para 2029, garantizando autonomía financiera.
                    </p>
                  </div>
              </div>
          </div>

          {/* Historial Lateral */}
          <div className="lg:col-span-4 bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center gap-5">
                  <div className="p-3 bg-[#4c1d95] text-white rounded-xl shadow-lg"><History size={24} /></div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Historial de Calificación</h3>
              </div>
              <div className="p-8 space-y-6 flex-1 bg-slate-50/30 overflow-y-auto">
                  {['2025', '2024', '2023', '2022'].map((year) => (
                      <div key={year} className="p-6 rounded-[2rem] bg-white border border-slate-100 flex justify-between items-center shadow-sm hover:border-teal-500 transition-all duration-300">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Diciembre {year}</span>
                            <span className="text-xl font-black text-slate-900 italic">AAA(col)</span>
                          </div>
                          <span className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-xl text-xs font-black uppercase tracking-tighter border border-teal-100">AFIRMADA</span>
                      </div>
                  ))}
              </div>
              <div className="p-8 bg-slate-100/50 border-t border-slate-100">
                  <a 
                    href={FITCH_ENTITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 p-4 bg-white border-2 border-[#4c1d95] rounded-2xl text-sm font-black text-[#4c1d95] uppercase tracking-widest hover:bg-[#4c1d95] hover:text-white transition-all shadow-lg shadow-purple-900/10 active:scale-95"
                  >
                      Ver Informe Completo en Fitch <ArrowUpRight size={18} />
                  </a>
              </div>
          </div>
      </div>

      {/* Nota Técnica */}
      <div className="p-12 bg-slate-50 rounded-[4rem] border border-slate-200 flex flex-col md:flex-row items-center gap-10 shadow-inner">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl text-slate-400 shadow-sm"><Info size={40} /></div>
          <p className="text-base md:text-lg text-slate-500 font-medium italic leading-relaxed">
            La calificación "AAA" denota la expectativa de que el riesgo de incumplimiento sea mínimo. El indicador "F1+" representa la más sólida capacidad de pago oportuno de los compromisos financieros. Estos resultados validan la <span className="font-black text-[#4c1d95]">disciplina fiscal del Distrito</span> en el marco de la Visión Cali 500+.
          </p>
      </div>
    </div>
  );
};

export default RiskRating;
