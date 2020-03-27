<template>
  <div class="aside-menu">

    <div class="wraps">
      <label>
        縣市：
        <select v-model="currCity">
          <option v-for="c in cityList" :key="c">{{ c }}</option>
        </select>
      </label>

      <label>
        行政區：
        <select v-model="currDistrict">
          <option v-for="d in districtList" :key="d.id">{{ d.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model.trim="keywords">
      </label>
    </div>

    <ul class="store-lists">
      <li class="store-info wraps"
        v-for="s in filteredStores" :key="s.id"
        @click="$emit('triggerMarkerPopup', s.id)">
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

        <button class="btn-store-detail" @click="openInfoBox(s.id)">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>

      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'asideMenu',
  computed: {
    keywords: {
      get() {
        return this.$store.state.keywords;
      },
      set(value) {
        this.$store.commit('setKeywords', value);
      },
    },
    showModal: {
      get() {
        return this.$store.state.showModal;
      },
      set(value) {
        this.$store.commit('setshowModal', value);
      },
    },
    currCity: {
      get() {
        return this.$store.state.currCity;
      },
      set(value) {
        this.$store.commit('setcurrCity', value);
      },
    },
    currDistrict: {
      get() {
        return this.$store.state.currDistrict;
      },
      set(value) {
        this.$store.commit('setcurrDistrict', value);
      },
    },
    infoBoxSid: {
      get() {
        return this.$store.state.infoBoxSid;
      },
      set(value) {
        this.$store.commit('setInfoBoxSid', value);
      },
    },
    cityList() {
      return this.$store.getters.cityList;
    },
    districtList() {
      return this.$store.getters.districtList;
    },
    filteredStores() {
      return this.$store.getters.filteredStores;
    },
  },
  watch: {
    districtList(v) {
      const [arr] = v;
      this.currDistrict = arr.name;
    },
  },
  methods: {
    openInfoBox(sid) {
      this.showModal = true;
      this.infoBoxSid = sid;
    },
    keywordHighlight(val) {
      return val.replace(new RegExp(this.keywords, 'g'), `<span class="highlight">${this.keywords}</span>`);
    },
  },
};
</script>


<style scoped lang="scss">
label {
  position: relative;
  margin-right: 2em;
  display: block;
  font-size: 1.2rem;
  line-height: 2;
}

select {
  position: absolute;
  margin-top: 0.3rem;
  left: 6rem;
  font-size: 1.2rem;
  width: auto;
  min-width: 110px;
}

input {
  padding: 2px 8px;
  font-size: 1.2rem;
  line-height: 2;
  width: 110%;
}

.wraps {
  padding: 1em;
  border-bottom: 1px solid #666;
}

.store-info {
  position: relative;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1.8;
  background-color: #fff;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.3em;
  }

  .mask-info{
    position: relative;
    > span {
      position: absolute;
      left: 1.8rem;
    }
  }

  &::v-deep .highlight {
    color: #f08d49;
  }

  &:hover {
    background-color: #eee;
  }

  .btn-store-detail {
    position: absolute;
    display: block;
    cursor: pointer;
    width: 80px;
    height: 80px;
    text-align: center;
    right: 1.2rem;
    top: 1.5rem;
    font-size: .8rem;

    > i {
      display: block;
      font-size: 2rem;
      margin-bottom: 5px;
    }
  }

}
</style>
