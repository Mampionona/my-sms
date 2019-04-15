import XLSX from 'xlsx';

export const UNAUTHENTICATED = 401;
export const COUNT_MAX_LINES = 100000;
export const COUNT_MIN_LINES = 5;
export const validFileExtensions = ['.xls', '.xlsx', '.csv'];

export function workbookToArray(file, complete) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    /* convert from workbook to array of arrays */
    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    if (complete) {
      complete(XLSX.utils.sheet_to_json(first_worksheet, { header: 1 }), file);
    }
  };
  reader.readAsArrayBuffer(file);
}
