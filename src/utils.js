import XLSX from 'xlsx';

export const BAD_REQUEST = 400;
export const UNAUTHENTICATED = 401;
export const COUNT_MAX_LINES = 100000;
export const COUNT_MIN_LINES = 5;
export const validFileExtensions = ['.xls', '.xlsx', '.csv'];
export const MAIL_TO = 'help@my-sms.pro';
export const TELEPHONE = '0899020720';
export const dateUTC = date => Date.parse(date);

export function workbookToArray(file, complete) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    /* convert from workbook to array of arrays */
    const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
    let arrays = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
    arrays = arrays.filter(array => array.length > 0);
    if (complete) complete(arrays, file);
  };
  reader.readAsArrayBuffer(file);
}

export const MESSAGE = {
  firstMaxLength: 147,
  subsequentsMaxLength: 153
};

/**
 * Compute number of SMS for this message
 * @param { String } message
 * @return { Number }
 */
export function computeNumberOfSMS(message) {
  const { firstMaxLength, subsequentsMaxLength } = MESSAGE;
  const utf16CharsLength = message.length;

  if (utf16CharsLength <= firstMaxLength) return 1;
  return 1 + (Math.ceil((utf16CharsLength - firstMaxLength) / subsequentsMaxLength));
}

/**
 * Compute remaining chars for this message
 * @param { Number } countSMS
 * @param { Number } len
 * @return { Number }
 */
export function computeRemainingChars(countSMS, len) {
  const { firstMaxLength, subsequentsMaxLength } = MESSAGE;
  let remainingLen = len;

  if (countSMS === 1) return firstMaxLength - len;
  remainingLen -= firstMaxLength;

  return (subsequentsMaxLength * (countSMS - 1)) - remainingLen; // 1 = first message
}

/**
 * Remove spaces in a string
 * @param { String } str
 * @return { String }
 */
export function removeSpaces(str) {
  return str.toString().replace(/\s/g, '').trim();
}

/**
 * Add or remove one or more classes from element
 * @param {HTMLElement} element
 * @param {String} className
 */
export function toggleClass(element, className) {
  className.split(' ').forEach((_className) => {
    if (element.classList.contains(_className)) element.classList.remove(_className);
    else element.classList.add(_className);
  });
}

export function arrayToCSV(array, exportName = 'export') {
  if (array.length === 0) return;

  const data = [];
  const firstLine = array[0];
  if ('id' in firstLine) delete firstLine.id;
  const columns = Object.keys(firstLine);
  // append columns title
  data.push(columns);
  // append all entries
  array.forEach((row) => {
    if ('id' in row) delete row.id;
    data.push(Object.values(row));
  });

  // Building the CSV from the Data two-dimensional array
  // Each column is separated by ";" and new line "\n" for next row
  let csvContent = '';
  data.forEach((infoArray, index) => {
    const dataString = infoArray.join(';');
    csvContent += (index < data.length) ? `${dataString}\n` : dataString;
  });

  // The download function takes a CSV string, the filename and mimeType as parameters
  // Scroll/look down at the bottom of this snippet to see how download is called
  const download = (content, fileName, mimeType = 'application/octet-stream') => {
    const a = document.createElement('a');

    if (navigator.msSaveBlob) navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
    else if (URL && 'download' in a) {
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    else window.location.href = `data:application/octet-stream,${encodeURIComponent(content)}`;
  };

  download(csvContent, `${exportName}.csv`, 'text/csv;encoding:utf-8');
}
