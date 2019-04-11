window.axios = require('axios');
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

const token = localStorage.getItem('token');
if (token) {
  window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Remove spaces
String.prototype.removeSpaces = function() {
  return this.replace(/\s/g, '').trim();
};
