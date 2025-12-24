
import React, { useState } from 'react';
import { 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, 
  Bar, Cell, ComposedChart, Area
} from 'recharts';
import { 
  ShieldCheck, Landmark, ArrowUpRight, Scale, Activity,
  CreditCard, Building2, Rocket, Zap, Clock
} from 'lucide-react';

const CreditResources: React.FC = () => {
  const [activeBank, setActiveBank] = useState<'all' | 'bancolombia' | 'davivienda'>('all');

  const indicatorsData = [
    { year: '2026', solvencia: 12, sostenibilidad: 69 },
    { year: '2027', solvencia: 14, sostenibilidad: 82 },
    { year: '2028', solvencia: 16, sostenibilidad: 73 },
    { year: '2029', solvencia: 13, sostenibilidad: 63 },
    { year: '2030', solvencia: 11, sostenibilidad: 55 },
  ];

  const projectsData = [
    { name: 'Yawa: Centro Ciencia y Tecnología', bank: 'Davivienda', amount: 50000, status: 'Ejecución', color: 'bg-teal-50 text-teal-700' },
    { name: 'Infraestructura Educativa 2024', bank: 'Bancolombia', amount: 45000, status: 'Terminado', color: 'bg-purple-50 text-purple-700' },
    { name: 'Infraestructura Vial Fase 1', bank: 'Bancolombia', amount: 40000, status: 'Ejecución', color: 'bg-teal-50 text-teal-700' },
    { name: 'Plataforma Tecnológica Distrital', bank: 'Bancolombia', amount: 25000, status: 'Ejecución', color: 'bg-teal-50 text-teal-700' },
  ];

  const formatCurrency = (val: number) => `$${(val / 1000).toFixed(1)}M`;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      
      <div className="bg-[#1e1b4b] rounded-[3.5rem] p-12 overflow-hidden text-white shadow-2xl relative border border-white/5">
        <div className="absolute -right-20 -top-20 opacity-10 blur-3xl w-[500px] h-[500px] bg-teal-500 rounded-full"></div>
        <div className="absolute right-0 top-0 p-16 opacity-5 pointer-events-none">
            <CreditCard size={350} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
            <div className="flex-1">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-teal-400 border border-white/20 text-xs font-black uppercase tracking-[0.4em] mb-8">
                    <ShieldCheck size={18} /> Gobernanza Financiera Cali 500+
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic">
                    Recursos del <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Crédito Público</span>
                </h2>
                <p className="text-slate-300 text-xl font-light max-w-xl italic leading-relaxed">
                    Apalancamiento estratégico para obras de alto impacto social y territorial. Cupo vigente: <span className="text-white font-bold">$3.5 Billones</span>.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full xl:w-auto">
                <div className="bg-white/5 backdrop-blur-3xl px-10 py-8 rounded-[2.5rem] border border-white/10 text-right min-w-[220px] shadow-2xl">
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-2">Contratado</p>
                    <p className="text-5xl font-black text-white tracking-tighter">$965<span className="text-2xl font-light text-teal-500/50">M</span></p>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl px-10 py-8 rounded-[2.5rem] border border-white/10 text-right min-w-[220px] shadow-2xl">
                    <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-2">Disponible</p>
                    <p className="text-5xl font-black text-white tracking-tighter">$2.53<span className="text-2xl font-light text-slate-500">B</span></p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic border-l-8 border-[#4c1d95] pl-6">Sostenibilidad Ley 358</h3>
              <div className="flex gap-8 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-inner">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#4c1d95]"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sost.</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0d9488]"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solv.</span></div>
              </div>
            </div>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={indicatorsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 800}} dy={15} />
                        <YAxis unit="%" width={35} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', shadow: '2xl'}} />
                        <Area type="monotone" name="Sostenibilidad" dataKey="sostenibilidad" fill="#4c1d95" stroke="#4c1d95" fillOpacity={0.1} strokeWidth={5} />
                        <Bar name="Solvencia" dataKey="solvencia" fill="#0d9488" radius={[12, 12, 0, 0]} barSize={40} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 bg-[#020617] p-10 rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-2xl font-black text-white mb-12 tracking-tighter uppercase italic">Instancia Fiscal</h3>
            <div className="flex-1 flex flex-col justify-center items-center gap-6">
                <div className="w-40 h-40 rounded-full border-4 border-teal-500/20 flex items-center justify-center bg-teal-500/5 shadow-[0_0_50px_rgba(20,184,166,0.1)] group-hover:scale-110 transition-transform duration-700">
                    <span className="text-4xl font-black text-teal-400 italic">ÓPTIMO</span>
                </div>
                <div className="space-y-2">
                    <p className="text-white font-black text-lg uppercase tracking-widest">Semáforo Verde</p>
                    <p className="text-slate-500 text-xs leading-relaxed uppercase font-bold tracking-widest italic">Pleno cumplimiento límites legales</p>
                </div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-[#1e1b4b] text-white rounded-2xl shadow-xl"><Rocket size={24} /></div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic">Portafolio de Inversión (Crédito)</h3>
                    <p className="text-slate-500 font-medium italic">Priorización técnica de proyectos apalancados.</p>
                </div>
              </div>

              <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200">
                  {['Todos', 'Bancolombia', 'Davivienda'].map(bank => (
                      <button key={bank} onClick={() => setActiveBank(bank.toLowerCase() as any)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeBank === bank.toLowerCase() ? 'bg-[#1e1b4b] text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}>{bank}</button>
                  ))}
              </div>
          </div>

          <div className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectsData.filter(p => activeBank === 'all' || p.bank.toLowerCase() === activeBank).map((project, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:scale-[1.03] hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-2 h-full ${project.bank === 'Bancolombia' ? 'bg-[#4c1d95]' : 'bg-[#0d9488]'}`} />
                          <div className="flex justify-between items-start mb-4">
                              <span className={`text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest border border-current opacity-70 ${project.color}`}>{project.status}</span>
                              <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400"><Zap size={16} /></div>
                          </div>
                          <h4 className="text-xs font-black text-slate-900 uppercase leading-relaxed mb-6 group-hover:text-[#4c1d95] transition-colors h-12 line-clamp-2">{project.name}</h4>
                          <div className="flex justify-between items-end pt-5 border-t border-slate-200">
                              <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monto Asignado</p>
                                  <p className="text-xl font-black text-slate-900 italic">{formatCurrency(project.amount)}</p>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-teal-500 shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-all"><ArrowUpRight size={18} /></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default CreditResources;
