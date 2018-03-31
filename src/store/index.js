import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import permission from './modules/permission'
import getters from './getters'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users,
    permission
  },
  getters
});

export default store;
