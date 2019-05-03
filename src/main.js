import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import VueProgress from 'vue-progress-path';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VueBreadcrumbs from 'vue-breadcrumbs';
import DatatableFactory from 'vuejs-datatable/dist/vuejs-datatable.esm';
import App from './App';
import i18n from './i18n';
import './bootstrap';
import './filters';
// styles
import 'vue-progress-path/dist/vue-progress-path.css';
import 'axios-progress-bar/dist/nprogress.css';
import '@/assets/styles/argon.scss';

DatatableFactory.useDefaultType(false)
  .registerTableType('datatable', (tableType) => {
    tableType.mergeSettings({
      table: {
        class: 'table table-hover table-striped dataTable'
      },
      pager: {
        classes: {
          li: 'paginate_button page-item',
          a: 'page-link',
          pager: 'pagination justify-content-center',
          selected: 'active'
        }
      }
    });
  });

Vue.use(VueTextareaAutosize);
Vue.use(VueProgress);
Vue.use(VueBreadcrumbs);
Vue.use(DatatableFactory);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
