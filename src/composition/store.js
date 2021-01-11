import { reactive, computed, readonly } from 'vue';

// 對應原本的 state
const state = reactive({
  currCity: '臺北市',
  currDistrict: '北投區',
  infoBoxSid: null,
  keywords: '',
  showModal: false,
  location: [],
  stores: [],
  // 對應原本的 getters
  cityList: computed(() => {
    return state.location.map((d) => d.name);
  }),
  districtList: computed(() => {
    return state.location.find((d) => d.name === state.currCity)?.districts || [];
  }),
  currDistrictInfo: computed(() => {
    return state.districtList.find((d) => d.name === state.currDistrict) || {};
  }),
  filteredStores: computed(() => {
    return state.keywords
      ? state.stores.filter((d) => d.name.includes(state.keywords)).slice(0, 30)
      : state.stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict);
  })
});

// 對應原本的 mutations
const setCurrCity = (val) => { state.currCity = val };
const setCurrDistrict = (val) => { state.currDistrict = val };
const setInfoBoxSid = (val) => { state.infoBoxSid = val };
const setKeywords = (val) => { state.keywords = val };
const setShowModal = (val) => { state.showModal = val };
const setLocation = (val) => { state.location = val };
const setStores = (val) => { state.stores = val };

// 對應原本的 actions
const fetchLocations = async () => {
  // 取得行政區資料
  const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
    .then((res) => res.json());

    state.location = json;
};

const fetchPharmacies = async () => {
  // 取得藥局資料
  const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
    .then((res) => res.json());

  const data = json.features.map((d) => ({
    ...d.properties,
    latitude: d.geometry.coordinates[0],
    longitude: d.geometry.coordinates[1],
  }));

  state.stores = data;
};

export default {
  state, //: readonly(state),
  setCurrCity,
  setCurrDistrict,
  setInfoBoxSid,
  setKeywords,
  setShowModal,
  setLocation,
  setStores,
  fetchLocations,
  fetchPharmacies,
};
