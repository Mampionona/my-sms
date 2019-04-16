import Vuex from 'vuex';
import Vue from 'vue';
import { layout, auth, lists, contacts, campaign } from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { layout, auth, lists, contacts, campaign }
});
