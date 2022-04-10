<template>
  <div id="app">
    <aside-menu />
    <mask-map />
    <light-box />
  </div>
</template>

<script>
import { provide } from 'vue';
import map from '@/composition/map';
import mapStore from '@/composition/store';

import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightbox.vue';
import maskMap from './components/maskMap.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox,
    maskMap
  },
  setup () {
    provide('mapStore', mapStore);
    provide('map', map);

    mapStore.fetchLocations();
    mapStore.fetchPharmacies();
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
