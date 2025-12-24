import React, { useState, useMemo } from 'react';
import { MergedProject } from '../types';
import { ChevronLeft, ChevronRight, Search, Filter, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ProjectTableProps {
  data: MergedProject[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Todos');
  const [selectedState, setSelectedState] = useState('Todos');
  const itemsPerPage = 15;

  // Extract filters
  const sectors = useMemo(() => ['Todos', ...Array.from(new Set(data.map(p => p.Sector))).sort()], [data]);
  const states = useMemo(() => ['Todos', ...Array.from(new Set(data.map(p => p.EstadoProyecto))).sort()], [data]);

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(p => {
      const matchesSearch = 
        p.NombreProyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.CodigoBP.includes(searchTerm) ||
        p.EnteGestor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSector = selectedSector === 'Todos' || p.Sector === selectedSector;
      const matchesState = selectedState === 'Todos' || p.EstadoProyecto === selectedState;

      return matchesSearch && matchesSector && matchesState;
    });
  }, [data, searchTerm, selectedSector, selectedState]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData.map(p => ({
      Codigo: p.CodigoBP,
      Proyecto: p.NombreProyecto,
      Sector: p.Sector,
      Estado: p.EstadoProyecto,
      Presupuesto: p.PresupuestoAsignadoAcumulado,
      Ejecutado: p.PresupuestoEjecutado,
      AvanceFisico: p.PorcentajeAvanceFisico / 100
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Proyectos");
    XLSX.writeFile(wb, "Inversion_Cali.xlsx");
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSector, selectedState]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      {/* Controls Header */}
      <div className="p-4 border-b border-slate-100 flex flex-col xl:flex-row gap-4 justify-between bg-slate-50/50">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <input 
              type="text" 
              placeholder="Buscar por nombre, código o gestor..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative group min-w-[150px]">
               <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
               <select 
                  className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-slate-700 shadow-sm appearance-none cursor-pointer"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
               >
                  {sectors.map(s => <option key={s} value={s}>{s}</option>)}
               </select>
            </div>
            
            <div className="relative group min-w-[140px]">
               <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
               <select 
                  className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-slate-700 shadow-sm appearance-none cursor-pointer"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
               >
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
               </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Exportar Excel</span>
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-auto flex-1 relative">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Código</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 w-1/3">Proyecto</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Sector / Gestor</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Presupuesto</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Avance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((project) => (
                <tr key={project.CodigoBP + project.Periodo} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500 font-mono">
                    {project.CodigoBP}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2" title={project.NombreProyecto}>
                      {project.NombreProyecto}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                     <p className="text-xs font-semibold text-slate-700">{project.Sector}</p>
                     <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[150px]" title={project.EnteGestor}>{project.EnteGestor}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-4 font-bold rounded-full border 
                      ${project.EstadoProyecto === 'En ejecución' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        project.EstadoProyecto === 'Terminado' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        project.EstadoProyecto === 'Aprobado' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {project.EstadoProyecto}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-700">
                    {formatCurrency(project.PresupuestoAsignadoAcumulado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                     <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2 w-full max-w-[100px]">
                           <span className="text-xs font-bold text-slate-700 w-8 text-right">{project.PorcentajeAvanceFisico}%</span>
                           <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                 className={`h-full rounded-full ${project.PorcentajeAvanceFisico >= 80 ? 'bg-emerald-500' : project.PorcentajeAvanceFisico >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                                 style={{ width: `${Math.min(project.PorcentajeAvanceFisico, 100)}%` }}
                              ></div>
                           </div>
                        </div>
                        <span className="text-[10px] text-slate-400">Físico</span>
                     </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No se encontraron proyectos con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
        <span className="text-sm text-slate-500 hidden sm:inline">
          Mostrando <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> de <span className="font-medium text-slate-900">{filteredData.length}</span>
        </span>
        
        {/* Mobile simple count */}
        <span className="text-sm text-slate-500 sm:hidden">
           {currentPage} / {totalPages}
        </span>

        <div className="flex gap-1">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="hidden sm:flex items-center px-2">
             <span className="text-sm font-medium text-slate-600">Página {currentPage} de {totalPages}</span>
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;