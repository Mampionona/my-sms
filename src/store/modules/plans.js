import { doAsync, createAsyncMutation } from '@/async-utils';

const GET_PLANS = createAsyncMutation('GET_PLANS');
const UPDATE_PLAN = createAsyncMutation('UPDATE_PLAN');

export default {
  namespaced: true,

  state: {
    plans: []
  },

  getters: {
    plans: state => state.plans
  },

  mutations: {
    [GET_PLANS.PENDING]() {
      //
    },
    [GET_PLANS.SUCCESS](state, payload) {
      state.plans = payload;
    },
    [GET_PLANS.FAILURE]() {
      //
    },
    [UPDATE_PLAN.PENDING] (state) {
      //
    },
    [UPDATE_PLAN.SUCCESS] (state) {
      //
    },
    [UPDATE_PLAN.FAILURE] (state) {

    }
  },

  actions: {
    getPlans(context) {
      return doAsync(context, {
        url: '/plans',
        mutationTypes: GET_PLANS
      });
    },
    updatePlan(context, plan) {
      const { planId } = plan;
      return doAsync(context, {
        url: `/plans/${planId}`,
        method: 'patch',
        data: plan,
        mutationTypes: UPDATE_PLAN
      });
    }
  }
};
