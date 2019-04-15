import { doAsync, createAsyncMutation } from '@/utils';

const LIST_ID = 'LIST_ID';
const CONTACTS_COUNT = 'CONTACTS_COUNT';
const GET_CONTACTS = createAsyncMutation('GET_CONTACTS');

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
    [LIST_ID] (state, id) {
      state.listId = id;
    },
    [CONTACTS_COUNT](state, count) {
      state.count = count;
    },
    [GET_CONTACTS.PENDING] (state) {},
    [GET_CONTACTS.SUCCESS] (state, payload) {
      state.contactsOfList = payload;
    },
    [GET_CONTACTS.FAILURE] (state) {}
  },
  actions: {
    getContactsOfList(context, id) {
      context.commit(LIST_ID, id);
      // return new Promise((resolve, reject) => {
      //   Axios(`/contacts/lists/${id}/`)
      //     .then(({ data }) => {
      //       context.commit(CONTACTS_COUNT, data.length);
      //       context.commit(SET_CONTACTS, data);
      //     });
      // });

      doAsync(context, {
        url: `/contacts/lists/${id}`,
        mutationTypes: GET_CONTACTS
      });
    },
    removeContact(context, { contactId, listId }) {
      // return new Promise((resolve, reject) => {
      //   Axios.delete(`/contacts/${contactId}/lists/${listId}/`)
      //     .then(() => {
      //       resolve();
      //     });
      // });
    }
  }
};
