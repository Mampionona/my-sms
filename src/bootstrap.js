import Vue from 'vue';

import '@/filters';
// Bootstrap JS
require('bootstrap');

// Add jQuery into vue instance
Vue.prototype.$jQuery = require('jquery');

// Global event bus
Vue.prototype.$eventBus = new Vue();
