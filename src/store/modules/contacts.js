import Axios from "axios";

const SET_LIST_ID = 'SET_LIST_ID';
const SET_CONTACTS = 'SET_CONTACTS';

export default {
  namespaced: true,
  state: {
    listId: null,
    contactsOfList: []
  },
  getters: {
    listId: state => state.listId,
    contacts: state => state.contactsOfList
  },
  mutations: {
    [SET_LIST_ID] (state, id) {
      state.listId = id;
    },
    [SET_CONTACTS] (state, contacts) {
      state.contactsOfList = contacts;
    }
  },
  actions: {
    getContactsOfList(context, id) {
      context.commit(SET_LIST_ID, id);
      return new Promise((resolve, reject) => {
        Axios(`/contacts/lists/${id}/`)
          .then(({ data }) => {
            context.commit(SET_CONTACTS, data);
          });
      });
    }
  }
};
