import { ref, watch, onMounted } from 'vue';
import L from 'leaflet';
import store from './store';

const ICON = {
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};

const markers = [];
const map = ref({});

const addMarker = (item) => {
  const marker = L.marker([item.longitude, item.latitude], ICON)
    .addTo(map.value)
    .bindPopup(`<h2 class="popup-name">${item.name}</h2>`);

  marker.markerId = item.id;
  marker.lng = item.longitude;
  marker.lat = item.latitude;
  markers.push(marker);
};

const clearMarkers = () => {
  markers.length = 0;
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer);
    }
  });
};

const triggerPopup = markerId => {
  const marker = markers.find((d) => d.markerId === markerId);

  map.value.flyTo(new L.LatLng(marker.lng, marker.lat), 15);
  marker.openPopup();
}

const mapInit = (element) => {

  onMounted(() => {
    map.value = L.map(element, {
      center: [25.03, 121.55],
      zoom: 14,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
      maxZoom: 18,
    }).addTo(map.value);

    watch(() => store.state.currDistrictInfo, (dist) => {
      map.value.panTo(new L.LatLng(dist.latitude, dist.longitude));
    });

    watch(() => store.state.filteredStores, (stores) => {
      clearMarkers();
      stores.forEach((element) => addMarker(element));
    });

  });
};


export default {
  triggerPopup,
  mapInit
};
