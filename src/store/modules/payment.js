import { doAsync, createAsyncMutation } from '@/async-utils';

const INIT_PAYMENT = createAsyncMutation('INIT_PAYMENT');
// const CONFIRM_PAYMENT = createAsyncMutation('CONFIRM_PAYMENT');

export default {
  namespaced: true,

  state: {
    paymentUrl: null
  },

  getters: {
    paymentUrl: state => state.paymentUrl
  },

  mutations: {
    [INIT_PAYMENT.PENDING]() {
      //
    },
    [INIT_PAYMENT.SUCCESS](state, payload) {
      state.paymentUrl = payload;
    },
    [INIT_PAYMENT.FAILURE]() {
      //
    }
  },

  actions: {
    getPaymentUrl(context, amount) {
      return doAsync(context, {
        url: '/payments/init',
        method: 'post',
        data: amount,
        mutationTypes: INIT_PAYMENT
      });
    }
  }
};
