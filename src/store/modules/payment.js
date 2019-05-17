import { doAsync, reFetchData, createAsyncMutation } from '@/async-utils';

const INIT_PAYMENT = createAsyncMutation('INIT_PAYMENT');
const CONFIRM_PAYMENT = createAsyncMutation('CONFIRM_PAYMENT');
const GET_PAYMENTS_LIST = createAsyncMutation('GET_PAYMENTS_LIST');
const FETCH_USER = createAsyncMutation('FETCH_USER');

export default {
  namespaced: true,

  state: {
    paymentUrl: null,
    payments: [],
    paymentStatus: null
  },

  getters: {
    paymentUrl: state => state.paymentUrl,
    payments: state => state.payments,
    paymentStatus: state => state.paymentStatus
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
    [CONFIRM_PAYMENT.SUCCESS](state, payload) {
      state.paymentStatus = payload;
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
      const promise = doAsync(context, {
        url: `/payments/result/${token}`,
        mutationTypes: CONFIRM_PAYMENT
      });
      promise.then(() => reFetchData({ context, url: '/users/me/', mutationTypes: FETCH_USER }));
      return promise;
    },
    getPaymentsLists(context) {
      return doAsync(context, {
        url: '/payments',
        mutationTypes: GET_PAYMENTS_LIST
      });
    }
  }
};
