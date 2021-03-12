import { reactive, computed, readonly } from 'vue';

// 對應原本的 state
const stateRef = reactive({
  currCity: '臺北市',
  currDistrict: '北投區',
  infoBoxSid: null,
  keywords: '',
  showModal: false,
  location: [],
  stores: [],
  // 對應原本的 getters
  cityList: computed(() => {
    return stateRef.location.map((d) => d.name);
  }),
  districtList: computed(() => {
    return stateRef.location.find((d) => d.name === stateRef.currCity)?.districts || [];
  }),
  currDistrictInfo: computed(() => {
    return stateRef.districtList.find((d) => d.name === stateRef.currDistrict) || {};
  }),
  filteredStores: computed(() => {
    return stateRef.keywords
      ? stateRef.stores.filter((d) => d.name.includes(stateRef.keywords)).slice(0, 30)
      : stateRef.stores.filter((d) => d.county === stateRef.currCity && d.town === stateRef.currDistrict);
  })
});

// 對應原本的 mutations
const setCurrCity = (val) => { stateRef.currCity = val };
const setCurrDistrict = (val) => { stateRef.currDistrict = val };
const setInfoBoxSid = (val) => { stateRef.infoBoxSid = val };
const setKeywords = (val) => { stateRef.keywords = val };
const setShowModal = (val) => { stateRef.showModal = val };
const setLocation = (val) => { stateRef.location = val };
const setStores = (val) => { stateRef.stores = val };

// 對應原本的 actions
const fetchLocations = async () => {
  // 取得行政區資料
  const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
    .then((res) => res.json());

    setLocation(json);
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

  setStores(data);
};

export default {
  state: readonly(stateRef),
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
