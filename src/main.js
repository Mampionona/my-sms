import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import VueProgress from 'vue-progress-path';
import i18n from './i18n';
import VueTextareaAutosize from 'vue-textarea-autosize';
import './bootstrap';
import './filters';
// styles
import 'vue-progress-path/dist/vue-progress-path.css';
import '@/assets/styles/argon.scss';

Vue.use(VueTextareaAutosize);
Vue.use(VueProgress);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
