import React, { useState } from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  PieChart, Pie, Cell
} from 'recharts';
import { 
  CheckCircle2, Info, ShieldCheck, Scale, Zap
} from 'lucide-react';

const POAI2026: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'inversion'>('general');

  const gastoPrioridades = [
    { name: 'Inversión', value: 6032669, pct: 77.6, color: '#0d9488' },
    { name: 'Funcionamiento', value: 1452241, pct: 18.7, color: '#4c1d95' },
    { name: 'Deuda Pública', value: 285457, pct: 3.7, color: '#1e1b4b' },
  ];

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-12 md:pb-20 max-w-[1600px] mx-auto px-4 md:px-6">
      
      <div className="bg-gradient-to-br from-[#020617] via-[#1e1b4b] to-[#4c1d95] p-6 md:p-12 lg:p-16 rounded-3xl md:rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 p-6 md:p-12 opacity-5 pointer-events-none">
            <Scale className="text-white w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]" />
        </div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8 md:gap-12 items-center">
            <div className="max-w-4xl w-full">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white/10 text-teal-400 border border-white/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> Decreto Distrital No. 1049 de 2025
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 md:mb-6 leading-[0.9] uppercase italic">
                    Presupuesto Distrital <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Vigencia 2026</span>
                </h1>
                <p className="text-slate-300 text-base md:text-xl font-light leading-relaxed max-w-2xl italic">
                    Análisis técnico del Plan Operativo Anual de Inversiones (POAI) para el Distrito Especial de Santiago de Cali.
                </p>

                <div className="flex bg-white/5 p-1 md:p-1.5 rounded-2xl md:rounded-[2rem] border border-white/10 mt-6 md:mt-10 w-full sm:w-fit overflow-x-auto">
                    <button 
                      onClick={() => setActiveTab('general')} 
                      className={`px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'general' ? 'bg-[#4c1d95] text-white shadow-2xl' : 'text-slate-400 hover:text-white'}`}>
                      Macro-Cifras
                    </button>
                    <button 
                      onClick={() => setActiveTab('inversion')} 
                      className={`px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'inversion' ? 'bg-[#4c1d95] text-white shadow-2xl' : 'text-slate-400 hover:text-white'}`}>
                      Foco Inversión
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full xl:w-auto">
                <div className="bg-white/5 backdrop-blur-3xl p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 w-full shadow-2xl relative text-center sm:text-right">
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 text-teal-400 opacity-20">
                      <Zap className="w-[30px] h-[30px] md:w-10 md:h-10" />
                    </div>
                    <p className="text-teal-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-3">Presupuesto Total</p>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight break-words">
                      $7.77 <span className="text-sm md:text-2xl font-light text-teal-500/50">Tr</span>
                    </p>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/10 w-full shadow-2xl text-center sm:text-right">
                    <p className="text-teal-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-3">Eficiencia Gasto</p>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight break-words">
                      77.6% <span className="text-sm md:text-2xl font-light text-slate-500">Inv</span>
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl md:rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col h-[400px] md:h-[550px]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-12 gap-4 md:gap-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase italic border-l-4 md:border-l-8 border-[#4c1d95] pl-4 md:pl-6">
                      Distribución del Gasto 2026
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 font-medium mt-1 pl-4 md:pl-6">
                      Asignación técnica por naturaleza económica.
                    </p>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gastoPrioridades} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          tick={{fontSize: 11, fontWeight: 800, fill: '#64748b'}} 
                          axisLine={false} 
                          tickLine={false} 
                          dy={15} 
                        />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{
                            borderRadius: '24px', 
                            border: 'none', 
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            fontSize: '12px',
                            padding: '12px'
                          }} 
                        />
                        <Bar dataKey="value" radius={[20, 20, 0, 0]} barSize={80}>
                            {gastoPrioridades.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="lg:col-span-4 bg-[#020617] p-6 md:p-10 rounded-3xl md:rounded-[3.5rem] shadow-2xl text-white flex flex-col relative overflow-hidden min-h-[400px] md:min-h-0">
             <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10">
               <ShieldCheck className="w-[120px] h-[120px] md:w-[180px] md:h-[180px]" />
             </div>
             <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-10 tracking-tight italic">Estructura de Rentas</h3>
             <div className="space-y-6 md:space-y-10 relative z-10 flex-1 flex flex-col justify-center">
                <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-[2rem] border border-white/10 group hover:border-teal-500 transition-all">
                    <div className="flex justify-between items-end mb-3 md:mb-4">
                        <p className="text-teal-400 text-[10px] md:text-xs font-black uppercase tracking-widest">Adm. Central</p>
                        <span className="text-xl md:text-2xl font-black">97.2%</span>
                    </div>
                    <div className="w-full h-2 md:h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[97.2%] shadow-[0_0_15px_rgba(20,184,166,0.5)]"></div>
                    </div>
                </div>

                <div className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-[2rem] border border-white/10 group hover:border-[#4c1d95] transition-all">
                    <div className="flex justify-between items-end mb-3 md:mb-4">
                        <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest">Establ. Públicos</p>
                        <span className="text-xl md:text-2xl font-black text-slate-400">2.8%</span>
                    </div>
                    <div className="w-full h-2 md:h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4c1d95] w-[2.8%] shadow-[0_0_15px_rgba(76,29,149,0.5)]"></div>
                    </div>
                </div>
             </div>
             <div className="mt-6 md:mt-10 flex items-center gap-2 md:gap-3 text-slate-500">
                <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest italic">Datos Certificados DAHM</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default POAI2026;