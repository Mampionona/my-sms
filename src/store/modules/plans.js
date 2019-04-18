import { doAsync, createAsyncMutation } from '@/utils';

const GET_PLANS = createAsyncMutation('GET_PLANS');

const state = {
  plans: []
};

const getters = {
  plans: state => state.plans
};

const mutations = {
  [GET_PLANS.SUCCESS] (state, payload) {
    state.plans = payload;
  }
};

const actions = {
  getPlans (context) {
    return doAsync(context, {
      url: '/plans',
      mutationsTypes: GET_PLANS
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
