import XLSX from 'xlsx';

export const UNAUTHENTICATED = 401;
export const COUNT_MAX_LINES = 100000;
export const COUNT_MIN_LINES = 5;
export const validFileExtensions = ['.xls', '.xlsx', '.csv'];
export const MAIL_TO = 'julien@my-sms.pro';

export function workbookToArray(file, complete) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    /* convert from workbook to array of arrays */
    const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
    let arrays = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
    // console.log(array);
    arrays = arrays.filter(array => array.length > 0);
    if (complete) {
      complete(arrays, file);
    }
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
  return str.replace(/\s/g, '').trim();
}

/**
 * Add or remove one or more classes from element
 * @param {HTMLElement} element 
 * @param {String} className 
 */
export function toggleClass(element, className) {
  className = className.split(' ');
  className.forEach(_className => {
    if (element.classList.contains(_className)) element.classList.remove(_className);
    else element.classList.add(_className);
  });
}
