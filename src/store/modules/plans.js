import { doAsync, createAsyncMutation } from '@/async-utils';

const GET_PLANS = createAsyncMutation('GET_PLANS');

const state = {
  plans: []
};

const getters = {
  plans: state => state.plans
};

const mutations = {
  [GET_PLANS.PENDING] () {
    // 
  },
  [GET_PLANS.SUCCESS] (state, payload) {
    state.plans = payload;
  },
  [GET_PLANS.FAILURE] () {
    // 
  }
};

const actions = {
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
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
