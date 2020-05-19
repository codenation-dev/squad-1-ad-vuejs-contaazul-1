import Vue from 'vue';
import Vuex from 'vuex';
import Persistence from 'vuex-persist';

Vue.use(Vuex);

const types = {
  LOGIN: 'LOGIN',
};

const local = new Persistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    user: {},
  },

  mutations: {
    [types.LOGIN](state, user) {
      state.user = user;
    },
  },

  actions: {
    login({ commit }, user) {
      return commit(types.LOGIN, user);
    }
  },

  getters: {
    getUser(state) {
      return state.user;
    }
  },

  plugins: [
    local.plugin,
  ],
});