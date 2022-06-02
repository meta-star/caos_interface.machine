export default new Vuex.Store({
  state: {
    loaded: false,
    sync: {}
  },
  mutations: {
    updateLoaded(state, status) {
      state.loaded = status;
    },
    updateSync(state, payload) {
      state.sync = payload;
    }
  },
  actions: {
    doSync({commit}) {
      axios
          .get('/state')
          .then((x) => {
            commit('updateSync', x.data);
            commit('updateLoaded', true);
          })
          .catch((e) => {
            commit('updateLoaded', null);
            console.error(e);
          });
    }
  }
});
