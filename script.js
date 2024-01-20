const apiKey = '1fbb352bc8082cdb0fedd9d28eafc4f4';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const cityInput = document.getElementById('city');
    const cityName = cityInput.value;

    if (!cityName) {
        // If no city is entered, try to get weather for the user's current location
        getCurrentLocationWeather();
    } else {
        // If a city is entered, get weather for that city
        getWeatherByCity(cityName);
    }
}

function getCurrentLocationWeather() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    displayWeather(data);
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            }
        }, (error) => {
            console.error('Error getting user location:', error);
            alert('Error getting user location. Please enter a city manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser. Please enter a city manually.');
    }
}

async function getWeatherByCity(cityName) {
    const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}
