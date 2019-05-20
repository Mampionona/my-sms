import Axios from 'axios';
import { doAsync, createAsyncMutation } from '@/async-utils';

const LIST_ID = 'LIST_ID';
const GET_CONTACTS = createAsyncMutation('GET_CONTACTS');
const ADD_CONTACTS = createAsyncMutation('ADD_CONTACTS');
const REMOVE_CONTACT_FROM_A_LIST = createAsyncMutation('REMOVE_CONTACT_FROM_A_LIST');
const UPDATE_CONTACTS = 'UPDATE_CONTACTS';

export default {
  namespaced: true,
  state: {
    listId: null,
    contactsOfList: [],
    isFetching: false
  },

  getters: {
    listId: state => state.listId,
    contacts: state => state.contactsOfList,
    stops: (state, getters) => getters.contacts.filter(contact => contact.stop === 1),
    isFetching: state => state.isFetching
  },

  mutations: {
    // set list id
    [LIST_ID](state, id) {
      state.listId = id;
    },
    // get contacts
    [GET_CONTACTS.PENDING](state) {
      state.isFetching = true;
    },
    [GET_CONTACTS.SUCCESS](state, payload) {
      state.contactsOfList = payload;
      state.isFetching = false;
    },
    [GET_CONTACTS.FAILURE](state) {
      state.isFetching = false;
    },
    // add contact to a list
    [ADD_CONTACTS.PENDING]() {},
    [ADD_CONTACTS.SUCCESS]() {},
    [ADD_CONTACTS.FAILURE]() {},
    // remove a contact from a list
    [REMOVE_CONTACT_FROM_A_LIST.PENDING]() {},
    [REMOVE_CONTACT_FROM_A_LIST.SUCCESS]() {},
    [REMOVE_CONTACT_FROM_A_LIST.FAILURE]() {},
    [UPDATE_CONTACTS](state, payload) {
      state.contactsOfList = payload;
    }
  },

  actions: {
    getContactsOfList(context, { listId, page }) {
      context.commit(LIST_ID, listId);
      return new Promise((resolve, reject) => {
        doAsync(context, {
          url: `/contacts/lists/${listId}/${page - 1}`, // -1 cause 0 based in api
          mutationTypes: GET_CONTACTS
        })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    },
    getAllContacts(context, listId) {
      return Axios.get(`/contacts/lists/${listId}/`)
        .then(({ data }) => data);
    },
    removeContact(context, { contactId, listId }) {
      return doAsync(context, {
        url: `/contacts/${contactId}/lists/${listId}/`,
        method: 'delete',
        mutationTypes: REMOVE_CONTACT_FROM_A_LIST
      });
    },
    addContacts(context, { listId, contacts }) {
      return doAsync(context, {
        url: `/contacts/lists/${listId}/`,
        method: 'post',
        mutationTypes: ADD_CONTACTS,
        data: { listId, contacts },
        shouldRetry: true
      });
    }
  }
};
