import Axios from "axios";

const SET_LISTS = 'SET_LISTS';

export default {
  namespaced: true,
  state: {
    lists: []
  },
  getters: {
    lists: state => state.lists
  },
  mutations: {
    [ SET_LISTS ] (state, lists) {
      state.lists = lists;
    }
  },
  actions: {
    getUserLists(context) {
      return new Promise((resolve, reject) => {
        Axios('/lists')
          .then(({ data }) => {
            context.commit(SET_LISTS, data);
            resolve(data);
          });
      });
    },
    updateListName(context, { id, name }) {
      return new Promise((resolve, reject) => {
        Axios.patch(`/lists/${id}/`, { name });
      });
    }
  }
};
