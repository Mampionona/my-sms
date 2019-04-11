import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './bootstrap';
import './filters';
import 'vue-progress-path/dist/vue-progress-path.css';
import '@/assets/styles/argon.scss';
import VueProgress from 'vue-progress-path';

Vue.use(VueProgress);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
