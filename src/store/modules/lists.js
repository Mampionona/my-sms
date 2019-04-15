import { doAsync, createAsyncMutation } from '@/utils';

const GET_LISTS = createAsyncMutation('GET_LISTS');
const UPDATE_NAME = createAsyncMutation('UPDATE_NAME');

export default {
  namespaced: true,
  state: {
    lists: []
  },
  getters: {
    lists: state => state.lists
  },
  mutations: {
    [GET_LISTS.PENDING] (state) {},
    [GET_LISTS.SUCCESS] (state, payload) {
      state.lists = payload;
    },
    [GET_LISTS.FAILURE] (state) {},
    [UPDATE_NAME.PENDING] (state) {},
    [UPDATE_NAME.SUCCESS] (state, payload) {},
    [UPDATE_NAME.FAILURE] (state, payload) {}
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
    }
  }
};
