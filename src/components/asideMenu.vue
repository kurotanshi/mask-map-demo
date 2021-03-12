<template>
  <!-- aside-menu 左側欄 -->
  <div class="aside-menu">

    <div class="wraps">
      <label>
        縣市：<select v-model="currCity">
          <option
            v-for="c in cityList"
            :key="c"
          >{{ c }}</option>
        </select>
      </label>

      <label>
        行政區：<select v-model="currDistrict">
          <option
            v-for="d in districtList"
            :key="d.id"
          >{{ d.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input
          type="text"
          placeholder="請輸入關鍵字"
          v-model="currKeywords"
        >
      </label>
    </div>

    <ul class="store-lists">
      <li
        class="store-info wraps"
        v-for="s in filteredStores"
        :key="s.id"
        @click="triggerPopup(s.id)"
      >

        <h1 v-html="keywordHighlight(s.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ s.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ s.mask_child }} 個</span>
        </div>

        <div class="mask-info">
          最後更新時間: {{ s.updated }}
        </div>

        <button
          class="btn-store-detail"
          @click="openInfoBox(s.id)"
        >
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>

  </div>
</template>

<script>
import { toRefs, inject, watch, computed } from "vue";

export default {
  name: "asideMenu",
  setup() {
    const mapStore = inject('mapStore');
    const map = inject('map');

    const { triggerPopup } = map;
    const { state, setCurrCity, setCurrDistrict, setKeywords, setShowModal, setInfoBoxSid } = mapStore;

    const keywordHighlight = val => {
      return val.replace(new RegExp(state.keywords, 'g'), `<span class="highlight">${state.keywords}</span>`)
    };

    const openInfoBox = sid => {
      setShowModal(true);
      setInfoBoxSid(sid);
    }

    const currCity = computed({
      get () {
        return state.currCity;
      },
      set (value) {
        // 更換行政區回到第一頁
        setCurrCity(value);
      }
    });

    const currDistrict = computed({
      get () {
        return state.currDistrict;
      },
      set (value) {
        // 更換行政區回到第一頁
        setCurrDistrict(value);
      }
    });

    const currKeywords = computed({
      get() {
        return state.keywords;
      },
      set(value) {
        setKeywords(value);
      },
    })

    watch(() => (state.districtList), v => {
      const [arr] = v;
      setCurrDistrict(arr.name);
    });

    return {
      ...toRefs(state),
      currCity,
      currDistrict,
      currKeywords,
      triggerPopup,
      openInfoBox,
      keywordHighlight
    };
  },
};
</script>

<style>
.highlight {
  color: #f08d49;
}
</style>
