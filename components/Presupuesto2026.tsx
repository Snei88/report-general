import React, { useState } from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import { 
  CheckCircle2, Info, ShieldCheck, Scale, Zap
} from 'lucide-react';

const POAI2026 = () => {
  const [activeTab, setActiveTab] = useState('general');

  const gastoPrioridades = [
    { name: 'Inversión', value: 6032669, pct: 77.6, color: '#0d9488' },
    { name: 'Funcionamiento', value: 1452241, pct: 18.7, color: '#4c1d95' },
    { name: 'Deuda Pública', value: 285457, pct: 3.7, color: '#1e1b4b' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto px-4">
      
      {/* Header Hero - Más compacto y responsivo */}
      <div className="bg-gradient-to-br from-[#020617] via-[#1e1b4b] to-[#4c1d95] p-8 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 p-8 opacity-5 pointer-events-none">
          <Scale className="w-32 h-32 md:w-48 md:h-48 text-white" />
        </div>
        
        <div className="relative z-10 space-y-6">
          {/* Badge y Título */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-teal-400 border border-white/20 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> 
              Decreto Distrital No. 1049 de 2025
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Presupuesto Distrital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">
                Vigencia 2026
              </span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base max-w-2xl">
              Análisis técnico del Plan Operativo Anual de Inversiones (POAI) para el Distrito Especial de Santiago de Cali.
            </p>
          </div>

          {/* Stats y Tabs en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card Presupuesto Total */}
            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-teal-400" />
                <p className="text-teal-400 text-xs font-bold uppercase tracking-wide">
                  Presupuesto Total
                </p>
              </div>
              <p className="text-3xl md:text-4xl font-black text-white">
                $7.77 <span className="text-lg text-teal-400">Tr</span>
              </p>
            </div>

            {/* Card Eficiencia */}
            <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 shadow-lg">
              <p className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-2">
                Eficiencia Gasto
              </p>
              <p className="text-3xl md:text-4xl font-black text-white">
                77.6% <span className="text-lg text-slate-400">Inv</span>
              </p>
            </div>

            {/* Tabs - Ocupa toda la fila en móvil */}
            <div className="md:col-span-2 lg:col-span-1 flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setActiveTab('general')} 
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === 'general' 
                    ? 'bg-[#4c1d95] text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Macro-Cifras
              </button>
              <button 
                onClick={() => setActiveTab('inversion')} 
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === 'inversion' 
                    ? 'bg-[#4c1d95] text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Foco Inversión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Barras - 2/3 del espacio */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 border-l-4 border-[#4c1d95] pl-4 mb-1">
              Distribución del Gasto 2026
            </h3>
            <p className="text-sm text-slate-500 pl-4">
              Asignación técnica por naturaleza económica
            </p>
          </div>
          
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gastoPrioridades} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                    padding: '8px 12px'
                  }}
                  formatter={(value) => `$${(value / 1000000).toFixed(2)}B`}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} maxBarSize={100}>
                  {gastoPrioridades.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel Estructura de Rentas - 1/3 del espacio */}
        <div className="bg-[#020617] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <ShieldCheck className="w-32 h-32" />
          </div>
          
          <h3 className="text-lg font-black mb-6 relative z-10">
            Estructura de Rentas
          </h3>
          
          <div className="space-y-5 relative z-10">
            {/* Administración Central */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500 transition-all">
              <div className="flex justify-between items-end mb-3">
                <p className="text-teal-400 text-xs font-bold uppercase tracking-wide">
                  Adm. Central
                </p>
                <span className="text-xl font-black">97.2%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                  style={{ width: '97.2%' }}
                />
              </div>
            </div>

            {/* Establecimientos Públicos */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#4c1d95] transition-all">
              <div className="flex justify-between items-end mb-3">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                  Establ. Públicos
                </p>
                <span className="text-xl font-black text-slate-400">2.8%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#4c1d95] rounded-full transition-all duration-500" 
                  style={{ width: '2.8%' }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-slate-500 relative z-10">
            <Info className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wide">
              Datos Certificados DAHM
            </span>
          </div>
        </div>
      </div>

      {/* Información adicional según tab activo */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-teal-50 to-white p-5 rounded-xl border border-teal-100">
            <p className="text-teal-700 text-xs font-bold uppercase mb-2">Total Ingresos</p>
            <p className="text-2xl font-black text-teal-900">$7.77 Tr</p>
            <p className="text-xs text-teal-600 mt-1">100% del presupuesto</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100">
            <p className="text-purple-700 text-xs font-bold uppercase mb-2">Inversión Social</p>
            <p className="text-2xl font-black text-purple-900">$6.03 Tr</p>
            <p className="text-xs text-purple-600 mt-1">77.6% del total</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-xl border border-slate-100">
            <p className="text-slate-700 text-xs font-bold uppercase mb-2">Funcionamiento</p>
            <p className="text-2xl font-black text-slate-900">$1.45 Tr</p>
            <p className="text-xs text-slate-600 mt-1">18.7% del total</p>
          </div>
        </div>
      )}

      {activeTab === 'inversion' && (
        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100">
          <h4 className="text-lg font-black text-purple-900 mb-4">
            Foco de Inversión 2026
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5" />
              <div>
                <p className="font-bold text-slate-900">Inversión Prioritaria</p>
                <p className="text-slate-600">77.6% destinado a proyectos estratégicos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5" />
              <div>
                <p className="font-bold text-slate-900">Eficiencia Operativa</p>
                <p className="text-slate-600">Control del gasto de funcionamiento</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POAI2026;