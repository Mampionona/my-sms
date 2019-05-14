import XLSX from 'xlsx';
import { formatNumber } from './filters';
const COUNT_MAX_LINES = 1000000;
const COUNT_MIN_LINES = 5;

onmessage = function (e) {
  const file = e.data;
  const reader = new FileReader();

  reader.onload = (e) => {
    const errors = [];
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array', raw: true });

    /* convert from workbook to array of arrays */
    const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
    let rows = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
    rows = rows.filter(row => row.length > 0);
    const countLines = rows.length;

    if (countLines > COUNT_MAX_LINES || countLines < COUNT_MIN_LINES) {
      errors.push(`Le nombre de lignes du fichier doit être au maximum de ${formatNumber(COUNT_MAX_LINES)} et au minimum de ${formatNumber(COUNT_MIN_LINES)}.`);
    }

    postMessage({ errors, contacts: rows });
  };
  reader.readAsArrayBuffer(file);
}
