
import React, { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import StrategicProjects from './components/StrategicProjects';
import HaciendaObservatory from './components/HaciendaObservatory';
import PaQueVeas from './components/PaQueVeas';
import FinancialPlan from './components/FinancialPlan';
import TablerosControl from './components/TablerosControl';
import IDFAnalysis from './components/IDFAnalysis';
import POAI2026 from './components/Presupuesto2026';
import CreditResources from './components/CreditResources';
import RiskRating from './components/RiskRating';
import POTMatrix from './components/POTMatrix';
import Ley617Analysis from './components/Ley617Analysis';
import DebtServiceAnalysis from './components/DebtServiceAnalysis';
import Sidebar from './components/Sidebar';
import GeminiChat from './components/GeminiChat';
import { CALI_PROGRAMS } from './constants';
import { Menu, FileDown, Search, Bell, DownloadCloud, ChevronRight, Globe } from 'lucide-react';
import { printToPDF, exportToHTML } from './utils/exportUtils';

type ViewType = 'dashboard' | 'proyectos' | 'proyectos_pot' | 'pa_que_veas' | 'hacienda' | 'financial_plan' | 'tableros_control' | 'idf_analysis' | 'poai_2026' | 'recursos_credito' | 'riesgo' | 'ley_617' | 'servicio_deuda' | 'chat';

function App() {
  const [view, setView] = useState<ViewType>(() => {
    const savedView = localStorage.getItem('cali_dashboard_last_view');
    return (savedView as ViewType) || 'dashboard';
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('cali_dashboard_last_view', view);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view]);

  const viewLabels: Record<ViewType, string> = {
    dashboard: 'Plan Desarrollo 2024-2027',
    proyectos: 'Proyectos Estratégicos',
    proyectos_pot: 'CALI 500+',
    pa_que_veas: 'Mapa de Inversión',
    hacienda: 'Observatorio Hacienda',
    financial_plan: 'Plan Financiero (MFMP)',
    tableros_control: 'Tableros de Seguimiento',
    idf_analysis: 'Índice Desempeño Fiscal',
    poai_2026: 'Presupuesto 2026',
    recursos_credito: 'Recursos del Crédito',
    riesgo: 'Calificación de Riesgo',
    ley_617: 'Indicador Ley 617',
    servicio_deuda: 'Servicio de la Deuda',
    chat: 'Consultoría IA'
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex overflow-hidden">
      <Sidebar 
        currentView={view} 
        setView={setView as any} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 h-full">
        
        {/* Header Fijo con Botón de Descarga Prominente */}
        <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 no-print border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-3 text-slate-500 hover:bg-slate-100 rounded-2xl lg:hidden border border-slate-200 transition-all"
            >
              <Menu size={22} />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <Globe size={16} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dashboard Cali</span>
              </div>
              <ChevronRight size={16} className="text-slate-300 hidden sm:block" />
              <h2 className="text-base font-black text-slate-900 tracking-tight uppercase italic">{viewLabels[view]}</h2>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Botón de Exportación HTML Maestro */}
            <button 
              onClick={() => exportToHTML(viewLabels[view])} 
              className="hidden md:flex items-center gap-3 px-6 py-3 bg-[#020617] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl hover:shadow-indigo-100/50 group border border-white/10"
            >
              <DownloadCloud size={16} className="text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Descargar Reporte Completo (HTML)</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => printToPDF()} 
                title="Imprimir Vista Actual"
                className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-all"
              >
                <FileDown size={18} />
              </button>
            </div>
            
            <button className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all shadow-sm">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Contenedor de Scroll Principal */}
        <main 
          ref={mainContentRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth bg-slate-50/50 p-4 md:p-6 lg:p-10"
        >
          <div className="max-w-[1600px] mx-auto px-2 sm:px-4">
            <div key={view} className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
              {view === 'proyectos_pot' && <POTMatrix />}
              {view === 'dashboard' && <Dashboard data={CALI_PROGRAMS} />}
              {view === 'financial_plan' && <FinancialPlan />}
              {view === 'proyectos' && <StrategicProjects />}
              {view === 'recursos_credito' && <CreditResources />}
              {view === 'poai_2026' && <POAI2026 />}
              {view === 'idf_analysis' && <IDFAnalysis />}
              {view === 'ley_617' && <Ley617Analysis />}
              {view === 'servicio_deuda' && <DebtServiceAnalysis />}
              {view === 'tableros_control' && <TablerosControl />}
              {view === 'riesgo' && <RiskRating />}
              {view === 'hacienda' && <HaciendaObservatory />}
              {view === 'pa_que_veas' && <PaQueVeas />}
              {view === 'chat' && <GeminiChat />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
