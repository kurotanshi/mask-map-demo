<template>
  <div id="app">
    <aside-menu @triggerMarkerPopup="openPopup" ref="menu" />
    <mask-map ref="map" />
    <light-box />
  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';
import maskMap from './components/maskMap.vue';
import lightBox from './components/lightbox.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
    maskMap,
    lightBox,
  },
  methods: {
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    },
  },
  mounted() {
    this.$store.dispatch('fetchLocations');
    this.$store.dispatch('fetchPharmacies');
  },
};
</script>

<style lang="scss">
#app {
  display: block;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100vh;

  * {
    box-sizing: border-box;
  }

  > div {
    float: left;
  }
}

.aside-menu {
  width: 25%;
  height: 100%;
  border-right: 1px solid #aaa;
  background-color: #f1f1f1;
  overflow-y: scroll;
}

.mask-map {
  position: relative;
  width: 75%;
  height: 100%;
  background-color: #aaa;
  z-index: 10;

  &.full {
    width: 100%;
  }
}
</style>
