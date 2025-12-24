
import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
  BarChart, Bar, ComposedChart, Line, Cell
} from 'recharts';
import { 
  Landmark, ShieldCheck, TrendingUp, Wallet, ArrowUpRight, 
  BarChart3, PieChart as PieIcon, Info, ChevronRight, Activity,
  Coins, Scale, FileText
} from 'lucide-react';

const FinancialPlan: React.FC = () => {
  const years = ['2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'];
  
  // Datos MFMP 2026-2036 (Cifras en millones de pesos)
  const financialData = [
    { year: '2026', ingCorrientes: 6547004, total: 7551545, funcionamiento: 1297031, deuda: 285457, inversion: 5969057, ahorro: 5249973 },
    { year: '2027', ingCorrientes: 6915114, total: 7638294, funcionamiento: 1375849, deuda: 337077, inversion: 5925368, ahorro: 5539265 },
    { year: '2028', ingCorrientes: 7269017, total: 7407069, funcionamiento: 1456704, deuda: 546274, inversion: 5404091, ahorro: 5812313 },
    { year: '2029', ingCorrientes: 7690137, total: 7766564, funcionamiento: 1550449, deuda: 547511, inversion: 5668603, ahorro: 6139688 },
    { year: '2030', ingCorrientes: 8137502, total: 8214022, funcionamiento: 1650308, deuda: 515266, inversion: 6048448, ahorro: 6487194 },
    { year: '2031', ingCorrientes: 8614515, total: 8690246, funcionamiento: 1756838, deuda: 466203, inversion: 6467205, ahorro: 6857677 },
    { year: '2032', ingCorrientes: 9121803, total: 9201219, funcionamiento: 1870454, deuda: 614620, inversion: 6716146, ahorro: 7251349 },
    { year: '2033', ingCorrientes: 9666034, total: 9747712, funcionamiento: 1992227, deuda: 531805, inversion: 7223680, ahorro: 7673807 },
    { year: '2034', ingCorrientes: 10244757, total: 10328763, funcionamiento: 2121786, deuda: 481357, inversion: 7725620, ahorro: 8122971 },
    { year: '2035', ingCorrientes: 10853173, total: 10939578, funcionamiento: 2259863, deuda: 454345, inversion: 8225370, ahorro: 8593310 },
    { year: '2036', ingCorrientes: 11393240, total: 11481715, funcionamiento: 2403875, deuda: 397898, inversion: 8679942, ahorro: 8989365 },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}B`;
    return `$${new Intl.NumberFormat('es-CO').format(val)} M`;
  };

  const formatSimple = (val: number) => `$${(new Intl.NumberFormat('es-CO').format(val))}`;

  const totalInversionDecada = financialData.reduce((acc, curr) => acc + curr.inversion, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* 1. HERO - MFMP VISION 2036 */}
      <div className="bg-[#020617] p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 p-8 opacity-10 pointer-events-none">
            <Scale size={350} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-10 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-black uppercase tracking-[0.3em] mb-6">
                <ShieldCheck size={16} /> Marco Fiscal de Mediano Plazo
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9] uppercase italic">
              Perspectiva <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400">Financiera 2036</span>
            </h1>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-xl">
              Análisis de la solvencia, ahorro corriente y capacidad de inversión para el desarrollo de Santiago de Cali durante la próxima década.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full xl:w-auto">
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 text-right min-w-[260px]">
                <p className="text-teal-400 text-xs font-black uppercase tracking-widest mb-1">Inversión Acumulada</p>
                <p className="text-5xl font-black text-white tracking-tighter">
                    {formatCurrency(totalInversionDecada).split(' ')[0]} <span className="text-2xl font-light text-slate-500">B</span>
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 text-right min-w-[260px]">
                <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-1">Crecimiento Ingresos</p>
                <p className="text-5xl font-black text-white tracking-tighter">+74%</p>
              </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gráfico Principal: Balance Corriente vs Inversión */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-[550px]">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Curva de Capacidad Fiscal</h3>
                    <p className="text-slate-500 text-base font-medium">Relación entre Ingresos Corrientes y Plan de Inversión.</p>
                </div>
                <div className="flex gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div><span className="text-xs font-black text-slate-400 uppercase tracking-widest">Ingresos</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-500"></div><span className="text-xs font-black text-slate-400 uppercase tracking-widest">Inversión</span></div>
                </div>
            </div>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={financialData}>
                        <defs>
                            <linearGradient id="colorIng" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                            <linearGradient id="colorInv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.2}/><stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 14, fontWeight: 800}} dy={15} />
                        <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(1)}B`} width={45} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', shadow: '2xl', padding: '16px'}} formatter={(val: number) => formatCurrency(val)} />
                        <Area type="monotone" name="Inversión" dataKey="inversion" stroke="#2dd4bf" strokeWidth={5} fill="url(#colorInv)" />
                        <Line type="monotone" name="Ingresos" dataKey="ingCorrientes" stroke="#6366f1" strokeWidth={5} dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Mix de Gasto: Stacked Bar */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-[550px]">
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter italic">Estructura del Gasto</h3>
            <p className="text-slate-500 text-xs font-bold mb-8 uppercase tracking-widest">Evolución de la presión fiscal.</p>
            
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData} margin={{ left: -30 }}>
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 12}} />
                        <YAxis hide />
                        <Tooltip formatter={(val: number) => formatCurrency(val)} />
                        <Bar dataKey="inversion" name="Inversión" stackId="a" fill="#2dd4bf" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="funcionamiento" name="Func." stackId="a" fill="#a855f7" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="deuda" name="Deuda" stackId="a" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 space-y-4">
               {[
                 { label: 'Inversión', color: 'bg-teal-500' },
                 { label: 'Funcionamiento', color: 'bg-purple-500' },
                 { label: 'Deuda Pública', color: 'bg-indigo-500' }
               ].map(item => (
                 <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                 </div>
               ))}
            </div>
        </div>
      </div>

      {/* 3. INSIGHTS ESTRATÉGICOS VIVOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f0f9ff] p-8 rounded-[2.5rem] border border-blue-100 flex flex-col group hover:bg-indigo-600 transition-all duration-500 shadow-sm">
              <div className="p-5 bg-white text-indigo-600 rounded-2xl shadow-sm w-fit mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp size={32} />
              </div>
              <h4 className="text-2xl font-black text-indigo-900 group-hover:text-white mb-2 tracking-tight">Crecimiento Sostenido</h4>
              <p className="text-indigo-800/70 group-hover:text-white/80 text-base font-medium leading-relaxed">
                  Los ingresos corrientes proyectan un crecimiento anual promedio del 5.7%, apalancado en la eficiencia tributaria (ICA y Predial).
              </p>
          </div>

          <div className="bg-[#fdf2f8] p-8 rounded-[2.5rem] border border-pink-100 flex flex-col group hover:bg-purple-600 transition-all duration-500 shadow-sm">
              <div className="p-5 bg-white text-purple-600 rounded-2xl shadow-sm w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Scale size={32} />
              </div>
              <h4 className="text-2xl font-black text-purple-900 group-hover:text-white mb-2 tracking-tight">Ahorro Corriente</h4>
              <p className="text-purple-800/70 group-hover:text-white/80 text-base font-medium leading-relaxed">
                  El ahorro corriente positivo garantiza que el Distrito pueda cubrir su funcionamiento y financiar inversión con recursos propios.
              </p>
          </div>

          <div className="bg-[#f0fdfa] p-8 rounded-[2.5rem] border border-teal-100 flex flex-col group hover:bg-teal-600 transition-all duration-500 shadow-sm">
              <div className="p-5 bg-white text-teal-600 rounded-2xl shadow-sm w-fit mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
              </div>
              <h4 className="text-2xl font-black text-teal-900 group-hover:text-white mb-2 tracking-tight">Espacio de Deuda</h4>
              <p className="text-teal-800/70 group-hover:text-white/80 text-base font-medium leading-relaxed">
                  La disminución progresiva del peso de la deuda hacia 2036 libera recursos críticos para nuevos proyectos estratégicos.
              </p>
          </div>
      </div>

      {/* 4. MATRIZ TÉCNICA MFMP COMPLETA */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Matriz Consolidada MFMP 2026-2036</h3>
                <p className="text-slate-500 text-base font-medium">Proyección técnica integral de rentas y gastos distritales.</p>
              </div>
              <div className="flex items-center gap-4">
                  <span className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">Valores en COP Millones</span>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl text-slate-400"><FileText size={24} /></div>
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                      <tr>
                          <th className="px-10 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 sticky left-0 z-20 shadow-sm">Ítem de Presupuesto</th>
                          {years.map(y => <th key={y} className="px-6 py-6 text-right text-xs font-black text-slate-400 uppercase tracking-widest">{y}</th>)}
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-10 py-5 whitespace-nowrap bg-white sticky left-0 z-10 border-r border-slate-50 text-xs font-black text-indigo-600 uppercase tracking-widest">Ingresos Corrientes</td>
                          {financialData.map(d => <td key={d.year} className="px-6 py-5 text-base text-right text-slate-600 font-mono font-bold">{formatSimple(d.ingCorrientes)}</td>)}
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-10 py-5 whitespace-nowrap bg-white sticky left-0 z-10 border-r border-slate-50 text-xs font-black text-purple-600 uppercase tracking-widest">Funcionamiento</td>
                          {financialData.map(d => <td key={d.year} className="px-6 py-5 text-base text-right text-slate-500 font-mono">{formatSimple(d.funcionamiento)}</td>)}
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-10 py-5 whitespace-nowrap bg-white sticky left-0 z-10 border-r border-slate-50 text-xs font-black text-slate-400 uppercase tracking-widest">Servicio de Deuda</td>
                          {financialData.map(d => <td key={d.year} className="px-6 py-5 text-base text-right text-slate-500 font-mono">{formatSimple(d.deuda)}</td>)}
                      </tr>
                      <tr className="bg-indigo-600/5 hover:bg-indigo-600/10 transition-colors">
                          <td className="px-10 py-5 whitespace-nowrap bg-slate-50 sticky left-0 z-10 border-r border-slate-100 text-xs font-black text-indigo-900 uppercase tracking-widest">Ahorro Corriente</td>
                          {financialData.map(d => <td key={d.year} className="px-6 py-5 text-base text-right text-indigo-700 font-black font-mono">{formatSimple(d.ahorro)}</td>)}
                      </tr>
                      <tr className="bg-teal-500 text-white font-bold">
                          <td className="px-10 py-6 whitespace-nowrap bg-teal-600 sticky left-0 z-10 border-r border-teal-700 text-sm font-black uppercase tracking-widest">Capacidad Inversión</td>
                          {financialData.map(d => <td key={d.year} className="px-6 py-6 text-base text-right font-black font-mono">{formatSimple(d.inversion)}</td>)}
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>

      <div className="p-10 bg-white rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl"><Landmark size={40} /></div>
            <div>
              <h4 className="font-black text-slate-900 text-xl uppercase tracking-tighter italic">Validación Técnica DAHM</h4>
              <p className="text-base text-slate-500 font-medium max-w-xl">
                Este modelo financiero ha sido proyectado bajo criterios de prudencia fiscal, considerando las variables macroeconómicas del Ministerio de Hacienda.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              Descargar Informe MFMP <ChevronRight size={18} />
          </button>
      </div>
    </div>
  );
};

export default FinancialPlan;
