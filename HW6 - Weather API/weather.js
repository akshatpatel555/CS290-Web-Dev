document.addEventListener('DOMContentLoaded', () => {
    const compareBtn = document.getElementById('compare-btn');
    compareBtn.addEventListener('click', compareWeather);

    function compareWeather() {
        const city1 = document.getElementById('city1').value;
        const state1 = document.getElementById('state1').value;
        const city2 = document.getElementById('city2').value;
        const state2 = document.getElementById('state2').value;
        const units = document.getElementById('units').value;
        const errorMessage = document.getElementById('error-message');

        if (!city1 || !city2) {
            errorMessage.textContent = "Both city names must be provided.";
            return;
        }

        errorMessage.textContent = "";
        fetchWeather(city1, state1, units, 'forecast1');
        fetchWeather(city2, state2, units, 'forecast2');
    }

    function fetchWeather(city, state, units, elementId) {
        const apiKey = 'e2896c7af6f8f1e0cfd9ec56da35c2f2';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&units=${units}&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => displayWeather(data, elementId))
            .catch(error => {
                document.getElementById('error-message').textContent = "Error fetching weather data.";
                console.error('Error fetching weather data:', error);
            });
    }

    function displayWeather(data, elementId) {
        const forecastElement = document.getElementById(elementId);
        const groupedData = groupByDate(data.list);

        const days = Object.keys(groupedData).slice(0, 5).map(date => {
            const temps = groupedData[date].map(entry => entry.main.temp);
            return {
                date: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
                maxTemp: Math.max(...temps),
                minTemp: Math.min(...temps),
                description: groupedData[date][0].weather[0].description
            };
        });

        forecastElement.innerHTML = `
            <h2>Weather Forecast for ${data.city.name}, ${data.city.country}</h2>
            ${days.map(day => `
                <div class="day">
                    <p><strong>${day.date}</strong></p>
                    <p>Max Temperature: ${day.maxTemp}°</p>
                    <p>Min Temperature: ${day.minTemp}°</p>
                    <p>Rain Chance: </p><div>${getRainChance(day.description)}</div>
                    <img src="images/${getWeatherImage(day.description)}.png" alt="${day.description}">
                </div>
            `).join('')}
        `;
    }

    function groupByDate(data) {
        return data.reduce((acc, entry) => {
            const date = entry.dt_txt.split(' ')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(entry);
            return acc;
        }, {});
    }

    function getWeatherImage(description) {
        if (description.includes('clear')) {
            return 'sunny';
        } else if (description.includes('clouds')) {
            return 'cloudy';
        } else if (description.includes('rain')) {
            return 'rainy';
        } else if (description.includes('partially cloudy')) {
            return 'partial';
        } else {
            return 'partial';
        }
    }

    function getRainChance(description) {
        if (description.includes('rain')) {
            return '100%';
        } else if (description.includes('clouds')) {
            return '50%';
        } else {
            return '0%';
        }
    }
});
