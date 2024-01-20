import React from "react";
import { useState } from "react";

const api = {
  key: "22f7f77013a83a0cf79be0599dbccb95",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Home() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg rounded">
        <h1 className="mb-4 text-center">Weather App</h1>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={searchPressed}>
            Search
          </button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <h2 className="text-center">{weather.name}</h2>

            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-1 m-0">{weather.main.temp}°C</p>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className="ms-3"
              />
            </div>

            <p className="text-center fs-4">{weather.weather[0].main}</p>
            <p className="text-center fs-5">({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
