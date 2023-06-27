import { createStore } from 'vuex';

export default createStore({
  state: {
    id: '',
    password: ''
  },
  mutations: {
    setId(state, id) {
      state.id = id;
      localStorage.setItem('id',id)
    },
    setPassword(state, password){
      state.password = password;
      localStorage.setItem('password',password)
    },
  },
  actions: {},

});
