import { storageService } from './storage.service.js';

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getLastPos,
};

let gMap;
let gLastClickedPos;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLat = urlParams.get('lat');
  const urlLng = urlParams.get('lng');
  if (urlLng && urlLat) {
    lat = +urlLat;
    lng = +urlLng;
  }

  return _connectGoogleApi()
    .then(() => {
      console.log('google available');
      gMap = new google.maps.Map(document.querySelector('#map'), {
        center: { lat, lng },
        zoom: 15,
      })
    })
    .then(() => {
      gLastClickedPos = { lat, lng };
      addMarker(gLastClickedPos)
      return gMap;
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'location',
  });
  return marker;
}

function panTo({ lat, lng }) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gLastClickedPos = { lat, lng };
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = 'AIzaSyBD8XxVH255L43qxo4xm3H6mhtJOQZ-EmM';
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}

function getLastPos() {
  return gLastClickedPos;
}
