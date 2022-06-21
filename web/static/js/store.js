export default new Vuex.Store({
  state: {
    loaded: false,
    sync: {},
    weather: {}
  },
  mutations: {
    updateLoaded(state, status) {
      state.loaded = status;
    },
    updateSync(state, payload) {
      state.sync = payload;
    },
    updateWeather(state, payload) {
      state.weather = payload;
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
    },
    fetchWeather({commit}) {
      axios
          .get('/weather')
          .then((x) => {
            commit('updateWeather', x.data);
          })
          .catch((e) => {
            console.error(e);
          });
    }
  }
});
