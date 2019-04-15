import { doAsync, createAsyncMutation } from '@/utils';

const GET_LISTS = createAsyncMutation('GET_LISTS');
const UPDATE_NAME = createAsyncMutation('UPDATE_NAME');
const CREATE_NEW_LIST = createAsyncMutation('CREATE_NEW_LIST');

export default {
  namespaced: true,
  state: {
    lists: [],
    newListId: null,
    error: ''
  },
  getters: {
    lists: state => state.lists,
    error: state => state.error
  },
  mutations: {
    [GET_LISTS.PENDING] (state) {},
    [GET_LISTS.SUCCESS] (state, payload) {
      state.lists = payload;
    },
    [GET_LISTS.FAILURE] (state, payload) {
      state.error = payload.data;
    },
    // update list name
    [UPDATE_NAME.PENDING] (state) {},
    [UPDATE_NAME.SUCCESS] (state, payload) {

    },
    [UPDATE_NAME.FAILURE] (state, payload) {
      state.error = payload.data;
    },
    // create a new list
    [CREATE_NEW_LIST.PENDING] (state) {},
    [CREATE_NEW_LIST.SUCCESS] (state, payload) {
      state.newListId = payload.id;
    },
    [CREATE_NEW_LIST.FAILURE] (state, payload) {
      state.error = payload.data;
    }
  },
  actions: {
    getUserLists(context) {
      return doAsync(context, {
        url: '/lists',
        mutationTypes: GET_LISTS
      });
    },
    updateListName(context, { id, name }) {
      return doAsync(context, {
        url: `/lists/${id}/`,
        method: 'patch',
        data: { name },
        mutationTypes: UPDATE_NAME
      });
    },
    createNewList(context, { name }) {
      return doAsync(context, {
        url: '/lists',
        method: 'post',
        data: { name },
        mutationTypes: CREATE_NEW_LIST
      });
    }
  }
};
