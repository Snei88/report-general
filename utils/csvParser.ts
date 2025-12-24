import { ProjectDetails, ExecutionMetrics, MergedProject } from '../types';

// Helper to clean CSV values (remove quotes, handle commas in numbers)
const cleanValue = (val: string) => val ? val.replace(/^"|"$/g, '').trim() : '';
const parseNumber = (val: string) => parseFloat(cleanValue(val).replace(/,/g, '')) || 0;

export const parseProjectDetails = (csv: string): ProjectDetails[] => {
  const lines = csv.split('\n').filter(l => l.trim() !== '');
  const headers = lines[0].split('","').map(h => cleanValue(h));
  
  // Identifying indices
  const idxCode = headers.indexOf('CodigoBP');
  const idxName = headers.indexOf('NombreProyecto');
  const idxState = headers.indexOf('EstadoProyecto');
  const idxSector = headers.indexOf('NombreSector');
  const idxGestor = headers.indexOf('EnteGestor');
  const idxObj = headers.indexOf('ObjetivoGeneral');
  const idxBudg = headers.indexOf('PresupuestoAsignadoAcumulaldoDesde2024'); // Sic from data

  return lines.slice(1).map(line => {
    // Regex to split by comma ignoring quotes
    const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    // Fallback simple split if regex fails on complex lines, though the regex is safer
    const safeCols = cols.map(c => c.replace(/^"|",$/g, '').replace(/"$/g,'')); // Cleanup

    // Since the provided data is quite consistent with quotes, we can use a simpler split if needed, 
    // but let's do a robust manual parse for the provided format
    const splitByCommaIgnoringQuotes = (str: string) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result.map(cleanValue);
    };

    const values = splitByCommaIgnoringQuotes(line);

    return {
      CodigoBP: values[0] || '', // Assuming first column based on header
      NombreProyecto: values[5] || 'Sin Nombre', // Index based on header position in raw file
      EstadoProyecto: values[2] || 'Desconocido',
      Sector: values[8] || 'General',
      EnteGestor: values[10] || 'N/A',
      ObjetivoGeneral: values[12] || '',
      PresupuestoAsignado2024: parseFloat(values[6]) || 0
    };
  });
};

export const parseExecutionMetrics = (csv: string): ExecutionMetrics[] => {
  const lines = csv.split('\n').filter(l => l.trim() !== '');
  
  return lines.slice(1).map(line => {
    const splitByCommaIgnoringQuotes = (str: string) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result.map(cleanValue);
    };

    const values = splitByCommaIgnoringQuotes(line);

    return {
      CodigoBP: values[0] || '',
      PresupuestoAsignadoAcumulado: parseFloat(values[1]) || 0,
      PresupuestoObligado: parseFloat(values[2]) || 0, // Helper, not in interface but present
      PresupuestoEjecutado: parseFloat(values[3]) || 0,
      PorcentajeEjecucion: parseFloat(values[4]) || 0,
      AvanceFinanciero: parseFloat(values[5]) || 0,
      PorcentajeAvanceFisico: parseFloat(values[6]) || 0,
      Periodo: values[7] || '2024'
    };
  });
};

export const mergeData = (details: ProjectDetails[], metrics: ExecutionMetrics[]): MergedProject[] => {
  const metricsMap = new Map(metrics.map(m => [m.CodigoBP, m]));
  
  const merged: MergedProject[] = [];

  details.forEach(d => {
    const m = metricsMap.get(d.CodigoBP);
    if (m) {
      merged.push({ ...d, ...m });
    } else {
      // Push with default 0 metrics if missing in execution file
       merged.push({
         ...d,
         PresupuestoAsignadoAcumulado: d.PresupuestoAsignado2024,
         PresupuestoEjecutado: 0,
         PorcentajeEjecucion: 0,
         AvanceFinanciero: 0,
         PorcentajeAvanceFisico: 0,
         Periodo: '2024',
         PresupuestoObligado: 0
       });
    }
  });
  
  return merged;
};