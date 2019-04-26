import Axios from 'axios';
import Vue from 'vue';
import { UNAUTHENTICATED } from './utils';
// Bootstrap JS
require('bootstrap');

// Add jQuery into vue instance
Vue.prototype.$jQuery = require('jquery');

// Global axios defaults
Axios.defaults.baseURL = 'https://api.my-sms.pro';
const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === UNAUTHENTICATED) {
    localStorage.removeItem('token');
    if ('Authorization' in Axios.defaults.headers.common) {
      delete Axios.defaults.headers.common.Authorization;
    }
  }
  return Promise.reject(error);
});

// Remove spaces
String.prototype.removeSpaces = function() {
  return this.replace(/\s/g, '').trim();
};
