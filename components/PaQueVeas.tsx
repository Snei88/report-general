import React from 'react';
import { ExternalLink, Map, Info, BarChart2, ChevronRight } from 'lucide-react';

const PaQueVeas: React.FC = () => {
  const dashboardUrl = "https://paqueveas.cali.gov.co/Home";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-[calc(100vh-12rem)] flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Map className="text-emerald-600" size={24} />
              Pa' que veas - Resultados de Inversión
            </h3>
            <p className="text-slate-600 mt-1 text-sm max-w-2xl">
              Plataforma de visualización georreferenciada de la inversión pública de Santiago de Cali.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-slate-100 relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="bg-emerald-50 px-6 py-3 text-sm text-emerald-800 border-b border-emerald-100 flex items-center gap-2">
              <Info size={16} />
              <span>Fuente Oficial: <strong>Pa' que veas</strong>. Visualización de resultados en mapa.</span>
              <a href={dashboardUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 font-semibold hover:underline">
                Abrir sitio oficial <ExternalLink size={14} />
              </a>
          </div>
          
          <div className="flex-1 relative bg-white">
            <iframe 
              src={dashboardUrl}
              title="Pa' que veas Dashboard"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
            
            {/* Overlay for better UX if iframe has issues or for quick access */}
            <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-8 bg-gradient-to-t from-black/10 to-transparent">
               <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-emerald-100 pointer-events-auto flex items-center gap-4 max-w-2xl mx-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hidden sm:block">
                    <BarChart2 size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      Explora el mapa interactivo oficial
                    </p>
                    <p className="text-xs text-slate-500">
                      Si la visualización no carga correctamente, abre el portal en una nueva ventana.
                    </p>
                  </div>
                  <a 
                    href={dashboardUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                  >
                    Abrir Portal <ChevronRight size={16} />
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaQueVeas;