import Axios from 'axios';

const retryAxios = require('retry-axios');
const raxConfig = {
  retry: 3,
  retryDelay: 100,
  // httpMethodsToRetry: ['POST', 'OPTIONS'],
  onRetryAttempt: (err) => {
    const cfg = retryAxios.getConfig(err);
    console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
  }
};

export const createAsyncMutation = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
});

export function doAsync(context, { url, method, mutationTypes, data = {}, sort = true, shouldRetry = false, onUploadProgress = null }) {
  context.commit(mutationTypes.PENDING);
  let options = {
    url,
    data,
    method: method || 'get',
    responseType: 'text'
  };

  if (onUploadProgress) {
    options = { ...options, onUploadProgress };
  }

  return new Promise((resolve, reject) => {
    if (shouldRetry) {
      retryAxios.attach();
      options = { ...options, raxConfig };
    }
    Axios(options)
      .then((response) => {
        const responseData = response.data;
        let sortedData = responseData;
        if (sort && Array.isArray(responseData)) {
          sortedData = responseData.sort((a, b) => {
            if ('id' in a) return b.id - a.id;
            return 0;
          });
        }
        context.commit(mutationTypes.SUCCESS, sortedData);
        resolve(sortedData);
      })
      .catch(({ response }) => {
        context.commit(mutationTypes.FAILURE, response);
        reject(response);
      });
  });
}
