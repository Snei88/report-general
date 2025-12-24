
/**
 * Export Utilities for Cali Inversión Dashboard - Dossier Maestro 500+
 */

export const exportToHTML = (currentViewLabel: string) => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  // Obtenemos el HTML actual y capturamos todos los estilos inyectados
  const fullAppContent = rootElement.innerHTML;
  const styles = Array.from(document.querySelectorAll('style'))
    .map(style => style.outerHTML)
    .join('\n');

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cali 500+ | Reporte de Estado Maestro: ${currentViewLabel}</title>
  
  <!-- Dependencias Externas Requeridas -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  ${styles}
  
  <style>
    :root {
      --brand-primary: #020617;
      --brand-teal: #0d9488;
    }
    body { 
      font-family: 'Plus Jakarta Sans', sans-serif; 
      background-color: #f8fafc; 
      margin: 0;
      overflow-x: hidden;
    }
    
    /* Ajustes para el modo estático portable */
    .no-print, header button, .export-ignore { 
      display: none !important; 
    }

    /* Sidebar Estático del Reporte */
    .portable-sidebar {
      width: 280px;
      background: #020617;
      height: 100vh;
      position: sticky;
      top: 0;
      color: #94a3b8;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(255,255,255,0.05);
    }

    .executive-header {
      background: white;
      padding: 1.5rem 3rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .report-badge {
      background: #0d9488;
      color: white;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    @media print {
      .portable-sidebar { display: none !important; }
      body { background: white !important; }
    }
  </style>
</head>
<body class="flex">
  
  <aside class="portable-sidebar">
    <div style="margin-bottom: 3rem;">
      <h1 style="color: white; font-weight: 900; font-size: 24px; italic: true; letter-spacing: -0.05em;">
        CALI<span style="color: #0d9488;">500+</span>
      </h1>
      <p style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-top: 4px; letter-spacing: 0.2em;">Dossier Maestro</p>
    </div>

    <nav style="flex: 1;">
      <div style="background: rgba(255,255,255,0.05); color: white; padding: 1rem; border-radius: 1rem; border-left: 4px solid #0d9488; margin-bottom: 1rem;">
         <p style="font-size: 11px; font-weight: 900; text-transform: uppercase; margin: 0;">Vista Consolidada</p>
         <p style="font-size: 9px; font-weight: 600; opacity: 0.6; margin-top: 4px;">${currentViewLabel}</p>
      </div>
      <p style="font-size: 10px; padding: 0 1rem; color: #475569; font-weight: 700;">Este documento contiene el estado actual de la inversión distrital al corte del día de hoy.</p>
    </nav>

    <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem;">
       <button onclick="window.print()" style="width: 100%; background: #4c1d95; color: white; border: none; padding: 1rem; border-radius: 1rem; font-weight: 900; font-size: 10px; text-transform: uppercase; cursor: pointer;">Imprimir PDF</button>
       <p style="font-size: 8px; text-align: center; margin-top: 1rem; color: #475569;">SANTIAGO DE CALI - 2025</p>
    </div>
  </aside>

  <div style="flex: 1; display: flex; flex-direction: column;">
    <header class="executive-header">
       <div style="display: flex; items-center: center; gap: 1rem;">
          <span class="report-badge">Reporte Oficial</span>
          <h2 style="font-size: 14px; font-weight: 900; text-transform: uppercase; margin: 0; color: #0f172a;">${currentViewLabel}</h2>
       </div>
       <div style="text-align: right;">
          <p style="font-size: 10px; font-weight: 800; margin: 0; color: #64748b;">Fecha de Generación</p>
          <p style="font-size: 12px; font-weight: 900; margin: 0; color: #0f172a;">${new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
       </div>
    </header>

    <main style="padding: 3rem;">
      <div style="max-width: 1600px; margin: 0 auto;">
         ${fullAppContent}
      </div>
    </main>
  </div>

  <script>
    // Limpieza de UI interactiva para el archivo estático
    document.querySelectorAll('input').forEach(i => i.disabled = true);
    document.querySelectorAll('button').forEach(b => {
      if(!b.hasAttribute('onclick')) b.style.display = 'none';
    });
    console.log("Reporte Cali 500+ cargado correctamente.");
  </script>
</body>
</html>`;

  const blob = new Blob([htmlTemplate], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Cali500_Dossier_Maestro_${currentViewLabel.replace(/\s+/g, '_')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printToPDF = () => {
  window.print();
};
