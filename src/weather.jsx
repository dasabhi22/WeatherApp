import React, { useState } from "react";
import search_icon from './assets/search.png'
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import drizzle_icon from './assets/drizzle.png'
import humidity_icon from './assets/humidity.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import wind_icon from './assets/wind.png'

const iconMapping = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
};

function Weather() {
    const [wicon, setwicon] = useState(cloud_icon);
    const [weatherData, setWeatherData] = useState({
        humidity: "N/A",
        windSpeed: "N/A",
        temperature: "N/A",
        description: "N/A",
        location: "N/A",
    });

    const api_key = "b3a90706c0d943610a8ebbcec209f29c";

    function handleKeyDown(event){
        if(event.key === "Enter"){
            search();
        }
    }

    async function search() {
        const element = document.getElementsByClassName("cityName");
        if (element[0].value === "") {
            return 0;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("API Response:", data);

            const { main: { humidity, temp: temperature }, wind: { speed: windSpeed }, weather: [{ main, description }], name: location } = data;

            setWeatherData({
                humidity: `${humidity}%`,
                windSpeed: `${Math.floor(windSpeed)} km/h`,
                temperature: `${Math.floor(temperature)} °C`,
                description,
                location,
            });

            setwicon(iconMapping[data.weather[0].icon] || clear_icon);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // Handle error, maybe show a message to the user
        }
    }

    return (
        <div className="container">
            <div className="tpbar">
                <input type="text" className="cityName" placeholder="Search" title="Search" onKeyDown={handleKeyDown}></input>
                <div className="search-icon" onClick={search} >
                    <img src={search_icon} alt="search" title="Search"></img>
                </div>
            </div>
            <div className="weather-img">
                <img src={wicon} alt=""></img>
            </div>
            <div className="temp">{weatherData.temperature}</div>
            <div className="description">{weatherData.description}</div>
            <div className="location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon"></img>
                    <div className="data">
                        <div className="humidity">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon"></img>
                    <div className="data">
                        <div className="wind">{weatherData.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
