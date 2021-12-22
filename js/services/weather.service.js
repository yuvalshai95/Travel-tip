export const weatherService = {
    getWeatherByCityName,
};

const API_KEY = '1c6f9cf9c2277dc82a9516bc77991393';

function getWeatherByCityName() {
    // console.log('cityName:', cityName);
    // console.log('API_KEY:', API_KEY);
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=32.0749831&lon=34.9120554&appid=1c6f9cf9c2277dc82a9516bc77991393';
    return axios.get(url)
        .then(res => {
            console.log('a');
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log('not available');
            throw err
        })
}
