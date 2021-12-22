import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { geocodeService } from './services/geocode.service.js';
import { weatherService } from './services/weather.service.js';

// Globals - after test - Remove
let gAddPos;

window.onload = onInit;
window.onAddLocation = onAddLocation;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.testData = testData;
window.onCopyUrl = onCopyUrl;
window.testData = testData;

function onInit() {
  mapService
    .initMap()
    .then(handleOnMap)
    .catch(() => console.log('Error: cannot init map'));
}

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onGetLocs() {
  locService.getLocs().then(locs => {
    document.querySelector('.locs').innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {

  getPosition()
    .then(pos => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
      mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    })
    .catch(err => {
      console.log('err!!!', err);
    });

}

function onPanTo() {
  console.log('Panning the Map');
  mapService.panTo({ lat: 29.575788243292692, lng: 34.93490679588882 });
}

function onSearch(evt) {
  evt.preventDefault();
  const elSearchInput = document.querySelector('input[name=search-input]');
  if (!elSearchInput.value) return;

  geocodeService.getPosBySearch(elSearchInput.value).then(pos => {
    mapService.panTo(pos);
    mapService.addMarker(pos);
  });
}

function onAddLocation(ev) {
  ev.preventDefault();
  let locationName = document.querySelector('.modal-add-location form input').value;
  if (!locationName) return;
  locService.addLocation(locationName, gAddPos);
  mapService.panTo(gAddPos);
  mapService.addMarker(gAddPos);
  document.querySelector('.modal-add-location form input').value = '';
  _toggleModal(false);
}

function handleOnMap(map) {
  map.addListener('click', mapsMouseEvent => {
    _toggleModal(true);
    const pos = mapsMouseEvent.latLng.toJSON();
    gAddPos = pos;
  });
}

function _toggleModal(isOpen) {
  document.querySelector('.modal-add-location').style.display = isOpen ? 'block' : 'none';
}

function testData() {
  console.log('working...')
  weatherService
    .getWeatherByCityName()
    .then((res) => console.log(res))
    .catch(console.log)
  console.log('working...');
  weatherService.getWeatherByCityName('barcelona').then(console.log).catch(console.log);
}


function onCopyUrl() {
  const pos = mapService.getLastPos();
  console.log('🚀 ~ file: app.controller.js ~ line 103 ~ onCopyUrl ~ pos', pos);
  //   const url = 'https://yuvalshai95.github.io/Travel-tip/index.html?';

  navigator.clipboard.writeText(
    `https://yuvalshai95.github.io/Travel-tip/index.html?lat=${pos.lat}&lng=${pos.lng}`
  );
}
