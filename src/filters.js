import Vue from 'vue';
import Moment from 'moment';
import 'moment/locale/fr';

Moment.locale('fr');
// Date
Vue.filter('full', date => Moment(date, 'YYYYMMDD H:mm:ss').format('DD-MM-YYYY à H:mm:ss'));
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
Vue.filter('formatCurrency', number => `${number.toString().replace('.', ',')} €`);
