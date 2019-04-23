window.axios = require('axios');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
import { UNAUTHENTICATED } from './utils';
import Vue from 'vue';

require('bootstrap');

Vue.prototype.$jQuery = window.$;

// Global axios defaults
window.axios.defaults.baseURL = 'https://api.my-sms.pro';
const token = localStorage.getItem('token');
if (token) {
  window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Add a response interceptor
window.axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  const { status } = error.response;
  switch (status) {
    case UNAUTHENTICATED:
      localStorage.removeItem('token');
      if ('Authorization' in window.axios.defaults.headers.common) {
        delete window.axios.defaults.headers.common.Authorization;
      }
      break;
  }
  return Promise.reject(error);
});

// Remove spaces
String.prototype.removeSpaces = function() {
  return this.replace(/\s/g, '').trim();
};
