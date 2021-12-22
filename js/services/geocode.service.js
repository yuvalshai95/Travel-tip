export const geocodeService = {
  getPosBySearch,
};

const API_KEY = 'AIzaSyD-_tvMJRHuF32tR3CeTDEZ1hH06eu53hs';
// After project is in github pages add the github pages link to websites restriction

function getPosBySearch(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
  return axios.get(url).then(res => {
    console.log('res.data', res.data.results[0].geometry.location);
    return res.data.results[0].geometry.location;
  });
}
