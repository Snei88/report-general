
export interface CaliProgram {
  id: string;
  name: string;
  purpose: 'Reconciliada' | 'Renovada' | 'Buen Gobierno';
  budget2024: number;
  budget2025: number;
  budget2026: number;
  budget2027: number;
  totalBudget: number;
  ods: number[]; // Related Sustainable Development Goals
}

export interface StrategicProject {
  id: string;
  name: string;
  description: string;
  status: 'En Formulación' | 'En Ejecución' | 'Terminado' | 'Planificado';
  sector: string;
  instrument: string; // POT 2014, PROPACI, etc.
  objective: string;
  term: 'Corto' | 'Medio' | 'Largo';
  responsible: string[];
  observations?: string;
  ods: number[];
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ProjectDetails {
  CodigoBP: string;
  NombreProyecto: string;
  EstadoProyecto: string;
  Sector: string;
  EnteGestor: string;
  ObjetivoGeneral: string;
  PresupuestoAsignado2024: number;
}

export interface ExecutionMetrics {
  CodigoBP: string;
  PresupuestoAsignadoAcumulado: number;
  PresupuestoObligado: number;
  PresupuestoEjecutado: number;
  PorcentajeEjecucion: number;
  AvanceFinanciero: number;
  PorcentajeAvanceFisico: number;
  Periodo: string;
}

export type MergedProject = ProjectDetails & ExecutionMetrics;
