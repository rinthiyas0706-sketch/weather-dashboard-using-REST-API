const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const message = document.getElementById("message");
    const weatherCard = document.getElementById("weatherCard");

    if(city === ""){
        message.innerHTML = "Please enter a city name";
        weatherCard.style.display = "none";
        return;
    }

    try{

        message.innerHTML = "Loading weather data...";
        weatherCard.style.display = "none";

        const geoURL =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

        const geoResponse = await fetch(geoURL);

        if(!geoResponse.ok){
            throw new Error("Failed to fetch location data");
        }

        const geoData = await geoResponse.json();

        if(!geoData.results){
            message.innerHTML = "City not found";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;
        const country = geoData.results[0].country;

        const weatherURL =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const weatherResponse = await fetch(weatherURL);

        if(!weatherResponse.ok){
            throw new Error("Failed to fetch weather data");
        }

        const weatherData = await weatherResponse.json();

        document.getElementById("cityName").innerHTML =
        `${cityName}, ${country}`;

        document.getElementById("temperature").innerHTML =
        weatherData.current_weather.temperature + " °C";

        document.getElementById("windspeed").innerHTML =
        weatherData.current_weather.windspeed + " km/h";

        document.getElementById("winddirection").innerHTML =
        weatherData.current_weather.winddirection + "°";

        document.getElementById("weathercode").innerHTML =
        weatherData.current_weather.weathercode;

        document.getElementById("time").innerHTML =
        weatherData.current_weather.time;

        message.innerHTML = "Weather data loaded successfully";

        weatherCard.style.display = "block";

    }

    catch(error){

        message.innerHTML =
        "Error: Unable to fetch weather information";

        weatherCard.style.display = "none";

        console.error(error);
    }
}
