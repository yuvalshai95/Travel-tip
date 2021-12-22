export const locService = {
  getLocs,
};

const gLocs = [
  // Get from localstorage
  // {id, name, lat, lng, weather, createdAt, updatedAt}
  { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
];

function getLocs() {
  //TODO: Check  localstorage for data -> CACHE
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gLocs);
    }, 2000);
  });
}
