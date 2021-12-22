export const weatherService = {
    getWeatherByCityName,
};

const API_KEY = '1c6f9cf9c2277dc82a9516bc77991393';

function getWeatherByCityName() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=32.0749831&lon=34.9120554&appid=1c6f9cf9c2277dc82a9516bc77991393';
    return axios.get(url)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log('not available');
            throw err
        })
}
