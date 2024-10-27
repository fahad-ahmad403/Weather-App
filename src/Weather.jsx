import React, { useEffect, useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [city, setCity] = useState("Pakistan");
  const [weather, setWeather] = useState(null);
  const [btn, setBtn] = useState(false);
  const api = import.meta.env.VITE_API_KEY;
  const darkIcon = <FontAwesomeIcon className="font" icon={faMoon} />;
  const lightIcon = <FontAwesomeIcon className="font" icon={faSun} />;

  const convertTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };
  const convertWindSpeed = (speed) => {
    return (speed * weather.wind.speed).toFixed(2);
  };

  function cityhandle(e) {
    setCity(e.target.value);
  }

  function btnHandle() {
    setBtn(!btn);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();
  }, [city]);
  
  return (
    <div className={btn ? "dark" : "light"}>
      <div className="w-full min-h-screen bg-gradient-custom">
        <button
          onClick={btnHandle}
          className="font-bold rounded text-xs w-32 h-10 absolute top-3 right-3 bg-background-Color text-text-Color"
        >
          {btn === true ? (
            <>Light Mode {lightIcon}</>
          ) : (
            <>Dark Mode {darkIcon}</>
          )}
        </button>
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="lg:text-6xl md:text-4xl sm:text-4xl pt-12 mx-8 text-text-Color">
            Weather App
          </h1>
          <input
            className="mt-10 rounded text-center outline-none px-8 py-2 text-text-Color bg-input-color"
            id="input"
            type="text"
            value={city}
            onChange={cityhandle}
            placeholder="Enter country name"
            autoComplete="off"
          />
          {weather && weather.main ? (
            <div className="flex justify-center items-center flex-col">
              <img
                className="w-40"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather image"
              />
              <p className="text-text-Color">
                {weather.weather[0].description.toUpperCase()}
              </p>
              <p className="font-bold text-text-Color">
                Current Temperature: {weather.main.temp}°C
              </p>
              <div className="flex justify-center gap-5 pt-10 flex-wrap mx-8 mb-12 text-text-Color">
                <div className="rounded-lg bg-white/30 p-5">
                  <span className="text-2xl">
                    <FontAwesomeIcon
                      className="font"
                      icon={faTemperatureHigh}
                    />
                  </span>
                  <p>Min Temperature: {weather.main.temp_min}°C</p>
                  <p>Max Temperature: {weather.main.temp_max}°C</p>
                </div>
                <div className="rounded-lg bg-white/30 p-5">
                  <span className="text-2xl">
                    <FontAwesomeIcon className="font" icon={faSun} />
                  </span>
                  <p>Sunrise: {convertTime(weather.sys.sunrise)}</p>
                  <p>Sunset: {convertTime(weather.sys.sunset)}</p>
                </div>
                <div className="rounded-lg bg-white/30 p-5">
                  <span className="text-2xl">
                    <FontAwesomeIcon className="font" icon={faWind} />
                  </span>
                  <p>Wind Degree: {weather.wind.deg}°</p>
                  <p>Wind Speed: {convertWindSpeed(weather.wind.speed)} km/h</p>
                </div>
              </div>
            </div>
          ) : (
            weather && (
              <h3 className="pt-5 text-text-Color font-bold">Weather not found</h3>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
