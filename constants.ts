
import { CaliProgram, StrategicProject } from './types';

export const ODS_DICTIONARY: Record<number, { name: string; color: string; description: string; goals: string[] }> = {
  1: { name: 'Fin de la Pobreza', color: '#e5243b', description: 'Poner fin a la pobreza en todas sus formas...', goals: [] },
  2: { name: 'Hambre Cero', color: '#dda63a', description: 'Poner fin al hambre...', goals: [] },
  3: { name: 'Salud y Bienestar', color: '#4c9f38', description: 'Garantizar una vida sana...', goals: [] },
  4: { name: 'Educación de Calidad', color: '#c5192d', description: 'Garantizar educación inclusiva...', goals: [] },
  6: { name: 'Agua Limpia y Saneamiento', color: '#26bde2', description: 'Garantizar agua y saneamiento...', goals: [] },
  8: { name: 'Trabajo Decente y Crecimiento Económico', color: '#a21942', description: 'Promover crecimiento inclusivo...', goals: [] },
  9: { name: 'Industria, Innovación e Infraestructura', color: '#fd6925', description: 'Construir infraestructuras resilientes...', goals: [] },
  11: { name: 'Ciudades y Comunidades Sostenibles', color: '#fd9d24', description: 'Lograr ciudades inclusivas y seguras...', goals: [] },
  12: { name: 'Producción y Consumo Responsables', color: '#bf8b2e', description: 'Garantizar consumo sostenible...', goals: [] },
  13: { name: 'Acción por el Clima', color: '#3f7e44', description: 'Medidas urgentes contra el cambio climático...', goals: [] },
  15: { name: 'Vida de Ecosistemas Terrestres', color: '#56c02b', description: 'Gestionar bosques y biodiversidad...', goals: [] },
  16: { name: 'Paz, Justicia e Instituciones Sólidas', color: '#00689d', description: 'Promover sociedades justas...', goals: [] },
  17: { name: 'Alianzas para Lograr los Objetivos', color: '#19486a', description: 'Revitalizar la alianza mundial...', goals: [] },
};

export const STRATEGIC_PROJECTS: StrategicProject[] = [
  {
    id: 'tren',
    name: "Tren de Cercanías del Valle",
    description: "Sistema ferroviario regional de 73 km que conectará a Cali con Yumbo, Jamundí y Palmira, transformando la movilidad metropolitana.",
    status: 'En Formulación',
    sector: "Movilidad",
    instrument: "Cali 500+",
    objective: "Implementar un sistema de transporte regional eficiente, sostenible y de alta capacidad.",
    term: 'Largo',
    responsible: ["DAP", "Gobernación del Valle", "Propacífico"],
    ods: [9, 11, 13]
  },
  {
    id: 'mio',
    name: "Fortalecimiento del Sistema MIO",
    description: "Optimización de la infraestructura existente, expansión de la Troncal Oriental y renovación de la flota hacia energías limpias.",
    status: 'En Ejecución',
    sector: "Movilidad",
    instrument: "POT 2014",
    objective: "Garantizar la sostenibilidad financiera y operativa del transporte masivo.",
    term: 'Medio',
    responsible: ["Metrocali", "Sec. Movilidad"],
    ods: [11]
  },
  {
    id: 'ptar',
    name: "PTAR Sur - Saneamiento Hídrico",
    description: "Planta de Tratamiento de Aguas Residuales para el sur de la ciudad, fundamental para la recuperación del Río Cauca.",
    status: 'En Formulación',
    sector: "Ambiente",
    instrument: "Cali 500+",
    objective: "Asegurar el equilibrio ecosistémico y el acceso equitativo a servicios vitales.",
    term: 'Largo',
    responsible: ["Emcali", "Dagma"],
    ods: [6, 13, 14]
  },
  {
    id: 'jovita',
    name: "Paseo de Jovita al Río",
    description: "Proyecto de renovación urbana que conecta el Centro Histórico con San Antonio y el Río Cali a través de espacio público efectivo.",
    status: 'Planificado',
    sector: "Renovación Urbana",
    instrument: "Cali 500+",
    objective: "Revitalizar el corazón patrimonial de Cali integrando cultura y naturaleza.",
    term: 'Medio',
    responsible: ["Sec. Infraestructura", "DAP"],
    ods: [11, 8]
  },
  {
    id: 'cuidarte',
    name: "CuidARTE: Sistema de Cuidado",
    description: "Red distrital de servicios e infraestructura para el cuidado, con enfoque de género y territorialización en ecosistemas.",
    status: 'En Ejecución',
    sector: "Social",
    instrument: "Plan de Desarrollo",
    objective: "Reducir la pobreza de tiempo y garantizar derechos básicos de las cuidadoras.",
    term: 'Corto',
    responsible: ["Sec. Bienestar Social"],
    ods: [5, 1, 10]
  }
];

export const CALI_PROGRAMS: CaliProgram[] = [
  { id: '1.1', name: 'Seguridad, Convivencia y Justicia', purpose: 'Reconciliada', budget2024: 336370, budget2025: 302564, budget2026: 409331, budget2027: 349326, totalBudget: 1397592, ods: [16] },
  { id: '1.2', name: 'Oportunidades para la Integración Social', purpose: 'Reconciliada', budget2024: 3036784, budget2025: 3791128, budget2026: 3799064, budget2027: 3851712, totalBudget: 14478689, ods: [1, 2, 3, 4, 8, 10] },
  { id: '2.1', name: 'Territorio Planificado y Conectado', purpose: 'Renovada', budget2024: 757420, budget2025: 1505185, budget2026: 1469430, budget2027: 1711823, totalBudget: 5443858, ods: [9, 11] },
  { id: '2.2', name: 'Territorio Resiliente y Biodiverso', purpose: 'Renovada', budget2024: 213659, budget2025: 153381, budget2026: 178318, budget2027: 191976, totalBudget: 737334, ods: [6, 13, 15] },
  { id: '3.1', name: 'Gobierno Abierto y Transparente', purpose: 'Buen Gobierno', budget2024: 28612, budget2025: 21271, budget2026: 27711, budget2027: 31037, totalBudget: 108631, ods: [16, 17] },
  { id: '3.2', name: 'Gestión Pública para los Ciudadanos', purpose: 'Buen Gobierno', budget2024: 110847, budget2025: 98111, budget2026: 126202, budget2027: 138150, totalBudget: 473309, ods: [16] }
];
