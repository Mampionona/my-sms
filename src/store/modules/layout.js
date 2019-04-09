const SET_LAYOUT = 'SET_LAYOUT';

export default {
  namespaced: true,
  state: {
    layout: 'default'
  },
  getters: {
    layout: state => state.layout
  },
  mutations: {
    [SET_LAYOUT] (state, layout) {
      state.layout = layout;
    }
  },
  actions: {
    setLayout (context, layout) {
      context.commit(SET_LAYOUT, layout);
    }
  }
};
