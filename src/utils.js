import XLSX from 'xlsx';
import Axios from 'axios';

export const UNAUTHENTICATED = 401;
export const COUNT_MAX_LINES = 100000;
export const COUNT_MIN_LINES = 5;
export const validFileExtensions = ['.xls', '.xlsx', '.csv'];

export function workbookToArray (file, complete) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    /* convert from workbook to array of arrays */
    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const array = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
    if (complete) {
      complete(array, file);
    }
  };
  reader.readAsArrayBuffer(file);
}

export const createAsyncMutation = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
});

export function doAsync(context, { url, method = 'get', mutationTypes = null, data = {} }) {
  if (mutationTypes.PENDING)
    context.commit(mutationTypes.PENDING);
  return new Promise((resolve, reject) => {
    // url = `${url}?timestamp=${new Date().getTime()}`;
    Axios[method](url, data)
      .then(({ data }) => {
        if (mutationTypes.SUCCESS)
          context.commit(mutationTypes.SUCCESS, data);
        resolve(data);
      })
      .catch(({ response }) => {
        if (mutationTypes.FAILURE)
          context.commit(mutationTypes.FAILURE, response);
        reject(response);
      });
  });
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
  if (utf16CharsLength > firstMaxLength) return 1 + (Math.ceil((utf16CharsLength - firstMaxLength) / subsequentsMaxLength));
}

/**
 * Compute remaining chars for this message
 * @param { Number } countSMS
 * @param { Number } len
 * @return { Number }
 */
export function computeRemainingChars(countSMS, len) {
  const { firstMaxLength, subsequentsMaxLength } = MESSAGE;
  if (countSMS === 1) {
    return firstMaxLength - len;
  }

  len -= firstMaxLength;
  return (subsequentsMaxLength * (countSMS - 1)) - len; // 1 = first message
}
