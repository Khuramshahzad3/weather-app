import React, { useState } from "react";
import "./Weather.css";
import clear_icon from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import searchimg from "../Assets/search.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";

const Weather = () => {
    const [wicon, setwicon] = useState(cloud)
    let api_key = "34ea8bf81f51edd2b25bacf32a350ab3";

    const search = async () => {
        const element = document.getElementsByClassName("inputcity");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url)
        let data = await response.json()
        const humidity = document.getElementsByClassName("humidity_percent")
        const wind = document.getElementsByClassName("wind_speed")
        const temperature = document.getElementsByClassName("weather_temp")
        const location = document.getElementsByClassName("weather_location")

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " KM/H";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "C";
        location[0].innerHTML = data.name;
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setwicon(clear_icon)
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setwicon(cloud)
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setwicon(drizzle)
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setwicon(drizzle)
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setwicon(rain)
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setwicon(rain)
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setwicon(snow)
        }
        else {
            setwicon(clear_icon)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input
                    type="text"
                    className="inputcity"
                    placeholder="Search"
                    onKeyPress={handleKeyPress} // Add key press event listener
                />
                <div type="submit" className="search_icon" onClick={search}>
                    <img src={searchimg} alt="" />
                </div>
            </div>
            <div className="weather_image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather_temp">24 C</div>
            <div className="weather_location">London</div>
            <div className="data_container">
                <div className="element">
                    <img src={humidity} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity_percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="" className="icon" />
                    <div className="data">
                        <div className="wind_speed">18KMP</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
