import Vue from 'vue';
import humanTime from 'humantime';

const locale = 'fr-FR';

export const currency = (value, precision = 3, _currency = 'EUR') => value.toLocaleString(locale, {
  style: 'currency',
  currency: _currency,
  minimumFractionDigits: precision
}).replace(/\s/g, ' ');

export const formatNumber = (number) => {
  if (number) return number.toLocaleString(locale);
  return 0;
};

// Date
Vue.filter('full', date => new Date(date).toLocaleString(locale));
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
Vue.filter('formatCurrency', currency);
Vue.filter('formatNumber', formatNumber);
