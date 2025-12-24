import React from 'react';
import { ExternalLink, Info, BarChart2, ChevronRight, MonitorCheck } from 'lucide-react';

const UAVDashboard: React.FC = () => {
  const dashboardUrl = "https://www.uav.org.co/tablero-plan-de-desarrollo";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-[calc(100vh-12rem)] flex flex-col animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <MonitorCheck className="text-purple-600" size={24} />
              Tablero Ciudadano UAV
            </h3>
            <p className="text-slate-600 mt-1 text-sm max-w-2xl">
              Seguimiento independiente al Plan de Desarrollo realizado por la <strong>Unidad de Acción Vallecaucana</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-slate-100 relative flex flex-col">
        <div className="bg-purple-50 px-6 py-3 text-sm text-purple-900 border-b border-purple-100 flex items-center gap-2">
            <Info size={16} />
            <span>Fuente Externa: <strong>Unidad de Acción Vallecaucana (UAV)</strong>. Control Social.</span>
            <a href={dashboardUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 font-semibold hover:underline">
              Abrir sitio oficial <ExternalLink size={14} />
            </a>
        </div>
        
        <div className="flex-1 relative bg-white">
          <iframe 
            src={dashboardUrl}
            title="Tablero UAV Plan de Desarrollo"
            className="w-full h-full border-0"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          
          {/* Fallback Overlay for External Sites that might block embedding or look better full screen */}
          <div className="absolute bottom-6 right-6 pointer-events-none">
             <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-purple-100 pointer-events-auto flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg hidden sm:block">
                  <BarChart2 size={20} />
                </div>
                <div className="flex-col hidden sm:flex">
                  <p className="text-xs font-medium text-slate-800">
                    Visualización Externa
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Recomendado abrir en nueva pestaña
                  </p>
                </div>
                <a 
                  href={dashboardUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                  Abrir UAV <ChevronRight size={14} />
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UAVDashboard;
