import { doAsync, createAsyncMutation } from '@/async-utils';

const GET_ALL_USERS = createAsyncMutation('GET_ALL_USERS');

const state = {
  users: []
};

const getters = {
  users: state => state.users
};

const mutations = {
  [GET_ALL_USERS.SUCCESS] (state, payload) {
    state.users = payload;
  },
  [GET_ALL_USERS.PENDING] () {},
  [GET_ALL_USERS.FAILURE] () {}
};

const actions = {
  getAllUsers(context) {
    return doAsync(context, {
      url: '/users',
      mutationTypes: GET_ALL_USERS
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
