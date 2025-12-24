
import React, { useState } from 'react';
import { ExternalLink, LayoutTemplate, Info, ChevronRight, MonitorCheck, Building2, BarChart } from 'lucide-react';

const TablerosControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'central' | 'uav'>('central');

  // Configuration for Central Dashboard (Looker Studio)
  const centralConfig = {
    reportUrl: "https://lookerstudio.google.com/reporting/de793d76-56a0-4406-9a28-2bdf0ab93bc1/page/p_a16xjdjmnd?s=mqiDJiLnkaw",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/de793d76-56a0-4406-9a28-2bdf0ab93bc1/page/p_a16xjdjmnd",
    sourceName: "Departamento Administrativo de Planeación",
    colorTheme: "indigo"
  };

  // Configuration for UAV Dashboard
  const uavConfig = {
    reportUrl: "https://www.uav.org.co/tablero-plan-de-desarrollo",
    embedUrl: "https://www.uav.org.co/tablero-plan-de-desarrollo",
    sourceName: "Unidad de Acción Vallecaucana (UAV) - Control Social",
    colorTheme: "purple"
  };

  const currentConfig = activeTab === 'central' ? centralConfig : uavConfig;
  const isCentral = activeTab === 'central';

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[750px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* High Contrast Header */}
      <div className="p-8 border-b border-slate-200 bg-slate-50/50 flex flex-col xl:flex-row justify-between gap-6 items-start xl:items-center">
        <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-200">
                <LayoutTemplate size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">
                Tableros de Seguimiento
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                Monitoreo institucional y social de la inversión pública.
              </p>
            </div>
        </div>

        {/* Improved Navigation Tabs */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl shadow-inner border border-slate-200">
           <button
             onClick={() => setActiveTab('central')}
             className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-3 ${
               activeTab === 'central' 
                 ? 'bg-white text-indigo-700 shadow-lg' 
                 : 'text-slate-500 hover:text-slate-800'
             }`}
           >
             <Building2 size={16} className={activeTab === 'central' ? 'text-indigo-500' : 'text-slate-400'} />
             <span>Alcaldía Central</span>
           </button>
           <button
             onClick={() => setActiveTab('uav')}
             className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-3 ${
               activeTab === 'uav' 
                 ? 'bg-white text-purple-700 shadow-lg' 
                 : 'text-slate-500 hover:text-slate-800'
             }`}
           >
             <MonitorCheck size={16} className={activeTab === 'uav' ? 'text-purple-500' : 'text-slate-400'} />
             <span>Control UAV</span>
           </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-slate-100 relative flex flex-col">
        {/* Context Bar */}
        <div className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border-b flex items-center gap-3 transition-colors duration-300 shadow-sm z-10
            ${isCentral ? 'bg-indigo-50 text-indigo-900 border-indigo-100' : 'bg-purple-50 text-purple-900 border-purple-100'}
        `}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isCentral ? 'bg-indigo-600' : 'bg-purple-600'}`}></div>
            <span>Fuente: <strong className="font-black text-slate-900">{currentConfig.sourceName}</strong></span>
            <a href={currentConfig.reportUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 hover:underline opacity-80 hover:opacity-100 transition-opacity">
              Pantalla Completa <ExternalLink size={14} />
            </a>
        </div>
        
        {/* Iframe Container */}
        <div className="flex-1 relative bg-white">
          <iframe 
            key={activeTab} // Force re-render on tab change
            src={currentConfig.embedUrl}
            title={`Tablero de Seguimiento - ${activeTab}`}
            className="w-full h-full border-0"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          />
          
          {/* Styled Overlay */}
          <div className="absolute bottom-8 right-8 pointer-events-none">
             <div className={`backdrop-blur-xl p-5 rounded-3xl shadow-2xl border pointer-events-auto flex items-center gap-5 bg-white/95 transition-all hover:scale-105 duration-300
                 ${isCentral ? 'border-indigo-100' : 'border-purple-100'}
             `}>
                <div className={`p-4 rounded-2xl hidden sm:block shadow-inner ${isCentral ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'}`}>
                  <BarChart size={24} />
                </div>
                <div className="flex-col hidden sm:flex">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tighter italic">
                    Visualización Externa
                  </p>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-0.5">
                     Cloud Looker Platform
                  </p>
                </div>
                <a 
                  href={currentConfig.reportUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl
                      ${isCentral ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'}
                  `}
                >
                  Abrir Original <ChevronRight size={14} />
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablerosControl;
