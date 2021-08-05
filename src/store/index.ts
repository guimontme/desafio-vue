import { createStore } from 'vuex';

export default createStore({
  state: {
    sectors: [],
    locations: [],
  },
  mutations: {
    setSectors(state, payload) {
      state.sectors = payload;
    },
    setLocations(state, payload) {
      state.locations = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
