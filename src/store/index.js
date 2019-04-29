import Vuex from 'vuex';
import Vue from 'vue';
import { layout, auth, lists, contacts, campaigns, plans, users, payment } from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { layout, auth, lists, contacts, campaigns, plans, users, payment }
});
