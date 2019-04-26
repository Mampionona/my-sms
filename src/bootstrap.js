import Vue from 'vue';
import { UNAUTHENTICATED } from './utils';

window.axios = require('axios');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery'); // eslint-disable-line

require('bootstrap');

Vue.prototype.$jQuery = window.$;

// Global axios defaults
window.axios.defaults.baseURL = 'https://api.my-sms.pro';
const token = localStorage.getItem('token');
if (token) {
  window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Add a response interceptor
window.axios.interceptors.response.use((response) => { // eslint-disable-line
  // Do something with response data
  return response;
}, (error) => {
  // Do something with response error
  // const { status } = error.response;
  if (error.response === UNAUTHENTICATED) {
    localStorage.removeItem('token');

    if ('Authorization' in window.axios.defaults.headers.common) {
      delete window.axios.defaults.headers.common.Authorization;
    }
  }

  return Promise.reject(error);
});
