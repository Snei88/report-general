
import React, { useState, useMemo } from 'react';
import { STRATEGIC_PROJECTS } from '../constants';
import { 
  Train, Hammer, Heart, Lightbulb, ShoppingBag, Globe, 
  Search, Filter, Calendar, Users, Info, ChevronDown, 
  ChevronUp, Target, Rocket, Box, CheckCircle2, AlertCircle, 
  Clock, ArrowUpRight, ShieldCheck, Briefcase, Zap,
  Navigation, Scale
} from 'lucide-react';

const StrategicProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const groupedProjects = useMemo(() => {
    const filtered = STRATEGIC_PROJECTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.sector.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesInstrument = selectedInstrument === 'Todos' || p.instrument === selectedInstrument;
      return matchesSearch && matchesInstrument;
    });

    const groups: Record<string, typeof STRATEGIC_PROJECTS> = {};
    filtered.forEach(p => {
      if (!groups[p.instrument]) groups[p.instrument] = [];
      groups[p.instrument].push(p);
    });
    return groups;
  }, [searchTerm, selectedInstrument]);

  const instruments = useMemo(() => 
    ['Todos', ...Array.from(new Set(STRATEGIC_PROJECTS.map(p => p.instrument)))], 
  []);

  const getIcon = (sector: string) => {
    if (sector.includes('Movilidad')) return <Train size={24} />;
    if (sector.includes('Infraestructura')) return <Hammer size={24} />;
    if (sector.includes('Ambiente')) return <Globe size={24} />;
    return <Briefcase size={24} />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En Ejecución': return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Terminado': return 'bg-[#4c1d95]/10 text-[#4c1d95] border-purple-200';
      case 'En Formulación': return 'bg-slate-50 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1600px] mx-auto">
      
      <div className="bg-[#1e1b4b] p-10 rounded-[3.5rem] shadow-xl border border-white/5 flex flex-col xl:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none">
            <Rocket size={300} className="text-white" />
        </div>
        <div className="relative z-10 text-center xl:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center xl:justify-start gap-5 uppercase italic leading-none">
             <Rocket className="text-teal-400" size={40} />
             Portafolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-white">Estratégico</span>
          </h2>
          <p className="text-slate-400 text-lg mt-3 font-medium">Unificación técnica: POT, Iniciativas SCA y Alianzas Propacífico</p>
        </div>
        
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 relative z-10 overflow-x-auto max-w-full">
            {instruments.map(inst => (
              <button
                key={inst}
                onClick={() => setSelectedInstrument(inst)}
                className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedInstrument === inst ? 'bg-teal-500 text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'
                }`}
              >
                {inst}
              </button>
            ))}
        </div>
      </div>

      <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar por nombre de proyecto o sector técnico (Ej: Movilidad)..." 
            className="w-full pl-16 pr-8 py-6 bg-white border border-slate-100 rounded-[2.5rem] focus:ring-4 focus:ring-purple-500/5 focus:outline-none text-lg text-slate-700 font-medium shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-6 top-6 text-slate-400" size={28} />
      </div>

      <div className="space-y-12">
        {(Object.entries(groupedProjects) as [string, any[]][]).map(([instrument, projects]) => (
          <div key={instrument} className="space-y-6">
            <div className="flex items-center gap-6 px-6">
              <div className="h-4 w-4 rounded-full bg-[#4c1d95] shadow-lg"></div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] italic">
                {instrument} <span className="text-slate-300 ml-3 font-light">[{projects.length}]</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl hover:border-teal-500/20 group">
                  <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-8 flex-1 w-full">
                      <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#4c1d95] group-hover:text-white group-hover:scale-110 transition-all duration-500">
                        {getIcon(project.sector)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest ${getStatusBadge(project.status)}`}>
                            {project.status}
                          </span>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{project.sector}</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase italic group-hover:text-[#4c1d95] transition-colors">{project.name}</h4>
                      </div>
                    </div>

                    <button 
                        onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                        className={`p-4 rounded-2xl transition-all shadow-sm ${expandedId === project.id ? 'bg-[#4c1d95] text-white' : 'bg-slate-50 text-slate-400 hover:bg-teal-500 hover:text-white'}`}
                    >
                        {expandedId === project.id ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </button>
                  </div>

                  {expandedId === project.id && (
                    <div className="px-10 pb-12 pt-4 border-t border-slate-50 bg-slate-50/20 animate-in slide-in-from-top-6 duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                            <div className="space-y-8">
                                <div>
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                       <Target size={16} className="text-teal-500" /> Objetivo Estratégico
                                    </h5>
                                    <p className="text-lg text-slate-700 font-medium leading-relaxed italic">{project.objective}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                       <Users size={16} className="text-purple-500" /> Responsables Técnicos
                                    </h5>
                                    <div className="flex flex-wrap gap-3">
                                        {project.responsible.map(res => (
                                          <span key={res} className="px-5 py-2 bg-white text-slate-800 rounded-xl text-xs font-black border border-slate-200 shadow-sm uppercase tracking-tighter">{res}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-inner relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5"><Info size={40} /></div>
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                       <Scale size={16} className="text-[#4c1d95]" /> Marco de Ejecución
                                    </h5>
                                    <p className="text-base text-slate-600 leading-relaxed font-medium">
                                        Integrado al instrumento <span className="text-[#4c1d95] font-black">{project.instrument}</span>, con un horizonte de ejecución de <span className="text-teal-600 font-black">{project.term} plazo</span>.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between p-8 bg-[#020617] rounded-[2.5rem] shadow-2xl">
                                    <div className="flex gap-4">
                                        {project.ods?.map(ods => (
                                          <div key={ods} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-teal-400 text-sm font-black border border-white/10 hover:bg-teal-500 hover:text-white transition-all cursor-help">{ods}</div>
                                        ))}
                                    </div>
                                    <button className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] flex items-center gap-3 hover:text-white transition-colors group">
                                       Consultar Expediente <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicProjects;
