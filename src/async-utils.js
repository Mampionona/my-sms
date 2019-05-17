import Axios from 'axios';
import { UNAUTHENTICATED } from './utils';

const retryAxios = require('retry-axios');

const raxConfig = {
  retry: 10,
  retryDelay: 100,
  httpMethodsToRetry: ['POST', 'OPTIONS', 'DELETE'],
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

Axios.defaults.baseURL = 'https://api.my-sms.pro';
const token = localStorage.getItem('token');
if (token) Axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export function doAsync(context, { url, method, mutationTypes, data = {}, sort = true, shouldRetry = false, onUploadProgress = null }) {
  context.commit(mutationTypes.PENDING);
  let options = {
    url,
    data,
    method: method || 'get',
    responseType: 'text'
  };

  if (onUploadProgress) options = { ...options, onUploadProgress };
  if (shouldRetry) {
    retryAxios.attach();
    options = { ...options, raxConfig };
  }

  return new Promise((resolve, reject) => {
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

export function reFetchData({ context, url, mutation }) {
  //
}

Axios.interceptors.response.use((response) => { // eslint-disable-line
  // Do something with response data
  return response;
}, (error) => {
  // Do something with response error
  if (error.response.status === UNAUTHENTICATED) {
    localStorage.removeItem('token');
    if ('Authorization' in Axios.defaults.headers.common) delete Axios.defaults.headers.common.Authorization;
  }

  return Promise.reject(error);
});
