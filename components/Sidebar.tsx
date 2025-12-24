
import React from 'react';
import { 
  LayoutDashboard, Rocket, Map, Landmark, PieChart, 
  LayoutTemplate, Scale, FileText, ShieldCheck,
  MapPin, Globe, CreditCard, Activity, Receipt
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const menuItems = [
    // 1. BLOQUE ESTRATÉGICO
    { id: 'proyectos_pot', label: 'CALI 500+', icon: MapPin, category: 'Estratégicos' },
    { id: 'dashboard', label: 'Cali Capital Pacífica', icon: LayoutDashboard, category: 'Estratégicos' },
    { id: 'proyectos', label: 'Proyectos Estratégicos', icon: Rocket, category: 'Estratégicos' },
    { id: 'poai_2026', label: 'Presupuesto 2026', icon: FileText, category: 'Estratégicos' },
    { id: 'idf_analysis', label: 'Desempeño Fiscal (IDF)', icon: Scale, category: 'Estratégicos' },

    // 2. BLOQUE FINANCIERO
    { id: 'financial_plan', label: 'Plan Financiero MFMP', icon: PieChart, category: 'Financieros' },
    { id: 'recursos_credito', label: 'Recursos del Crédito', icon: CreditCard, category: 'Financieros' },
    { id: 'servicio_deuda', label: 'Servicio de la Deuda', icon: Receipt, category: 'Financieros' },
    { id: 'ley_617', label: 'Indicador Ley 617', icon: Activity, category: 'Financieros' },
    { id: 'riesgo', label: 'Riesgo Crediticio', icon: ShieldCheck, category: 'Financieros' },

    // 3. BLOQUE SEGUIMIENTO Y HERRAMIENTAS
    { id: 'tableros_control', label: 'Tableros de Control', icon: LayoutTemplate, category: 'Tableros de Seguimiento' },
    { id: 'hacienda', label: 'Observatorio Hacienda', icon: Landmark, category: 'Tableros de Seguimiento' },
    { id: 'pa_que_veas', label: "Mapa de Inversión", icon: Map, category: 'Tableros de Seguimiento' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      <div className={`
        fixed top-0 left-0 h-full w-72 bg-[#020617] text-slate-400 z-50 transform transition-transform duration-500 ease-in-out lg:translate-x-0 flex flex-col no-print border-r border-white/5
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-8 bg-slate-950/50 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4c1d95] to-[#0d9488] rounded-xl flex items-center justify-center shadow-lg text-white">
              <Globe size={22} strokeWidth={3} />
            </div>
            <h1 className="text-white font-black text-lg tracking-widest uppercase italic">Cali<span className="text-teal-500 ml-1">500+</span></h1>
          </div>
        </div>

        <nav className="flex-1 py-8 px-6 space-y-1.5 overflow-y-auto custom-sidebar-scroll">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const showCategory = index === 0 || menuItems[index - 1].category !== item.category;

            return (
              <React.Fragment key={item.id}>
                {showCategory && (
                  <div className="px-3 pt-8 pb-3 first:pt-0">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.25em]">{item.category}</p>
                  </div>
                )}
                <button
                  onClick={() => { setView(item.id); setIsOpen(false); }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-black transition-all duration-300 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#4c1d95]/30 to-[#0d9488]/10 text-white border border-purple-500/20 shadow-lg' 
                      : 'hover:text-white hover:bg-white/5'}
                  `}
                >
                  <Icon size={18} className={`${isActive ? 'text-teal-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  <span className="flex-1 text-left uppercase tracking-[0.1em] text-[11px]">{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_10px_#2dd4bf]" />}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        <div className="p-8 bg-slate-950 border-t border-white/5">
          <div className="flex items-center gap-5 bg-white/5 p-4 rounded-3xl border border-white/5 group hover:border-purple-500/30 transition-all duration-500">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#4c1d95] to-[#1e1b4b] flex items-center justify-center border border-white/10 shrink-0 text-xs font-black text-white shadow-xl italic">SC</div>
            <div className="overflow-hidden">
               <p className="text-[10px] font-black text-white truncate uppercase tracking-widest">Santiago de Cali</p>
               <p className="text-[9px] text-slate-600 truncate font-bold uppercase tracking-widest italic">Visión Cali 500+</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
