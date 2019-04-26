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
    count: 0
  },

  getters: {
    listId: state => state.listId,
    contacts: state => state.contactsOfList,
    count: state => state.contactsOfList.length
  },

  mutations: {
    // set list id
    [LIST_ID](state, id) {
      state.listId = id;
    },
    // get contacts
    [GET_CONTACTS.PENDING]() {},
    [GET_CONTACTS.SUCCESS](state, payload) {
      state.contactsOfList = payload;
    },
    [GET_CONTACTS.FAILURE]() {},
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
    getContactsOfList(context, id) {
      context.commit(LIST_ID, id);
      return new Promise((resolve, reject) => {
        doAsync(context, {
          url: `/contacts/lists/${id}`,
          mutationTypes: GET_CONTACTS
        })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
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
        data: { listId, contacts }
      });
    }
  }
};
