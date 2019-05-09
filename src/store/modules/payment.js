import { doAsync, createAsyncMutation } from '@/async-utils';

const INIT_PAYMENT = createAsyncMutation('INIT_PAYMENT');
const CONFIRM_PAYMENT = createAsyncMutation('CONFIRM_PAYMENT');
const GET_PAYMENTS_LIST = createAsyncMutation('GET_PAYMENTS_LIST');

export default {
  namespaced: true,

  state: {
    paymentUrl: null,
    payments: []
  },

  getters: {
    paymentUrl: state => state.paymentUrl,
    payments: state => state.payments
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
    },
    [CONFIRM_PAYMENT.PENDING]() {
      //
    },
    [CONFIRM_PAYMENT.SUCCESS]() {
      //
    },
    [CONFIRM_PAYMENT.FAILURE]() {
      //
    },
    [GET_PAYMENTS_LIST.PENDING]() {
      //
    },
    [GET_PAYMENTS_LIST.SUCCESS](state, payload) {
      state.payments = payload;
    },
    [GET_PAYMENTS_LIST.FAILURE]() {
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
    },
    checkPaymentStatus(context, token) {
      return doAsync(context, {
        url: `/payments/result/${token}`,
        mutationTypes: CONFIRM_PAYMENT
      });
    },
    getPaymentsLists(context) {
      return doAsync(context, {
        url: '/payments',
        mutationTypes: GET_PAYMENTS_LIST
      });
    }
  }
};
