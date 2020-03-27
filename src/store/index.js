import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    currCity: '臺北市',
    currDistrict: '北投區',
    infoBoxSid: null,
    keywords: '',
    showModal: false,
    location: [],
    stores: [],
  },
  mutations: {
    setcurrCity(state, payload) {
      state.currCity = payload;
    },
    setcurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setKeywords(state, payload) {
      state.keywords = payload;
    },
    setInfoBoxSid(state, payload) {
      state.infoBoxSid = payload;
    },
    setshowModal(state, payload) {
      state.showModal = payload;
    },
    setAreaLocation(state, payload) {
      state.location = payload;
    },
    setStores(state, payload) {
      state.stores = payload;
    },
  },
  getters: {
    cityList(state) {
      // 城市
      return state.location.map((d) => d.name);
    },
    districtList(state) {
      // 行政區
      return state.location.find((d) => d.name === state.currCity)?.districts || [];
    },
    currDistrictInfo(state, getters) {
      // 行政區資訊
      return getters.districtList.find((d) => d.name === state.currDistrict) || {};
    },
    filteredStores(state) {
      // 依行政區分組
      const { stores } = state;

      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords)).slice(0, 30)
        : stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict);
    },
  },
  actions: {
    async fetchLocations({ commit }) {
      // 取得行政區資料
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json());
      commit('setAreaLocation', json);
    },
    async fetchPharmacies({ commit }) {
      // 取得藥局資料
      const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then((res) => res.json());

      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));
      commit('setStores', data);
    },
  },
  modules: {
  },
});
