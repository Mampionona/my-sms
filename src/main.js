import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import VueProgress from 'vue-progress-path';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VueBreadcrumbs from 'vue-breadcrumbs';
import App from './App';
import i18n from './i18n';
import './bootstrap';
import './filters';
// styles
import 'vue-progress-path/dist/vue-progress-path.css';
import 'axios-progress-bar/dist/nprogress.css';
import '@/assets/styles/argon.scss';

Vue.use(VueTextareaAutosize);
Vue.use(VueProgress);
Vue.use(VueBreadcrumbs);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
