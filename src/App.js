import React, { useState } from "react";
import "./App.css";
const api_key = "e2b67636b902d2fc4320b0f2c059e920";
const api_base = `https://api.openweathermap.org/data/2.5/`;
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  function search(evt) {
    if (evt.key === "Enter") {
      fetch(`${api_base}weather?q=${query}&units=metric&APPID=${api_key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
        });
    }
  }
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for your city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">
                Lat: {weather.coord.lat}, Lon: {weather.coord.lon}
              </div>
            </div>
            <div className="weather-box">
              <div className="weather-temp">
                <div className="icon">
                  <i className={"owf owf-" + weather.weather[0].id}></i>
                </div>
                <div className="temp">{Math.round(weather.main.temp)} °C</div>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="no-city">Weather React</h1>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
