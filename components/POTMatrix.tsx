
import React, { useState } from 'react';
import { STRATEGIC_PROJECTS } from '../constants';
import { 
  Navigation, Train, Hammer, ChevronDown, ChevronUp, Map, Rocket, Box,
  ArrowUpRight, Anchor, Trees, Building2, LayoutGrid, Layers, 
  MapPin, CheckCircle2, Globe, Zap, Users, Heart, TrendingUp, Sparkles,
  ShieldCheck, Leaf, ChevronRight, Info, Target, Eye, BookOpen, Scale
} from 'lucide-react';

const POTMatrix: React.FC = () => {
  const [activeAxis, setActiveAxis] = useState<string>('territorio');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'framework' | 'transformations'>('framework');

  const axes = [
    { 
      id: 'territorio', 
      name: 'Territorio Inteligente y Adaptativo', 
      icon: Globe, 
      color: 'text-lime-600 bg-lime-50',
      description: 'Gestión de biodiversidad y desarrollo urbano sostenible.',
      apuesta: 'Reconoce la biodiversidad como base del desarrollo urbano y rural. Este eje integra los ecosistemas con los saberes comunitarios para promover hábitats que protegen la vida e impulsa una infraestructura sostenible en vivienda, movilidad y espacio público.',
      proyectosClave: [
        'Gestionar integralmente la biodiversidad como base del desarrollo urbano.',
        'Desarrollar infraestructura sostenible que respete los ecosistemas.',
        'Fortalecer la innovación institucional para la toma de decisiones.',
        'Integrar saberes comunitarios en el desarrollo rural.'
      ],
      transformations: [
        { id: '01', text: 'Gestión integral de la biodiversidad urbana.', color: 'border-l-lime-500' },
        { id: '02', text: 'Hábitats para la conservación de especies.', color: 'border-l-orange-500' },
        { id: '03', text: 'Infraestructura resiliente basada en la naturaleza.', color: 'border-l-rose-500' },
        { id: '04', text: 'Tecnología para la planificación territorial.', color: 'border-l-purple-600' },
      ]
    },
    { 
      id: 'bienestar', 
      name: 'Bienestar basado en la Interculturalidad', 
      icon: Heart, 
      color: 'text-rose-600 bg-rose-50',
      description: 'Acceso a aire limpio, agua y soberanía alimentaria.',
      apuesta: 'Busca garantizar condiciones de vida dignas y equitativas para todos los habitantes, enfocándose en la salud pública, el acceso a servicios vitales y el reconocimiento de la diversidad cultural.',
      proyectosClave: [
        'Garantizar el acceso equitativo al agua potable.',
        'Potenciar el bienestar físico a través de la biodiversidad.',
        'Impulsar la cultura ciudadana y la convivencia pacífica.',
        'Soberanía alimentaria basada en saberes locales.'
      ],
      transformations: [
        { id: '01', text: 'Equidad en el acceso a servicios vitales.', color: 'border-l-rose-500' },
        { id: '02', text: 'Soberanía y seguridad alimentaria local.', color: 'border-l-orange-500' },
        { id: '03', text: 'Educación para la sostenibilidad.', color: 'border-l-emerald-500' },
        { id: '04', text: 'Valoración de la diversidad cultural.', color: 'border-l-indigo-600' },
      ]
    },
    { 
      id: 'competitividad', 
      name: 'Competitividad Sostenible', 
      icon: TrendingUp, 
      color: 'text-teal-600 bg-teal-50',
      description: 'Crecimiento económico con cuidado del entorno natural.',
      apuesta: 'Impulsa la transición hacia una economía que valora y se beneficia de la sostenibilidad, promoviendo el bio-comercio y el talento humano para la innovación.',
      proyectosClave: [
        'Integrar el crecimiento económico con el cuidado ambiental.',
        'Impulsar nuevas formas de hacer empresa sostenible.',
        'Educación técnica y talento para la sostenibilidad.',
        'Internacionalización de la oferta bio-económica.'
      ],
      transformations: [
        { id: '01', text: 'Economía circular y bio-comercio.', color: 'border-l-teal-500' },
        { id: '02', text: 'Innovación y aceleración empresarial verde.', color: 'border-l-amber-500' },
        { id: '03', text: 'Talento humano para la sostenibilidad.', color: 'border-l-rose-500' },
        { id: '04', text: 'Crecimiento económico bajo en carbono.', color: 'border-l-purple-600' },
      ]
    }
  ];

  const currentAxis = axes.find(a => a.id === activeAxis) || axes[0];

  const getProjectsByAxis = (axisId: string) => {
    if (axisId === 'territorio') return STRATEGIC_PROJECTS.filter(p => p.sector.includes('Movilidad') || p.sector.includes('Ambiente'));
    if (axisId === 'bienestar') return STRATEGIC_PROJECTS.filter(p => p.sector.includes('Social') || p.sector.includes('Salud'));
    return STRATEGIC_PROJECTS.filter(p => p.sector.includes('Renovación') || p.sector.includes('Cultura'));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
      
      {/* Banner Principal - Tono Ejecutivo */}
      <div className="relative bg-[#020617] rounded-[4rem] p-12 md:p-16 overflow-hidden text-white shadow-2xl border border-white/5">
        <div className="absolute -right-20 -top-20 opacity-10 blur-3xl w-96 h-96 bg-teal-500 rounded-full"></div>
        <div className="absolute right-0 top-0 p-16 opacity-5 pointer-events-none">
            <ShieldCheck size={400} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
            <div className="max-w-3xl text-center xl:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 text-teal-400 border border-white/20 text-xs font-black uppercase tracking-[0.4em] mb-8">
                    <Sparkles size={18} /> Inversión Cali 500+
                </div>
                <p className="text-2xl md:text-3xl font-black text-white/60 uppercase tracking-[0.2em] mb-2 italic">
                  Santiago de Cali
                </p>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic">
                    Referente <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Global 2050</span>
                </h1>
                
                {/* Switcher de Vista - Nombres solicitados */}
                <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10 w-fit mx-auto xl:mx-0">
                    <button 
                      onClick={() => setViewMode('framework')} 
                      className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${viewMode === 'framework' ? 'bg-teal-50 text-[#020617] shadow-2xl' : 'text-slate-400 hover:text-white'}`}
                    >
                      <Eye size={16} /> CALI 500 Ejes transformaciones
                    </button>
                    <button 
                      onClick={() => setViewMode('transformations')} 
                      className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${viewMode === 'transformations' ? 'bg-teal-50 text-[#020617] shadow-2xl' : 'text-slate-400 hover:text-white'}`}
                    >
                      <Layers size={16} /> Transformaciones Técnicas
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 w-full xl:w-auto">
                {axes.map(axis => (
                  <button
                    key={axis.id}
                    onClick={() => setActiveAxis(axis.id)}
                    className={`flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all duration-500 text-left group ${
                      activeAxis === axis.id 
                        ? 'bg-white border-teal-500 shadow-2xl scale-105' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12 ${
                      activeAxis === axis.id ? 'bg-[#1e1b4b] text-teal-400' : 'bg-white/10 text-slate-400'
                    }`}>
                      <axis.icon size={28} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-black uppercase tracking-widest italic leading-tight ${activeAxis === axis.id ? 'text-slate-900' : 'text-slate-300'}`}>
                        {axis.name}
                      </h4>
                    </div>
                    {activeAxis === axis.id && <ChevronRight size={24} className="ml-auto text-teal-500" />}
                  </button>
                ))}
            </div>
        </div>
      </div>

      {viewMode === 'framework' ? (
        /* VISTA: CALI 500 Ejes transformaciones */
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden group border-l-[16px] border-l-[#4c1d95]">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-teal-500 group-hover:scale-110 transition-transform duration-1000"><Target size={300} /></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-24 h-24 bg-[#1e1b4b] text-teal-400 rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl">
                      <Target size={48} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 italic">Objetivo de la Visión</h3>
                    <p className="text-3xl md:text-4xl text-slate-800 font-bold leading-tight tracking-tighter italic">
                      En el año 2050, Cali será un <span className="text-[#4c1d95] underline decoration-teal-400 decoration-4 underline-offset-8">referente internacional en sostenibilidad</span>, a partir del cuidado de la biodiversidad y la interculturalidad.
                    </p>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-[#1e1b4b] p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-5"><BookOpen size={200} /></div>
                  <h3 className="text-xl font-black text-teal-400 uppercase tracking-widest mb-10 flex items-center gap-4 italic">
                    <Zap size={24} /> Apuesta Estratégica
                  </h3>
                  <p className="text-2xl font-light leading-relaxed italic text-slate-300">
                    {currentAxis.apuesta}
                  </p>
              </div>

              <div className="space-y-6">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] px-6 mb-6 italic flex items-center gap-3">
                    <Rocket size={18} className="text-rose-500" /> Líneas de Acción Priorizadas
                  </h3>
                  {currentAxis.proyectosClave.map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-8 items-start group hover:border-teal-500 transition-all duration-500">
                       <span className="text-3xl font-black text-slate-200 group-hover:text-teal-500 transition-colors italic leading-none">{idx + 1}</span>
                       <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
                         {item}
                       </p>
                    </div>
                  ))}
              </div>
          </div>
        </div>
      ) : (
        /* VISTA DE TRANSFORMACIONES TÉCNICAS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-6 duration-700">
          <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-5 px-4">
                  <div className={`p-3 rounded-2xl ${currentAxis.color}`}><currentAxis.icon size={24} /></div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Transformaciones</h3>
              </div>

              <div className="space-y-6">
                  {currentAxis.transformations.map((trans) => (
                      <div 
                        key={trans.id} 
                        className={`relative bg-white p-8 rounded-[2.5rem] border-l-[12px] shadow-sm hover:shadow-xl transition-all duration-500 group border-slate-100 ${trans.color}`}
                      >
                          <div className="flex gap-8 items-start">
                              <span className="text-4xl font-black text-slate-200 group-hover:text-teal-500 transition-colors italic leading-none">{trans.id}</span>
                              <p className="text-xl text-slate-700 font-medium leading-relaxed italic">
                                  {trans.text}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-[#1e1b4b] p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden flex-1">
                  <div className="absolute -right-10 -bottom-10 opacity-5"><Rocket size={200} /></div>
                  
                  <h3 className="text-2xl font-black mb-8 uppercase italic tracking-widest text-teal-400 border-b border-white/10 pb-6 flex items-center gap-4">
                      <Rocket size={28} /> Portafolio de Inversión
                  </h3>

                  <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-sidebar-scroll">
                      {getProjectsByAxis(activeAxis).map(project => (
                          <div 
                            key={project.id}
                            onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                            className={`p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer group ${
                              expandedProjectId === project.id 
                                ? 'bg-white text-slate-900 border-teal-500 shadow-xl' 
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                              <div className="flex justify-between items-center">
                                  <div>
                                      <h4 className={`text-xs font-black uppercase tracking-widest mb-1 ${expandedProjectId === project.id ? 'text-slate-900' : 'text-white'}`}>
                                          {project.name}
                                      </h4>
                                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                          expandedProjectId === project.id ? 'bg-teal-50 text-teal-700' : 'bg-white/10 text-slate-400'
                                      }`}>
                                          {project.status}
                                      </span>
                                  </div>
                                  <div className={expandedProjectId === project.id ? 'text-teal-500' : 'text-slate-600'}>
                                      {expandedProjectId === project.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                  </div>
                              </div>

                              {expandedProjectId === project.id && (
                                  <div className="mt-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                                      <p className="text-sm text-slate-600 font-medium italic mb-6 leading-relaxed">
                                          {project.description}
                                      </p>
                                      <div className="flex justify-between items-center">
                                          <div className="flex gap-2">
                                              {project.ods.map(odsId => (
                                                  <div key={odsId} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200">{odsId}</div>
                                              ))}
                                          </div>
                                          <button className="text-xs font-black uppercase text-[#4c1d95] flex items-center gap-2 hover:underline">
                                              Detalle <ArrowUpRight size={14} />
                                          </button>
                                      </div>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>

                  <div className="mt-10 p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <div className="flex items-center gap-4 text-slate-400 mb-2">
                          <Info size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest italic">Consolidado Estratégico</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                          Los proyectos listados corresponden a la planificación priorizada del Distrito en el marco de la Visión 2050.
                      </p>
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POTMatrix;
