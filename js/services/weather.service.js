export const weatherService = {
    getWeatherByCityName,
};

const API_KEY = '1c6f9cf9c2277dc82a9516bc77991393';

function getWeatherByCityName(cityName) {
    console.log('cityName:', cityName);
    console.log('API_KEY:', API_KEY);

    const url = `api.openweathermap.org/data/2.5/weather?q=${cityName}'&appid=${API_KEY}`;
    return axios.get(url)
        .then(res => res.data)
        .catch(err => {
            console.log('not available');
            throw err
        })
}
