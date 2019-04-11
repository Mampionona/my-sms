import Axios from "axios";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token')
  },
  getters: {
    token: state => state.token,
    isLoggedIn: state => !!state.token
  },
  mutations: {
    // mutations
  },
  actions: {
    authenticate(context, credentials) {
      return new Promise((resolve, reject) => {
        Axios.post('/users/authenticate/', credentials)
          .then(data => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    register(context, user) {
      return new Promise((resolve, reject) => {
        Axios.post('/users/signup/', user)
          .then(data => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    }
  }
};
