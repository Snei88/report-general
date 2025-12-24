
import React, { useState } from 'react';
import { ExternalLink, Landmark, LayoutGrid, PieChart as PieIcon, TrendingUp, BarChart2 } from 'lucide-react';

/**
 * CONFIGURACIÓN DE VÍNCULOS OFICIALES - HACIENDA CALI
 */
const HACIENDA_PORTAL_LINK = "https://www.cali.gov.co/hacienda/publicaciones/153664/observatorio-fiscal/";
const INCOME_URL = "https://www.cali.gov.co/observatorios/publicaciones/179894/ejecucion-presupuestal-del-ingreso/";
const EXPENSE_URL = "https://www.cali.gov.co/observatorios/publicaciones/175320/ejecucion-presupuestal-del-gasto/";
const INDICADORES_URL = "https://www.cali.gov.co/observatorios/publicaciones/166380/tablero-de-control-observatorio-de-hacienda-publica-distrital/";

const HaciendaObservatory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portal_maestro' | 'income_portal' | 'expense_portal' | 'dashboard'>('portal_maestro');

  const renderPortal = (url: string, title: string, colorClass: string) => (
    <div className="flex-1 bg-slate-100 relative min-h-[600px] flex flex-col animate-in fade-in duration-500">
        <div className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest border-b flex items-center gap-3 ${colorClass}`}>
            <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
            <span>Fuente Oficial: <strong>Hacienda Cali - {title}</strong></span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2 hover:underline">
              Abrir portal externo <ExternalLink size={14} />
            </a>
        </div>
        <iframe 
          src={url}
          title={title}
          className="w-full h-full border-0 bg-white flex-1"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
    </div>
  );

  return (
    <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[850px] animate-in slide-in-from-bottom-6 duration-700">
      
      {/* Header del Observatorio */}
      <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row justify-between gap-6 items-center">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-[#1e1b4b] text-white rounded-2xl shadow-xl shadow-indigo-100">
            <Landmark size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Observatorio Fiscal</h3>
            <p className="text-slate-500 text-sm font-medium italic">Portal de Transparencia y Seguimiento Presupuestal.</p>
          </div>
        </div>
        
        {/* Selector de Portales */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl shadow-inner border border-slate-200">
           {[
             { id: 'portal_maestro', label: 'Portal Hacienda', color: 'text-indigo-600', icon: Landmark },
             { id: 'income_portal', label: 'Ingresos', color: 'text-emerald-600', icon: TrendingUp },
             { id: 'expense_portal', label: 'Gastos', color: 'text-orange-600', icon: PieIcon },
             { id: 'dashboard', label: 'Indicadores', color: 'text-blue-600', icon: BarChart2 }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
                 activeTab === tab.id 
                   ? `bg-white ${tab.color} shadow-lg` 
                   : 'text-slate-500 hover:text-slate-900'
               }`}
             >
               <tab.icon size={14} />
               {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* Área de Visualización */}
      <div className="flex-1 bg-slate-50 overflow-hidden flex flex-col">
        {activeTab === 'portal_maestro' && renderPortal(HACIENDA_PORTAL_LINK, "Observatorio Maestro", "bg-indigo-50 text-indigo-900 border-indigo-100")}
        {activeTab === 'income_portal' && renderPortal(INCOME_URL, "Ejecución de Ingresos", "bg-emerald-50 text-emerald-900 border-emerald-100")}
        {activeTab === 'expense_portal' && renderPortal(EXPENSE_URL, "Ejecución de Gastos", "bg-orange-50 text-orange-900 border-orange-100")}
        {activeTab === 'dashboard' && renderPortal(INDICADORES_URL, "Tablero de Indicadores", "bg-blue-50 text-blue-900 border-blue-100")}
      </div>
    </div>
  );
};

export default HaciendaObservatory;
