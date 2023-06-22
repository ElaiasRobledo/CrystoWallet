import { createStore } from 'vuex';

export default createStore({
  state: {
    id: localStorage.getItem('id'),
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
  },
  actions: {},
});
