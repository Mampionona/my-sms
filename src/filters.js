import Vue from 'vue';
import Currency from 'currency.js';
import humanTime from 'humantime';

// Date
Vue.filter('full', date => new Date(date).toLocaleString('fr-FR'));
Vue.filter('ago', humanTime);

// String
Vue.filter('capitalize', str => str.charAt(0).toUpperCase() + str.slice(1));
Vue.filter('upper', str => str.toUpperCase());
Vue.filter('lower', str => str.toLowerCase());
Vue.filter('limit', (str, len, more = '...') => {
  if (str.length <= len) {
    return str;
  }
  return str.substring(0, len) + more;
});
Vue.filter('fullname', ({ firstname, lastname }) => `${lastname} ${firstname}`);

function currency(value, precision = 3, symbol = '€') {
  return Currency(value, {
    formatWithSymbol: true,
    precision,
    pattern: '# !',
    symbol
  }).format();
}

Vue.filter('formatCurrency', currency);
