import React, { useMemo } from 'react';
import { MergedProject } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Line, ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { AlertTriangle, CheckCircle2, TrendingUp, Target, List } from 'lucide-react';

interface PlanIndicativoProps {
  data: MergedProject[];
}

const PlanIndicativo: React.FC<PlanIndicativoProps> = ({ data }) => {
  // 1. Calculate Average Physical Progress per Sector
  const sectorPerformance = useMemo(() => {
    const grouped: Record<string, { total: number; count: number; budget: number }> = {};
    
    data.forEach(p => {
      if (!grouped[p.Sector]) {
        grouped[p.Sector] = { total: 0, count: 0, budget: 0 };
      }
      grouped[p.Sector].total += p.PorcentajeAvanceFisico;
      grouped[p.Sector].budget += p.PresupuestoAsignadoAcumulado;
      grouped[p.Sector].count += 1;
    });

    return Object.entries(grouped)
      .map(([name, val]) => ({
        name,
        avgProgress: parseFloat((val.total / val.count).toFixed(1)),
        totalBudget: val.budget,
        count: val.count
      }))
      .sort((a, b) => b.avgProgress - a.avgProgress);
  }, [data]);

  // 2. Identify Projects at Risk (High Budget, Low Progress)
  const projectsAtRisk = useMemo(() => {
    return data
      .filter(p => p.PorcentajeAvanceFisico < 50 && p.PresupuestoAsignadoAcumulado > 100000000) // Arbitrary threshold for "High Budget" relevance
      .sort((a, b) => b.PresupuestoAsignadoAcumulado - a.PresupuestoAsignadoAcumulado)
      .slice(0, 5);
  }, [data]);

  // 3. Efficiency Stats
  const stats = useMemo(() => {
    const completed = data.filter(p => p.PorcentajeAvanceFisico === 100).length;
    const inProgress = data.filter(p => p.PorcentajeAvanceFisico > 0 && p.PorcentajeAvanceFisico < 100).length;
    const notStarted = data.filter(p => p.PorcentajeAvanceFisico === 0).length;
    return { completed, inProgress, notStarted };
  }, [data]);

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) return `$${(val/1000000000).toFixed(1)}MM`;
    if (val >= 1000000) return `$${(val/1000000).toFixed(1)}M`;
    return `$${val}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Metas Cumplidas (100%)</p>
            <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">En Ejecución</p>
            <p className="text-2xl font-bold text-slate-900">{stats.inProgress}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Sin Avance Físico</p>
            <p className="text-2xl font-bold text-slate-900">{stats.notStarted}</p>
          </div>
        </div>
      </div>

      {/* Main Chart: Sector Performance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[500px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Target size={20} className="text-indigo-600" />
          Avance Físico Promedio por Sector
        </h3>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart data={sectorPerformance} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 20 }}>
            <CartesianGrid stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} unit="%" />
            <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 11}} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(val: number) => [`${val}%`, 'Avance Promedio']}
            />
            <Bar dataKey="avgProgress" barSize={20} radius={[0, 4, 4, 0]}>
              {sectorPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.avgProgress > 80 ? '#10b981' : entry.avgProgress > 50 ? '#3b82f6' : '#ef4444'} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Projects at Risk Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-red-50 flex justify-between items-center">
            <h3 className="font-bold text-red-900 flex items-center gap-2">
              <AlertTriangle size={18} />
              Alertas: Proyectos Críticos
            </h3>
            <span className="text-xs text-red-700 bg-white/50 px-2 py-1 rounded-full">Bajo Avance / Alto Presupuesto</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Proyecto</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Presupuesto</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Avance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {projectsAtRisk.map((p) => (
                  <tr key={p.CodigoBP} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs text-slate-700 line-clamp-2 max-w-[200px]" title={p.NombreProyecto}>
                      {p.NombreProyecto}
                    </td>
                    <td className="px-4 py-3 text-xs text-right font-mono text-slate-600">
                      {formatCurrency(p.PresupuestoAsignadoAcumulado)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        {p.PorcentajeAvanceFisico}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Efficiency Scatter */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <List size={18} className="text-blue-500" />
              Dispersión de Eficiencia
           </h3>
           <p className="text-xs text-slate-500 mb-4">Relación entre número de proyectos y avance promedio por sector.</p>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="avgProgress" name="Avance Promedio" unit="%" domain={[0, 100]} />
                  <YAxis type="number" dataKey="count" name="Cantidad Proyectos" allowDecimals={false} />
                  <ZAxis type="number" dataKey="totalBudget" range={[60, 400]} name="Presupuesto Total" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                     formatter={(value: any, name: any) => {
                        if (name === 'Presupuesto Total') return formatCurrency(value);
                        return value;
                     }}
                     content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-xl text-xs">
                              <p className="font-bold text-slate-800 mb-1">{d.name}</p>
                              <p>Avance: <strong>{d.avgProgress}%</strong></p>
                              <p>Proyectos: <strong>{d.count}</strong></p>
                              <p>Presupuesto: <strong>{formatCurrency(d.totalBudget)}</strong></p>
                            </div>
                          );
                        }
                        return null;
                     }}
                  />
                  <Scatter name="Sectores" data={sectorPerformance} fill="#8884d8">
                    {sectorPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>
    </div>
  );
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

export default PlanIndicativo;