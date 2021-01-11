<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script>
import L from 'leaflet';
import { inject } from "vue";

export default {
  name: 'maskMap',
  setup () {
    const map = inject('map');
    map.mapInit('mask-map');
  }
};
</script>

