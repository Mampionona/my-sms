import { doAsync, createAsyncMutation } from '@/async-utils';

const INIT_PAYMENT = createAsyncMutation('INIT_PAYMENT');
const CONFIRM_PAYMENT = createAsyncMutation('CONFIRM_PAYMENT');
const GET_PAYMENTS_LIST = createAsyncMutation('GET_PAYMENTS_LIST');
const SEND_TRANSFER_INSTRUCTIONS = createAsyncMutation('SEND_TRANSFER_INSTRUCTIONS');

export default {
  namespaced: true,

  state: {
    paymentUrl: null,
    payments: [],
    paymentStatus: null,
    isFetching: false
  },

  getters: {
    paymentUrl: state => state.paymentUrl,
    payments: state => state.payments,
    paymentStatus: state => state.paymentStatus,
    isFetching: state => state.isFetching
  },

  mutations: {
    [INIT_PAYMENT.PENDING]() {},
    [INIT_PAYMENT.SUCCESS](state, payload) {
      state.paymentUrl = payload;
    },
    [INIT_PAYMENT.FAILURE]() {},
    [CONFIRM_PAYMENT.PENDING]() {},
    [CONFIRM_PAYMENT.SUCCESS](state, payload) {
      state.paymentStatus = payload;
    },
    [CONFIRM_PAYMENT.FAILURE]() {},
    [GET_PAYMENTS_LIST.PENDING](state) {
      state.isFetching = true;
    },
    [GET_PAYMENTS_LIST.SUCCESS](state, payload) {
      state.isFetching = false;
      state.payments = payload;
    },
    [GET_PAYMENTS_LIST.FAILURE](state) {
      state.isFetching = false;
    },
    [SEND_TRANSFER_INSTRUCTIONS.PENDING]() {},
    [SEND_TRANSFER_INSTRUCTIONS.SUCCESS]() {},
    [SEND_TRANSFER_INSTRUCTIONS.FAILURE]() {}
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
    },
    sendTransferEmailInstructions(context, amount) {
      return doAsync(context, {
        url: '/payments/transferemailinstructions',
        method: 'post',
        data: { amount },
        mutationTypes: SEND_TRANSFER_INSTRUCTIONS
      });
    }
  }
};
