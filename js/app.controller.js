import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onAddLocation = onAddLocation;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

const map = mapService.getMap();
console.log('map:', map);





function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  // Show-modal
  document.querySelector('.modal-add-location').hidden = false;


  //DANIEL
  // TODO: Need to get location for marker
  //TODO: Change hard coded location to be dynamic from user clicks
  // gMap.panTo(Lat,Lng);
  // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then(locs => {
    console.log('Locations:', locs);
    document.querySelector('.locs').innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  //YUVAL
  //TODO: After we get position(promise was ok)
  //call mapService.panTo(Lat,Lng) with user position
  // TODO: add searched location to gLoc ???
  //TODO: save location to localstorage
  getPosition()
    .then(pos => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch(err => {
      console.log('err!!!', err);
    });
}





function onPanTo() {
  console.log('Panning the Map');
  mapService.panTo({ lat: 29.575788243292692, lng: 34.93490679588882 });
}




function onAddLocation(ev) {
  ev.preventDefault();
  let locationName = document.querySelector('.modal-add-location form input').value;
  if (!locationName) return;
  locService.addLocation(locationName);
  mapService.panTo({ lat: 36.054523, lng: 38.1545412 })
  mapService.addMarker({ lat: 36.054523, lng: 38.1545412 });
  document.querySelector('.modal-add-location form input').value = '';
}



// function toggleModal() {

// }

