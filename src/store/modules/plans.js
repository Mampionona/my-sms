import { doAsync, createAsyncMutation } from '@/async-utils';

const GET_PLANS = createAsyncMutation('GET_PLANS');

export default {
  namespaced: true,

  state: {
    plans: []
  },

  getters: {
    plans: state => state.plans
  },

  mutations: {
    [GET_PLANS.PENDING] () {
      //
    },
    [GET_PLANS.SUCCESS] (state, payload) {
      state.plans = payload;
    },
    [GET_PLANS.FAILURE] () {
      //
    }
  },

  actions: {
    getPlans (context) {
      return doAsync(context, {
        url: '/plans',
        mutationTypes: GET_PLANS
      });
    },
    updatePlan (context, planId) {
      return doAsync(context, {
        url: `/plans/${planId}`,
        method: 'post'
      });
    }
  }
};
