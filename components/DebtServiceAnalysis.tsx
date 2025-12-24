
import React, { useState } from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  AreaChart, Area, BarChart, Bar, Cell, Legend, ReferenceLine, ComposedChart
} from 'recharts';
import { 
  Receipt, Wallet, Calendar, Landmark, ArrowUpRight, TrendingUp,
  ShieldCheck, Info, PieChart, Landmark as BankIcon, Box, Activity,
  ChevronRight, ArrowRight, Table, Layers, Gauge, AlertTriangle, 
  History, TrendingDown, Clock, Scale
} from 'lucide-react';

const DebtServiceAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cronologia' | 'historial' | 'proyeccion'>('cronologia');

  const stockDeudaData = [
    { year: '2016', stock: 360000, label: 'Acuerdo 0407' },
    { year: '2017', stock: 554500, label: 'Acuerdo 0415' },
    { year: '2020', stock: 554500, label: 'Ref. Acuerdo 0476' },
    { year: '2021', stock: 850000, label: 'Acuerdo 0481' },
    { year: '2023', stock: 1010000, label: 'Acuerdo 0572' },
    { year: '2025', stock: 1061187, label: 'Ref. Acuerdo 0579' },
  ];

  const acuerdosTimeline = [
    { 
      acuerdo: 'Acuerdo 0407 (2016)', 
      monto: 360000, 
      bancos: 'Bancolombia, Bogotá, BBVA, Popular',
      contexto: 'Plan Cali Progresa Contigo (2016-2019)',
      estado: 'Refinanciado en 2020 y 2024'
    },
    { 
      acuerdo: 'Acuerdo 0415 (2017)', 
      monto: 194500, 
      bancos: 'Popular, BBVA, Occidente',
      contexto: 'Adición para inversión social y vial',
      estado: 'Saldo actual consolidado en Acuerdo 0476'
    },
    { 
      acuerdo: 'Acuerdo 0481 (2020)', 
      monto: 650000, 
      bancos: 'Bancolombia, Popular, BBVA, Davivienda',
      contexto: 'Plan Cali Un Nuevo Latir (Post-Pandemia)',
      estado: 'Ejecución y reperfilamiento en 2023/2024'
    },
    { 
      acuerdo: 'Acuerdo 0572 (2023)', 
      monto: 71542, 
      bancos: 'Findeter',
      contexto: 'Refuerzo a proyectos estratégicos',
      estado: 'Integrado al saldo total 2025'
    },
    { 
      acuerdo: 'Acuerdo 0579 (2024)', 
      monto: 1061187, 
      bancos: 'Consolidado Multibanca',
      contexto: 'Reperfilamiento Total - Capitalización',
      estado: 'Vigente - Foco en extender plazos'
    }
  ];

  const historicalPayments = [
    { year: '2020', capital: 0, intereses: 120500, label: 'Gracia' },
    { year: '2021', capital: 5400, intereses: 135200, label: 'Perfilamiento' },
    { year: '2022', capital: 2100, intereses: 158400, label: 'Perfilamiento' },
    { year: '2023', capital: 0, intereses: 189000, label: 'Aplazamiento' },
    { year: '2024', capital: 8500, intereses: 195000, label: 'Transición' },
  ];

  const projectionMFMP = [
    { year: '2026', intereses: 270220, capital: 13963, total: 284183, saldo: 2211400 },
    { year: '2027', intereses: 296658, capital: 13963, total: 310620, saldo: 2513544 },
    { year: '2028', intereses: 311946, capital: 188047, total: 499993, saldo: 2325497 },
    { year: '2029', intereses: 275761, capital: 207865, total: 483626, saldo: 2144438 },
    { year: '2030', intereses: 250432, capital: 204374, total: 454806, saldo: 1940064 },
    { year: '2031', intereses: 227167, capital: 172360, total: 399527, saldo: 1767704 },
    { year: '2036', intereses: 81545, capital: 178651, total: 260196, saldo: 561960 },
  ];

  const formatCurrency = (val: number) => `$${new Intl.NumberFormat('es-CO').format(val)} M`;

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-1000 max-w-[1600px] mx-auto text-slate-900">
      
      {/* 1. HERO - DEBT EVOLUTION CONSOLE (Consistent with Cali 500+ Vision) */}
      <div className="bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#1e1b4b] rounded-[3.5rem] p-12 md:p-16 overflow-hidden text-white shadow-2xl relative border border-white/5">
        <div className="absolute right-0 top-0 p-16 opacity-5 pointer-events-none">
            <Scale size={450} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 text-teal-300 border border-white/20 text-xs font-black uppercase tracking-[0.4em] mb-10">
                    <History size={18} /> Evidencia Técnica MFMP 2026-2036
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
                    Cronología de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">la Deuda Distrital</span>
                </h2>
                <p className="text-slate-200 text-xl font-light max-w-3xl leading-relaxed">
                    Análisis del crecimiento del saldo de la deuda según autorizaciones del Concejo. Se observa una <span className="text-teal-400 font-bold underline decoration-teal-400">acumulación sistemática</span> por falta de abono a capital en periodos anteriores.
                </p>

                <div className="flex bg-white/5 p-1.5 rounded-[2.5rem] border border-white/10 mt-12 w-fit">
                    <button onClick={() => setActiveTab('cronologia')} className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'cronologia' ? 'bg-teal-500 text-slate-900 shadow-xl' : 'text-slate-300 hover:text-white'}`}>Crecimiento Saldo</button>
                    <button onClick={() => setActiveTab('historial')} className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'historial' ? 'bg-teal-500 text-slate-900 shadow-xl' : 'text-slate-300 hover:text-white'}`}>Capital vs Intereses</button>
                    <button onClick={() => setActiveTab('proyeccion')} className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'proyeccion' ? 'bg-teal-500 text-slate-900 shadow-xl' : 'text-slate-300 hover:text-white'}`}>Curva 2026-2036</button>
                </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-right min-w-[340px]">
                <p className="text-teal-400 text-xs font-black uppercase mb-3 tracking-widest">Saldo Consolidado 2025</p>
                <p className="text-6xl font-black text-white tracking-tighter">$1.06 <span className="text-2xl font-light text-teal-500/50 italic">Billones</span></p>
                <div className="mt-4 flex items-center justify-end gap-2 text-red-300">
                    <AlertTriangle size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">Crecimiento 2016-25: +194%</span>
                </div>
            </div>
        </div>
      </div>

      {activeTab === 'cronologia' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 h-[550px] flex flex-col">
                <div className="mb-10">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic border-l-8 border-[#4c1d95] pl-6">Stock de Deuda (2016 - 2025)</h3>
                    <p className="text-slate-500 text-lg font-medium italic">Evolución del saldo por efecto de nuevos acuerdos y refinanciaciones.</p>
                </div>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stockDeudaData}>
                            <defs>
                                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4c1d95" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#4c1d95" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 800}} dy={15} />
                            <YAxis hide domain={[0, 1200000]} />
                            <Tooltip 
                                contentStyle={{borderRadius: '24px', border: 'none', shadow: '2xl', padding: '20px'}}
                                formatter={(val: number) => formatCurrency(val)} 
                            />
                            <Area 
                                type="stepAfter" 
                                dataKey="stock" 
                                name="Saldo Deuda" 
                                stroke="#4c1d95" 
                                strokeWidth={5} 
                                fill="url(#colorStock)" 
                                dot={{ r: 6, fill: '#4c1d95', strokeWidth: 3, stroke: '#fff' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] px-4 mb-2 italic">Acuerdos del Concejo Distrital</h3>
                {acuerdosTimeline.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#4c1d95] transition-all group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#1e1b4b] text-white rounded-xl group-hover:bg-[#4c1d95] transition-colors">
                                    <Landmark size={18} />
                                </div>
                                <h4 className="text-base font-black text-slate-900 uppercase tracking-tight italic">{item.acuerdo}</h4>
                            </div>
                            <span className="text-lg font-black text-slate-400 group-hover:text-[#4c1d95] transition-colors">{formatCurrency(item.monto)}</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mb-3">{item.contexto}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.bancos}</span>
                            <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase italic">{item.estado}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {activeTab === 'historial' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 h-[500px] flex flex-col">
                <div className="mb-10">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic border-l-8 border-teal-500 pl-6">Brecha Capital vs. Intereses (2020-2024)</h3>
                    <p className="text-slate-500 text-lg font-medium italic">Evidencia técnica de la ausencia de amortización real en administraciones previas.</p>
                </div>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={historicalPayments}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 800}} />
                            <YAxis hide />
                            <Tooltip formatter={(val: number) => formatCurrency(val)} cursor={{fill: '#f8fafc'}} />
                            <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px'}} />
                            <Bar dataKey="capital" name="Abono a Capital" fill="#0d9488" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="intereses" name="Pago Intereses" fill="#4c1d95" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="lg:col-span-4 bg-[#1e1b4b] p-10 rounded-[3rem] shadow-2xl flex flex-col text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20"><TrendingUp size={150} /></div>
                <div className="relative z-10 flex-1">
                    <h4 className="text-3xl font-black mb-6 uppercase italic tracking-tighter text-teal-400">Efecto "Solo Intereses"</h4>
                    <p className="text-xl font-light leading-relaxed mb-10 text-slate-300">
                        Entre 2020 y 2023, el Distrito destinó <span className="font-black text-white">$603,000 M</span> al pago de intereses, mientras que la deuda solo se redujo en un <span className="font-black text-teal-400">1.2%</span>.
                    </p>
                    <div className="space-y-4">
                        <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-teal-500">Estrategia 2020-2023</p>
                            <p className="text-lg font-bold italic">Perfilamientos continuos para diferir capital.</p>
                        </div>
                        <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-red-400">Consecuencia 2028</p>
                            <p className="text-lg font-bold italic">Pico de Amortización Acumulada: $499,993 M</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'proyeccion' && (
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
             <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic border-l-8 border-[#4c1d95] pl-6">Proyección MFMP: Amortización Obligatoria</h3>
                  <p className="text-slate-500 text-base font-medium italic">Cronograma de pagos tras el agotamiento de periodos de gracia (2026-2036).</p>
                </div>
                <div className="p-5 bg-[#0d9488] text-white rounded-[2rem] shadow-xl shadow-teal-100"><TrendingUp size={32} /></div>
             </div>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-10 py-8 text-left text-xs font-black text-slate-400 uppercase tracking-widest sticky left-0 z-20 bg-slate-50 shadow-sm italic">Variable Presupuestal</th>
                            {projectionMFMP.map(d => <th key={d.year} className="px-8 py-8 text-right text-xs font-black text-slate-400 uppercase tracking-widest">{d.year}</th>)}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="bg-[#1e1b4b] text-white group">
                            <td className="px-10 py-8 whitespace-nowrap sticky left-0 z-10 bg-[#0f172a] border-r border-slate-800 text-xs font-black uppercase tracking-widest italic">Total Servicio Deuda</td>
                            {projectionMFMP.map(d => <td key={d.year} className={`px-8 py-8 text-lg text-right font-black font-mono ${parseInt(d.year) >= 2028 ? 'text-teal-400' : ''}`}>{formatCurrency(d.total)}</td>)}
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-10 py-6 whitespace-nowrap bg-white sticky left-0 z-10 border-r border-slate-50 text-xs font-black text-slate-900 uppercase tracking-widest italic">Abono a Capital</td>
                            {projectionMFMP.map(d => <td key={d.year} className={`px-8 py-6 text-base text-right font-black font-mono ${d.capital > 100000 ? 'text-[#0d9488]' : 'text-slate-400'}`}>{formatCurrency(d.capital)}</td>)}
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="px-10 py-6 whitespace-nowrap bg-white sticky left-0 z-10 border-r border-slate-50 text-xs font-black text-slate-900 uppercase tracking-widest italic">Costo de Intereses</td>
                            {projectionMFMP.map(d => <td key={d.year} className="px-8 py-6 text-base text-right text-[#4c1d95] font-bold font-mono">{formatCurrency(d.intereses)}</td>)}
                        </tr>
                        <tr className="bg-slate-50/50">
                            <td className="px-10 py-8 whitespace-nowrap bg-slate-100 sticky left-0 z-10 border-r border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest italic">Saldo de Cierre</td>
                            {projectionMFMP.map(d => <td key={d.year} className="px-8 py-8 text-base text-right text-slate-500 font-mono font-bold">{formatCurrency(d.saldo)}</td>)}
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
      )}

      {/* FOOTER WARNING - FISCAL ALERT */}
      <div className="p-10 bg-[#f5f3ff] rounded-[3rem] border border-purple-200 flex flex-col md:flex-row items-center gap-10">
          <div className="p-6 bg-[#4c1d95] text-white rounded-[2rem] shadow-xl shadow-purple-200"><AlertTriangle size={40} /></div>
          <div>
              <h4 className="text-2xl font-black text-purple-900 uppercase italic mb-2 tracking-tight">Nota de Riesgo Estructural</h4>
              <p className="text-lg text-purple-800 font-medium leading-relaxed italic">
                  La evidencia documental del <span className="font-black underline">MFMP 2026-2036</span> confirma que el crecimiento del stock de deuda no responde únicamente a nuevas inversiones, sino al <span className="font-black">diferimiento de capital</span> de periodos previos. Esta "carga heredada" genera un pico de exigibilidad fiscal a partir de 2028 que requiere estricta disciplina presupuestal.
              </p>
          </div>
      </div>
    </div>
  );
};

export default DebtServiceAnalysis;
