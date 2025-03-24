const form = document.querySelector("#weather_form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    data = new FormData(form);
    let weatherLocation = data.get("location");
    const weather = getWeather(weatherLocation);
    // updateScreen(weather);
});


async function getWeather(location) {
    try {
        const currentDate = new Date();
        const currentDateTimeStamp = currentDate.toISOString();
        console.log(currentDate);
        console.log(currentDateTimeStamp);
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${currentDateTimeStamp}?key=DKAVXV39P8AKUVZZAX7RTYKDW`);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        const currentConditions = data.currentConditions;
        const weather = {
            conditions: currentConditions.conditions,
            temperature : currentConditions.temp,
            humidity: currentConditions.humidity,
            wind: currentConditions.windspeed,
            windGust: currentConditions.wingust

        };
        console.log(data);
        console.log(currentConditions);

        console.log(weather);
        updateScreen(weather);
        return(weather);
    }
    catch(error) {
        console.log(error.message);
    }
}


function updateScreen(weather) {
    const tempDisplay = document.querySelector("#weatherTemp");
    tempDisplay.textContent = weather.temperature;

    const humidityDispaly = document.querySelector("#weatherHumidity");
    humidityDispaly.textContent = weather.humidity;

    const windDisplay = document.querySelector("#weatherWind");
    windDisplay.textContent = weather.wind;
}