import { doAsync, reFetchData, createAsyncMutation } from '@/async-utils';

const GET_ALL_USERS = createAsyncMutation('GET_ALL_USERS');
const UPDATE_ANY_USER = createAsyncMutation('UPDATE_ANY_USER');

export default {
  namespaced: true,
  state: {
    users: [],
    updateAnyUserLoading: false
  },
  getters: {
    users: state => state.users,
    updateAnyUserLoading: state => state.updateAnyUserLoading
  },
  mutations: {
    [GET_ALL_USERS.SUCCESS](state, payload) {
      state.users = payload;
    },
    [GET_ALL_USERS.PENDING]() { },
    [GET_ALL_USERS.FAILURE]() { },
    [UPDATE_ANY_USER.PENDING](state) {
      state.updateAnyUserLoading = true;
    },
    [UPDATE_ANY_USER.SUCCESS](state) {
      state.updateAnyUserLoading = false;
    },
    [UPDATE_ANY_USER.FAILURE](state) {
      state.updateAnyUserLoading = false;
    }
  },
  actions: {
    getAllUsers(context) {
      return doAsync(context, {
        url: '/users',
        mutationTypes: GET_ALL_USERS
      });
    },
    updateAnyUser(context, user) {
      const { userId } = user;
      const promise = doAsync(context, {
        url: `/users/${userId}/`,
        data: user,
        method: 'patch',
        mutationTypes: UPDATE_ANY_USER
      });
      promise.then(() => reFetchData({
        context,
        url: '/users/',
        mutation: 'GET_ALL_USERS_SUCCESS'
      }));

      return promise;
    }
  }
};
