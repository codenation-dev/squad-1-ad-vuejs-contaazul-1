import Vue from 'vue';
import Vuex from 'vuex';
import Persistence from 'vuex-persist';
import { getLogs } from '@/services/logs';
import _ from "lodash";

Vue.use(Vuex);

const types = {
  LOGIN: 'LOGIN',
  LOGS: 'LOGS',
  ORDER: 'ORDER',
  ENVIROMENT: 'ENVIROMENT',
  SEARCH: 'SEARCH',
  FILTERSEARCH: 'FILTERSEARCH'
};

const local = new Persistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    user: {},
    logs: [],
    configs: {
        orderBy: "date",
        order: "desc",
        inputBusca: null,
        filterBusca: null,
    },
    orderLevel: ["error", "warning", "debug"],
    orderEnviroment: [],
    computedLogs: [],
  },

  mutations: {
    [types.LOGIN](state, user) {
      state.user = user;
    },

    [types.LOGS](state, logs) {
      state.logs = logs;
    },

    [types.SEARCH](state, search){
      state.configs.inputBusca = search;
    },

    [types.FILTERSEARCH](state, filter){
      state.configs.filterBusca = filter;
    },

    [types.ORDER](state, order) {
      state.configs.orderBy = order;
      if (state.configs.order == "desc") {
        state.configs.order = "asc";
      } else {
        state.configs.order = "desc";
      }
    },

    [types.ENVIROMENT](state, order) {
      state.configs.orderBy = "environment";
      state.orderEnviroment = order;
    }
  },

  actions: {
    login({ commit }, user) {
      return commit(types.LOGIN, user);
    },

    loadLogs({commit}) {
      return getLogs().then(({data}) => {
        commit(types.LOGS, data);  
      })
    },

    orderBy({commit}, order) {
      return commit(types.ORDER, order);
    },

    orderByEnviroment({commit}, order) {
      return commit(types.ENVIROMENT, order);
    },

    search({commit}, search) {
      return commit(types.SEARCH, search);
    },

    changeFilterSearch({commit}, filter) {
      return commit(types.FILTERSEARCH, filter)
    },

  },

  getters: {
    getUser(state) {
      return state.user;
    },

    getComputedLogs(state) {
      if (state.configs.orderBy == "level") {
        if (state.configs.order == "desc") {
          state.computedLogs = _.sortBy(state.logs, logs => {
            return state.orderLevel.indexOf(logs.level);
          });
        } else {
          const arrayAux = _.sortBy(state.logs, logs => {
            return state.orderLevel.indexOf(logs.level);
          });
          state.computedLogs = arrayAux.reverse();
        }
      } else if (state.configs.orderBy == "environment") {
        state.computedLogs = _.sortBy(state.logs, logs => {
          return state.orderEnviroment.indexOf(logs.environment);
        });
      } else {
        state.computedLogs = _.orderBy(
          state.logs,
          state.configs.orderBy,
          state.configs.order
        );
      }
      if (_.isEmpty(state.configs.inputBusca)) {
        return state.computedLogs;
      }
      if (_.isEmpty(state.configs.filterBusca)) {
        return _.filter(
          state.computedLogs,
          log =>
            log.level
              .toLowerCase()
              .indexOf(state.configs.inputBusca.toLowerCase()) >= 0 ||
            log.description
              .toLowerCase()
              .indexOf(state.configs.inputBusca.toLowerCase()) >= 0 ||
            log.origin
              .toLowerCase()
              .indexOf(state.configs.inputBusca.toLowerCase()) >= 0 ||
            log.environment
              .toLowerCase()
              .indexOf(state.configs.inputBusca.toLowerCase()) >= 0 ||
            log.date.indexOf(state.configs.inputBusca) >= 0 ||
            log.events.toString().indexOf(state.configs.inputBusca) >= 0
        );
      } else {
        if (state.configs.filterBusca == "level") {
          return _.filter(
            state.computedLogs,
            log =>
              log.level
                .toLowerCase()
                .indexOf(state.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (state.configs.filterBusca == "description") {
          return _.filter(
            state.computedLogs,
            log =>
              log.description
                .toLowerCase()
                .indexOf(state.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (state.configs.filterBusca == "origin") {
          return _.filter(
            state.computedLogs,
            log =>
              log.origin
                .toLowerCase()
                .indexOf(state.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (state.configs.filterBusca == "environment") {
          return _.filter(
            state.computedLogs,
            log =>
              log.environment
                .toLowerCase()
                .indexOf(state.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (state.configs.filterBusca == "date") {
          return _.filter(
            state.computedLogs,
            log => log.date.indexOf(state.configs.inputBusca) >= 0
          );
        } else {
          return _.filter(
            state.computedLogs,
            log => log.events.toString().indexOf(state.configs.inputBusca) >= 0
          );
        }
      }
    }
  },

  plugins: [
    local.plugin,
  ],
});