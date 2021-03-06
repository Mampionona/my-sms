import { doAsync, createAsyncMutation } from '@/async-utils';

const GET_LISTS = createAsyncMutation('GET_LISTS');
const UPDATE_NAME = createAsyncMutation('UPDATE_NAME');
const CREATE_NEW_LIST = createAsyncMutation('CREATE_NEW_LIST');
const DELETE_LIST = createAsyncMutation('DELETE_LIST');
const UPDATE_LIST = 'UPDATE_LIST';

export default {
  namespaced: true,

  state: {
    lists: [],
    newListId: null,
    error: '',
    isFetching: false
  },

  getters: {
    lists: state => state.lists,
    error: state => state.error,
    isFetching: state => state.isFetching
  },

  mutations: {
    [GET_LISTS.PENDING](state) {
      state.isFetching = true;
    },
    [GET_LISTS.SUCCESS](state, payload) {
      state.lists = payload;
      state.isFetching = false;
    },
    [GET_LISTS.FAILURE](state, payload) {
      state.error = payload ? payload.data : null;
      state.isFetching = false;
    },
    // update list name
    [UPDATE_NAME.PENDING]() {},
    [UPDATE_NAME.SUCCESS]() {},
    [UPDATE_NAME.FAILURE](state, payload) {
      state.error = payload ? payload.data : null;
    },
    // create a new list
    [CREATE_NEW_LIST.PENDING]() {},
    [CREATE_NEW_LIST.SUCCESS](state, payload) {
      state.newListId = payload.id;
    },
    [CREATE_NEW_LIST.FAILURE](state, payload) {
      state.error = payload;
    },
    // Delete a list
    [DELETE_LIST.PENDING]() {},
    [DELETE_LIST.SUCCESS]() {},
    [DELETE_LIST.FAILURE]() {},
    [UPDATE_LIST](state, payload) {
      state.lists = payload;
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
    },
    deleteList(context, listId) {
      return doAsync(context, {
        url: `/lists/${listId}/`,
        method: 'delete',
        mutationTypes: DELETE_LIST,
        shouldRetry: true
      });
    }
  }
};
