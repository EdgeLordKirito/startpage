const sessionToken = "7e91452312aa8237e0ef35bd2093bf33";
console.log(sessionToken);

const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const fallbackCoordinates = {
    latitude: "48.20",
    longitude: "16.37"
};

function getLocation() {
    return fetch('https://freeipapi.com/api/json')
        .then(response => response.json())
        .then(locationData => {
            return {
                latitude: locationData.latitude,
                longitude: locationData.longitude
            };
        });
}

function fetchAndSaveWeather(latitude, longitude) {
    const apiUrl = `${apiBaseUrl}?lat=${latitude}&lon=${longitude}&appid=${sessionToken}&units=metric`;

    console.log(`Fetching data for: (${latitude}, ${longitude})`);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                const unknownWeather = {
                    error: 'Weather data could not be fetched.'
                };
                localStorage.setItem('weatherInfo', JSON.stringify(unknownWeather));
                return;
            }
            return response.json();
        })
        .then(weatherData => {
            if (weatherData) {
                localStorage.setItem('weatherInfo', JSON.stringify(weatherData));
            } else {
                const unknownWeather = {
                    error: 'Weather data could not be fetched.'
                };
                localStorage.setItem('weatherInfo', JSON.stringify(unknownWeather));
            }
        });
}

function fetchWeather() {
    getLocation()
        .then(({ latitude, longitude }) => {
            fetchAndSaveWeather(latitude, longitude);
        })
        .catch(() => {
            fetchAndSaveWeather(fallbackCoordinates.latitude, fallbackCoordinates.longitude);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchWeather();
});

let lastWeatherUpdate = 0;
let cachedWeather = null;

function showTimeAndWeather() {
    const date = new Date();

    let hour = date.toLocaleString("pl", { hour: "2-digit" });
    let minute = date.toLocaleString("en", { minute: "2-digit" });
    let second = date.toLocaleString("en", { second: "2-digit" });

    minute = addZero(minute);
    second = addZero(second);

    const now = Date.now();
    if (!cachedWeather || now - lastWeatherUpdate > 60000) {
        const weatherdata = parseWeatherData(getWeatherInfoFromLocalStorage());
		const temp = Math.round(weatherdata.temperature);
		console.log(temp);
        cachedWeather = {
            temperature: temp,
            icon: getCharCodeFromMap(weatherdata.icon, weatherdata.description),
        };
        lastWeatherUpdate = now;
    }

    const { temperature, icon } = cachedWeather;

    document.getElementById("date-display").innerHTML =
        ` ${hour}:${minute}:${second}&nbsp;&nbsp; | | &nbsp;&nbsp;${temperature}°C&nbsp;${icon}`;

    setTimeout(showTimeAndWeather, 0);
}

function addZero(i) {
    if (i.length < 2) i = "0" + i;
    return i;
}

function getWeatherInfoFromLocalStorage() {
    const unknownWeather = {
        error: 'Weather data could not be fetched.'
    };

    try {
        const weatherInfo = localStorage.getItem('weatherInfo');
        if (weatherInfo === null || weatherInfo === undefined) {
            return unknownWeather;
        }
        return JSON.parse(weatherInfo);
    } catch (error) {
        console.error('Error retrieving weather information:', error.message);
        return unknownWeather;
    }
}

function parseWeatherData(weatherData) {
    if (weatherData.error === 'Weather data could not be fetched.') {
        return {
            icon: '?',
            description: '?',
            temperature: '?'
        };
    }

    const icon = weatherData.weather[0].icon;
    const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;

    return {
        icon: icon || '?',
        description: description || '?',
        temperature: temperature || '?'
    };
}

function updateWeatherChar(input) {
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= 6 && hour < 20;
    const correctChar = isDay ? 'd' : 'n';

    const currentChar = input.charAt(2);
    if (currentChar !== correctChar) {
        return input.slice(0, 2) + correctChar;
    }
    return input;
}

function createWeatherMap() {
    const charCodeMap = new Map([
        ['01d', ''],
        ['01n', ''],
        ['02d', ''],
        ['02n', ''],
        ['03d', ''],
        ['03n', ''],
        ['04d', ''],
        ['04n', ''],
        ['09d', ''],
        ['09n', ''],
        ['10d', ''],
        ['10n', ''],
        ['11d', ''],
        ['11n', ''],
        ['13d', ''],
        ['13n', ''],
        ['50d', ''],
        ['50n', ''],
    ]);
    charCodeMap.default = '?';
    return charCodeMap;
}

function createSpecialWeatherMap() {
    const specialWeatherMap = new Map([
        ['mist', ''],
        ['smoke', ''],
        ['haze', ''],
        ['sand/dust whirls', ''],
        ['fog', ''],
        ['sand', ''],
        ['dust', ''],
        ['squalls', ''],
        ['tornado', '󰼸'],
    ]);
    specialWeatherMap.default = '?';
    return specialWeatherMap;
}

function getCharCodeFromMap(code, description) {
    const weatherMap = createWeatherMap();
    if ((code === '50d' || code === '50n') && description) {
        const specialWeatherMap = createSpecialWeatherMap();
        return specialWeatherMap.get(description) || specialWeatherMap.default;
    }
    const correctedCode = updateWeatherChar(code);
    return weatherMap.get(correctedCode) || weatherMap.default;
}

showTimeAndWeather();
