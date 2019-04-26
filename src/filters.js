import Vue from 'vue';
import Moment from 'moment';
import 'moment/locale/fr';
import Currency from 'currency.js';

Moment.locale('fr');
// Date
Vue.filter('full', date => Moment(date, 'YYYYMMDD H:mm:ss').format('DD-MM-YYYY à HH:mm'));
Vue.filter('ago', date => Moment(date, 'YYYYMMDD H:mm:ss').fromNow());
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

export function currency (value, symbol = '€', precision = 3) {
  return Currency(value, {
    formatWithSymbol: true,
    precision,
    pattern: `# !`,
    symbol
  }).format();
}

Vue.filter('formatCurrency', currency);
