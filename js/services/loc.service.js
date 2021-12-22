import { storageService } from './storage.service.js'
export const locService = {
  getLocs,
  addLocation
};

const STORAGE_KEY = 'locationsDB'
let gNextId = 101;
const gLocs = [
  // {id, name, lat, lng, weather, createdAt, updatedAt}
  { id: gNextId++, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { id: gNextId++, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
];

function getLocs() {
  //DONE: Check  localstorage for data -> CACHE
  console.log('FROM CACHE');
  const locations = storageService.load(STORAGE_KEY);
  if (locations.length) return Promise.resolve(locations);

  console.log('FROM API');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gLocs);
    }, 2000);
  });
}



function _createLocation(name, pos,) {
  const newLocation = {
    id: gNextId++,
    name,
    pos,
    createdAt: Date.now(),
    updatedAt: null
  }
  gLocs.unshift(newLocation);
  storageService.save(STORAGE_KEY, gLocs);
}

function addLocation(location) {
  // TODO: GET POSITION FROM YUVAL DATA (GEO CODE API)
  // const pos = getPosByName()
  // FOR NOW
  const pos = { lat: 36.054523, lng: 33.1545412 }
  _createLocation(location, pos)
}
