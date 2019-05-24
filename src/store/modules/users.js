import { doAsync, createAsyncMutation } from '@/async-utils';
import { updateUser } from '../util';

const GET_ALL_USERS = createAsyncMutation('GET_ALL_USERS');
const UPDATE_ANY_USER = createAsyncMutation('UPDATE_ANY_USER');
const DELETE_USER = createAsyncMutation('DELETE_USER');
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_INFOS = 'UPDATE_USER_INFOS';

export default {
  namespaced: true,
  state: {
    users: [],
    updateAnyUserLoading: false,
    isFetching: false
  },
  getters: {
    users: state => state.users,
    updateAnyUserLoading: state => state.updateAnyUserLoading,
    isFetching: state => state.isFetching
  },
  mutations: {
    [GET_ALL_USERS.SUCCESS](state, payload) {
      state.users = payload;
      state.isFetching = false;
    },
    [GET_ALL_USERS.PENDING](state) {
      state.isFetching = true;
    },
    [GET_ALL_USERS.FAILURE](state) {
      state.isFetching = false;
    },
    [UPDATE_ANY_USER.PENDING](state) {
      state.updateAnyUserLoading = true;
    },
    [UPDATE_ANY_USER.SUCCESS](state) {
      state.updateAnyUserLoading = false;
    },
    [UPDATE_ANY_USER.FAILURE](state) {
      state.updateAnyUserLoading = false;
    },
    [DELETE_USER.PENDING]() {},
    [DELETE_USER.SUCCESS]() {},
    [DELETE_USER.FAILURE]() {},
    [UPDATE_USER](state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    [UPDATE_USER_INFOS](state, payload) {
      const { users } = state;
      const { userId } = payload;
      state.users = users.map((user) => {
        if (user.id === userId) return updateUser(user, payload);
        return user;
      });
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
      return doAsync(context, {
        url: `/users/${userId}/`,
        data: user,
        method: 'patch',
        mutationTypes: UPDATE_ANY_USER
      });
    },
    deleteUser(context, userId) {
      return doAsync(context, {
        url: `/users/${userId}/`,
        method: 'delete',
        mutationTypes: DELETE_USER
      })
        .then(() => context.commit('UPDATE_USER', userId));
    }
  }
};
