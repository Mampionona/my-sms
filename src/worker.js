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

    // Convert from workbook to array of arrays
    const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
    let rows = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
    // Remove empty lignes
    rows = rows.filter(row => row.length > 0);
    const countLines = rows.length;
    const titles = rows.shift();
    // console.log(rows[0]);
    // const titles = rows[0].shift();

    if (!titles.includes('telephone')) errors.push('Le fichier Excel/CSV doit avoir au moins une colonne nommée "telephone"');
    if (countLines > COUNT_MAX_LINES || countLines < COUNT_MIN_LINES) errors.push(
      `Le nombre de lignes du fichier doit être au maximum de ${formatNumber(COUNT_MAX_LINES)} et au minimum de ${formatNumber(COUNT_MIN_LINES)}.`
    );

    const perChunk = 10000;

    rows = rows.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);
      // start a new chunk
      if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    const contacts = rows.map((row) => {
      return row.map((_row) => {
        const contactObject = {};
        titles.forEach((title, index) => {
          if (title === 'telephone') contactObject[title] = String(_row[index]);
          else contactObject[title] = _row[index];
        });
        return contactObject;
      });
    });

    postMessage({ errors, contacts });
  };
  reader.readAsArrayBuffer(file);
};
