import { downloadBlob } from './index.js';

// CSV Export (already used)
export const exportCSV = (rows, fileName) => {
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${fileName}.csv`);
};

// Excel Export (minimal XLSX via HTML table trick for compatibility)
export const exportExcel = (rows, fileName) => {
  const table = `\n<table>\n${rows.map(r => `<tr>${r.map(c => `<td>${String(c).replace(/&/g,'&amp;').replace(/</g,'&lt;')}</td>`).join('')}</tr>`).join('\n')}\n</table>`;
  const html = `\n<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\n<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Report</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>\n<body>\n${table}\n</body>\n</html>`;
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  downloadBlob(blob, `${fileName}.xls`);
};

// PDF Export using browser print-to-PDF (lightweight, no heavy deps)
export const exportPDF = async (title, sections, fileName) => {
  // Build minimal printable HTML
  const styles = `
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; }
      h1 { font-size: 20px; margin: 0 0 16px; }
      h2 { font-size: 16px; margin: 16px 0 8px; }
      table { width: 100%; border-collapse: collapse; margin-top: 8px; }
      td, th { border: 1px solid #e5e7eb; padding: 6px 8px; font-size: 12px; }
      .meta { color: #334155; font-size: 12px; margin-bottom: 16px; }
    </style>
  `;
  const content = `
    <h1>${title}</h1>
    ${sections.join('')}
  `;

  const html = `<!doctype html><html><head><meta charset="utf-8"/>${styles}</head><body>${content}</body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // Open in a hidden window and trigger print; user selects "Save as PDF"
  const win = window.open(url, '_blank');
  if (!win) return;
  const onLoad = () => {
    win.focus();
    win.print();
    setTimeout(() => {
      win.close();
      URL.revokeObjectURL(url);
    }, 500);
  };
  win.onload = onLoad;
};


