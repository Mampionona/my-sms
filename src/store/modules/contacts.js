import Axios from "axios";

const SET_LIST_ID = 'SET_LIST_ID';
const SET_CONTACTS = 'SET_CONTACTS';
const SET_CONTACTS_COUNT = 'SET_CONTACTS_COUNT';

export default {
  namespaced: true,
  state: {
    listId: null,
    contactsOfList: [],
    count: 0
  },
  getters: {
    listId: state => state.listId,
    contacts: state => state.contactsOfList,
    count: state => state.count
  },
  mutations: {
    [SET_LIST_ID] (state, id) {
      state.listId = id;
    },
    [SET_CONTACTS] (state, contacts) {
      state.contactsOfList = contacts;
    },
    [SET_CONTACTS_COUNT] (state, count) {
      state.count = count;
    }
  },
  actions: {
    getContactsOfList(context, id) {
      context.commit(SET_LIST_ID, id);
      return new Promise((resolve, reject) => {
        Axios(`/contacts/lists/${id}/`)
          .then(({ data }) => {
            context.commit(SET_CONTACTS_COUNT, data.length);
            context.commit(SET_CONTACTS, data);
          });
      });
    },
    removeContact(context, { contactId, listId }) {
      return new Promise((resolve, reject) => {
        Axios.delete(`/contacts/${contactId}/lists/${listId}/`)
          .then(() => {
            resolve();
          });
      });
    }
  }
};
