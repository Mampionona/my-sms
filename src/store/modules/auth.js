import Axios from "axios";

const SET_USER = 'SET_USER';
const SET_TOKEN = 'SET_TOKEN';
const LOGOUT = 'LOGOUT';

function loggedInOrRegistered(context, token, resolve) {
  // update state
  context.commit(SET_TOKEN, token);
  // store the generated token
  localStorage.setItem('token', token);
  // add authorization to axios
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
    user: state => state.user
  },
  mutations: {
    // mutations
    [ SET_USER ] (state, user) {
      state.user = user;
    },
    [ SET_TOKEN ] (state, token) {
      state.token = token;
    },
    [ LOGOUT ] (state) {
      state.user = null;
      state.token = null;
    }
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
        Axios('/users/me/')
          .then(({ data }) => {
            const [ user ] = data;
            context.commit(SET_USER, user);
            resolve(user);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    logout(context) {
      localStorage.removeItem('token');
      context.commit(LOGOUT);
    }
  }
};
