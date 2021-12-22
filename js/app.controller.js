import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { geocodeService } from './services/geocode.service.js';
import { weatherService } from './services/weather.service.js'

// Globals - after test - Remove
let gAddPos;



window.onload = onInit;
// window.onAddMarker = onAddMarker;
window.onAddLocation = onAddLocation;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.testData = testData;

function onInit() {
  mapService
    .initMap()
    .then(addMapEvent)
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// function onAddMarker() {
//   // Show-modal
//   document.querySelector('.modal-add-location').hidden = false;

//   //DANIEL
//   // TODO: Need to get location for marker
//   //TODO: Change hard coded location to be dynamic from user clicks
//   // gMap.panTo(Lat,Lng);
//   // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
// }

function onGetLocs() {
  locService.getLocs().then(locs => {
    console.log('Locations:', locs);
    document.querySelector('.locs').innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  // TODO: add searched location to gLoc ???
  getPosition()
    .then(pos => {
      //   console.log('User position is:', pos.coords);
      //   document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;

      // Go to user location
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
      // Add marker on user location
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
    console.log('pos from controller', pos);
    mapService.panTo(pos.lat, pos.lng);
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
  _toggleModal(false)
}


// TODO:NEED TO SPLIT FUNCTION
function addMapEvent(map) {
  map.addListener('click', (mapsMouseEvent) => {
    _toggleModal(true);
    const pos = mapsMouseEvent.latLng.toJSON();
    gAddPos = pos;
  })
}



function _toggleModal(isOpen) {
  document.querySelector('.modal-add-location').style.display = (isOpen) ? 'block' : 'none';
}



function testData() {
  console.log('working...')
  weatherService
    .getWeatherByCityName('barcelona')
    .then(console.log)
    .catch(console.log)

}
