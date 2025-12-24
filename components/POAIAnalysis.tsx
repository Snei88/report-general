import React from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { FileText, TrendingUp, Users, Wallet, Building2, AlertCircle, CheckCircle2, PieChart as PieIcon } from 'lucide-react';

const POAIAnalysis: React.FC = () => {
  
  // Data from PDF Parágrafo 9 (Page 29/31)
  const strategicLinesData = [
    { name: 'Cali Reconciliada', value: 4339929074303, fill: '#f43f5e' }, // Rose-500
    { name: 'Cali Renovada y Sostenible', value: 1337987650613, fill: '#06b6d4' }, // Cyan-500
    { name: 'Cali con Buen Gobierno', value: 291140052227, fill: '#6366f1' }, // Indigo-500
  ];

  // Data from PDF Article 12 (Page 35) - Grupos Vulnerables
  const vulnerableGroupsData = [
    { name: 'Niños, Niñas y Adolescentes', value: 723650173657 },
    { name: 'Etnias', value: 105153213103 },
    { name: 'Adulto Mayor', value: 43946649785 },
    { name: 'Mujeres', value: 32257686891 },
    { name: 'Víctimas', value: 18482441789 },
    { name: 'Equidad de Género', value: 9885247302 },
    { name: 'Discapacidad', value: 8101495812 },
  ].sort((a, b) => b.value - a.value);

  // Data from PDF Article 1 & 2 - Decentralized Entities
  const entitiesData = [
    { name: 'Institución Univ. Antonio J. Camacho', budget: 118900000000, type: 'Educación' },
    { name: 'Escuela Nacional del Deporte', budget: 83228196000, type: 'Deporte' },
    { name: 'Fondo Especial de Vivienda', budget: 9396854800, type: 'Vivienda' },
    { name: 'Instituto Popular de Cultura (IPC)', budget: 6720866552, type: 'Cultura' },
    { name: 'Teatro Enrique Buenaventura', budget: 776753000, type: 'Cultura' },
  ];

  const totalBudget = 7770567471543;
  const centralInvestment = 5969056777143;
  const debtService = 285457172129;
  const operation = 1297030851919;

  const formatCurrency = (val: number) => {
    if (val >= 1000000000000) return `$${(val / 1000000000000).toFixed(2)} Billones`;
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)} MM`;
    return `$${new Intl.NumberFormat('es-CO').format(val)}`;
  };

  const formatLargeCurrency = (val: number) => {
     return `$${new Intl.NumberFormat('es-CO').format(val)}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Executive Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 p-8 rounded-3xl shadow-xl border border-emerald-900/50 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10">
            <FileText size={200} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest mb-3">
                    <CheckCircle2 size={14} /> Aprobado Ponencia Segundo Debate
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                    POAI 2026: Plan Operativo Anual de Inversiones
                </h1>
                <p className="text-emerald-100/80 max-w-2xl text-lg font-light">
                    Proyecto de Acuerdo No. 062 - Noviembre 2025. Presupuesto General de Rentas y Recursos de Capital.
                </p>
            </div>
            <div className="text-right bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-1">Presupuesto Total 2026</p>
                <p className="text-4xl font-black text-white tracking-tight">{formatCurrency(totalBudget)}</p>
            </div>
        </div>
      </div>

      {/* Main Budget Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-indigo-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <TrendingUp size={24} />
                  </div>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">76.8% del Total</span>
              </div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Inversión Central</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(centralInvestment)}</h3>
              <p className="text-xs text-slate-400 mt-2">Recursos destinados a proyectos y programas.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-amber-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <Building2 size={24} />
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">16.7% del Total</span>
              </div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Funcionamiento</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(operation)}</h3>
              <p className="text-xs text-slate-400 mt-2">Gastos operativos de la administración.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-slate-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                      <Wallet size={24} />
                  </div>
                  <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded-lg">3.7% del Total</span>
              </div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Servicio de Deuda</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(debtService)}</h3>
              <p className="text-xs text-slate-400 mt-2">Pago de obligaciones financieras.</p>
          </div>
      </div>

      {/* Strategic Lines & Vulnerable Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Strategic Lines Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
              <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <PieIcon size={20} className="text-slate-400" />
                      Inversión por Línea Estratégica
                  </h3>
                  <p className="text-sm text-slate-500">Distribución de la Inversión de la Administración Central.</p>
              </div>
              
              <div className="h-[350px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={strategicLinesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={120}
                              paddingAngle={5}
                              dataKey="value"
                          >
                              {strategicLinesData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                              ))}
                          </Pie>
                          <Tooltip 
                              formatter={(value: number) => formatCurrency(value)}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-5 pointer-events-none">
                      <p className="text-xs text-slate-400 font-bold uppercase">Mayor Inversión</p>
                      <p className="text-lg font-black text-rose-500">Reconciliada</p>
                  </div>
              </div>
              
              <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-100">
                  <p className="text-xs text-rose-800 font-medium">
                      <strong>Dato Clave:</strong> "Cali Reconciliada" concentra el 72% de la inversión ($4.33 Billones), priorizando la seguridad, convivencia y la integración social y económica.
                  </p>
              </div>
          </div>

          {/* Vulnerable Groups Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Users size={20} className="text-slate-400" />
                      Gasto Público Social (Grupos Vulnerables)
                  </h3>
                  <p className="text-sm text-slate-500">Recursos específicos asignados por grupo poblacional (Art. 12).</p>
              </div>

              <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                          layout="vertical" 
                          data={vulnerableGroupsData} 
                          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                      >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                          <XAxis type="number" hide />
                          <YAxis 
                              dataKey="name" 
                              type="category" 
                              width={140} 
                              tick={{fontSize: 11, fill: '#475569', fontWeight: 600}} 
                          />
                          <Tooltip 
                              cursor={{fill: '#f8fafc'}}
                              formatter={(value: number) => formatCurrency(value)}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                              {vulnerableGroupsData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#94a3b8'} />
                              ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
              <div className="flex justify-end mt-2">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      Total Grupos: {formatCurrency(941476908339)}
                  </span>
              </div>
          </div>
      </div>

      {/* Decentralized Entities Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <div>
                  <h3 className="text-xl font-bold text-slate-900">Entidades Descentralizadas</h3>
                  <p className="text-sm text-slate-500">Presupuesto asignado a establecimientos públicos.</p>
              </div>
              <div className="p-2 bg-slate-200 rounded-lg text-slate-600">
                  <Building2 size={24} />
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                      <tr>
                          <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Entidad</th>
                          <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Sector</th>
                          <th className="px-8 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Presupuesto 2026</th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                      {entitiesData.map((entity, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-8 py-4 text-sm font-bold text-slate-800">{entity.name}</td>
                              <td className="px-8 py-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                      {entity.type}
                                  </span>
                              </td>
                              <td className="px-8 py-4 text-sm text-right font-mono text-slate-600">
                                  {formatLargeCurrency(entity.budget)}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pb-4">
          <AlertCircle size={12} />
          <span>Información basada en la Ponencia para Segundo Debate - Proyecto de Acuerdo 062 - Noviembre 2025</span>
      </div>

    </div>
  );
};

export default POAIAnalysis;
