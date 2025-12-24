import React, { useMemo, useState } from 'react';
import { CALI_PROGRAMS, ODS_DICTIONARY, STRATEGIC_PROJECTS } from '../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { Globe, Target, ArrowRight, BookOpen, Coins, ChevronRight, X, Rocket } from 'lucide-react';

const ODSAlignment: React.FC = () => {
  const [selectedOdsId, setSelectedOdsId] = useState<number | null>(null);

  const odsData = useMemo(() => {
    const map = new Map<number, number>();
    const countMap = new Map<number, number>();

    CALI_PROGRAMS.forEach(program => {
      const odsCount = program.ods.length;
      if (odsCount === 0) return;

      const budgetShare = program.totalBudget / odsCount;
      
      program.ods.forEach(odsId => {
        map.set(odsId, (map.get(odsId) || 0) + budgetShare);
        countMap.set(odsId, (countMap.get(odsId) || 0) + 1);
      });
    });

    return Array.from(map.entries())
      .map(([id, value]) => ({
        id,
        name: ODS_DICTIONARY[id]?.name || `ODS ${id}`,
        color: ODS_DICTIONARY[id]?.color || '#cbd5e1',
        value: value,
        count: countMap.get(id) || 0,
        formattedValue: value 
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const formatCurrency = (val: number) => {
    const trillions = val / 1000000;
    return `$${trillions.toFixed(2)} Billones`;
  };

  const formatMillions = (val: number) => {
    return `$${new Intl.NumberFormat('es-CO').format(Math.round(val))} M`;
  };

  // Derived state for the selected details
  const selectedDetails = useMemo(() => {
    if (!selectedOdsId) return null;
    const info = ODS_DICTIONARY[selectedOdsId];
    const relatedPrograms = CALI_PROGRAMS.filter(p => p.ods.includes(selectedOdsId));
    const relatedProjects = STRATEGIC_PROJECTS.filter(p => p.ods.includes(selectedOdsId));
    return { info, programs: relatedPrograms, projects: relatedProjects };
  }, [selectedOdsId]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* High Impact Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 p-8 rounded-2xl shadow-xl border border-blue-400/30 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-8 opacity-20">
            <Globe size={160} className="text-white animate-pulse" />
        </div>
        <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-sm border border-white/20">
                <Target size={14} /> Agenda 2030
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Alineación ODS</h2>
            <p className="text-blue-50 font-light text-lg">
                El Plan de Desarrollo "Cali, Capital Pacífica" está articulado con los Objetivos de Desarrollo Sostenible.
                Selecciona un objetivo para ver las metas estratégicas.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 rounded text-slate-600"><Coins size={18} /></div>
                Inversión Estimada por Objetivo (Billones)
            </h3>
            <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                        layout="vertical" 
                        data={odsData} 
                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                        onClick={(data) => {
                            if (data && data.activePayload && data.activePayload[0]) {
                                setSelectedOdsId(data.activePayload[0].payload.id);
                                // Scroll to details
                                setTimeout(() => {
                                    document.getElementById('ods-details')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }
                        }}
                        className="cursor-pointer"
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={180} 
                            tick={{fontSize: 11, fill: '#475569', fontWeight: 600}} 
                            interval={0}
                        />
                        <Tooltip 
                            formatter={(value: number) => formatCurrency(value)}
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                            {odsData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    opacity={selectedOdsId === entry.id ? 1 : selectedOdsId ? 0.3 : 1}
                                    className="transition-all duration-300 hover:opacity-100"
                                    stroke={selectedOdsId === entry.id ? '#1e293b' : 'none'}
                                    strokeWidth={2}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-400 mt-2 font-medium">Haz clic en una barra para ver detalles</p>
        </div>

        {/* Top ODS Cards / Legend */}
        <div className="space-y-4">
            <h3 className="font-bold text-slate-800 px-2">Objetivos Prioritarios</h3>
            {odsData.slice(0, 5).map((ods) => (
                <button 
                    key={ods.id} 
                    onClick={() => setSelectedOdsId(ods.id)}
                    className={`w-full text-left bg-white p-4 rounded-xl shadow-sm border transition-all flex items-center gap-4 group hover:shadow-md hover:scale-[1.02]
                        ${selectedOdsId === ods.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}
                    `}
                >
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shrink-0 transition-transform group-hover:rotate-6"
                        style={{ backgroundColor: ods.color }}
                    >
                        {ods.id}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 truncate text-sm group-hover:text-blue-600 transition-colors" title={ods.name}>{ods.name}</h4>
                        <p className="text-xs text-slate-500">
                           {ods.count} Programas Vinculados
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-slate-900 text-sm">{formatCurrency(ods.value)}</p>
                    </div>
                </button>
            ))}
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
                 <h4 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-2">
                    <BookOpen size={14} className="text-slate-400" /> Nota Metodológica
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    La inversión de cada programa se distribuye equitativamente entre los ODS asociados para estimar el peso financiero.
                </p>
            </div>
        </div>
      </div>

      {/* Detailed View Section - Only visible when selected */}
      {selectedOdsId && selectedDetails && (
          <div id="ods-details" className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-500 scroll-mt-6">
              {/* Header */}
              <div 
                className="p-8 text-white flex justify-between items-start"
                style={{ backgroundColor: selectedDetails.info.color }}
              >
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-white/20 px-3 py-1 rounded-lg text-lg font-black backdrop-blur-sm shadow-sm border border-white/20">ODS {selectedOdsId}</span>
                        <h2 className="text-3xl font-bold">{selectedDetails.info.name}</h2>
                    </div>
                    <p className="text-white/95 max-w-3xl text-sm md:text-base leading-relaxed font-medium opacity-90">
                        {selectedDetails.info.description}
                    </p>
                 </div>
                 <button 
                    onClick={() => setSelectedOdsId(null)}
                    className="p-2 bg-white/10 hover:bg-white/30 rounded-full text-white transition-colors"
                 >
                    <X size={24} />
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  
                  {/* Left Column: Strategic Goals */}
                  <div className="p-6 md:p-8">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Target className="text-indigo-600" size={20} />
                          Metas del Plan de Desarrollo
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                          Objetivos estratégicos trazados en "Cali Capital Pacífica" para dar cumplimiento a este ODS:
                      </p>
                      
                      <ul className="space-y-4">
                          {selectedDetails.info.goals.map((goal, idx) => (
                              <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                  <div className="mt-0.5 min-w-[24px] h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                      {idx + 1}
                                  </div>
                                  <span className="text-slate-700 text-sm font-semibold leading-snug">{goal}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Right Column: Programs and Projects */}
                  <div className="p-6 md:p-8 bg-slate-50/50 flex flex-col gap-8">
                      
                      {/* Programs Section */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Coins className="text-emerald-600" size={20} />
                            Programas Financiadores
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Líneas de inversión del Plan Plurianual que impactan este objetivo:
                        </p>

                        <div className="space-y-3">
                            {selectedDetails.programs.map((prog) => (
                                <div key={prog.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                        prog.purpose === 'Reconciliada' ? 'bg-rose-50 text-rose-600' :
                                        prog.purpose === 'Renovada' ? 'bg-cyan-50 text-cyan-600' :
                                        'bg-indigo-50 text-indigo-600'
                                    }`}>
                                        {prog.purpose}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                                        {formatMillions(prog.totalBudget)}
                                    </span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-indigo-600 transition-colors">{prog.name}</h4>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                                        <div 
                                            className="h-full rounded-full opacity-80" 
                                            style={{ 
                                                width: '100%', 
                                                backgroundColor: selectedDetails.info.color 
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                      </div>

                      {/* Projects Section - Conditional Render */}
                      {selectedDetails.projects.length > 0 && (
                          <div className="animate-in fade-in duration-700 delay-100">
                             <div className="border-t border-slate-200 my-2"></div>
                             <h3 className="text-lg font-bold text-slate-800 mt-6 mb-4 flex items-center gap-2">
                                <Rocket className="text-orange-600" size={20} />
                                Proyectos Estratégicos Relacionados
                             </h3>
                             <div className="grid grid-cols-1 gap-3">
                                {selectedDetails.projects.map((proj, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-orange-400">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                                proj.status === 'En Ejecución' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {proj.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{proj.description}</p>
                                    </div>
                                ))}
                             </div>
                          </div>
                      )}

                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ODSAlignment;