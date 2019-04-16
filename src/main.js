import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './bootstrap';
import './filters';
import VueProgress from 'vue-progress-path';
// styles
import 'vue-progress-path/dist/vue-progress-path.css';
import '@/assets/styles/argon.scss';
import i18n from './i18n'

Vue.use(VueProgress);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
