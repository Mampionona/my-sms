import Axios from "axios";
import { doAsync, createAsyncMutation } from '@/async-utils';

const SET_TOKEN = 'SET_TOKEN';
const LOGOUT = 'LOGOUT';
const FETCH_USER = createAsyncMutation('FETCH_USER');
const UPDATE_ACCOUNT = createAsyncMutation('UPDATE_ACCOUNT');

function loggedInOrRegistered(context, token, resolve) {
  // update state
  context.commit(SET_TOKEN, token);
  // store the generated token
  localStorage.setItem('token', token);
  // set authorization
  window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  resolve(token);
}

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    user: null
  },
  getters: {
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    user: state => state.user,
    isAdmin: (state, getters) => getters.user !== null && getters.user.id === 1
  },
  mutations: {
    [SET_TOKEN] (state, token) {
      state.token = token;
    },
    [LOGOUT] (state) {
      state.user = null;
      state.token = null;
    },
    [FETCH_USER.PENDING] () {},
    [FETCH_USER.SUCCESS] (state, payload) {
      state.user = payload[0];
    },
    [FETCH_USER.FAILURE] () {},
    [UPDATE_ACCOUNT.PENDING] () {},
    [UPDATE_ACCOUNT.SUCCESS] (state, payload) {
      // state.user = payload[0];
      console.log(payload);
    },
    [UPDATE_ACCOUNT.FAILURE] () {},
  },
  actions: {
    authenticate(context, credentials) {
      return new Promise((resolve, reject) => {
        Axios.post('/users/authenticate/', credentials)
          .then(({ data }) => {
            const { token } = data;
            loggedInOrRegistered(context, token, resolve);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    register(context, user) {
      return new Promise((resolve, reject) => {
        Axios.post('/users/signup/', user)
          .then(({ data }) => {
            const { token } = data;
            loggedInOrRegistered(context, token, resolve);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    getUser(context) {
      if (!context.getters.isLoggedIn) {
        return;
      }

      return new Promise((resolve, reject) => {
        doAsync(context, {
          url: '/users/me',
          mutationTypes: FETCH_USER
        })
          .then(([user]) => resolve(user))
          .catch(error => reject(error));
      });
    },
    updateAccount(context, user) {
      return new Promise((resolve, reject) => {
        doAsync(context, {
          url: '/users/me',
          method: 'patch',
          data: user,
          mutationTypes: UPDATE_ACCOUNT
        })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    },
    logout(context) {
      localStorage.removeItem('token');
      context.commit(LOGOUT);
    }
  }
};
