import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //Hooks
  let [zipcode, changeZip] = useState("");
  let [searchResult, setResult] = useState({
    city: {
      name: "",
      country: "",
      lon: 0,
      lat: 0,
      weather: "",
      iconId: "",
      temp: 0,
      feels_like: 0,
      min_temp: 0,
      max_temp: 0,
      humidity: 0
    }
  });

  let [isDataPresent, setPresentData] = useState(false);

  let fetchDataFromServer = () => {
    axios
      .get("https://weather-server-app.herokuapp.com/" + zipcode)
      .then(res => {
        if (res.data !== "INVALID") {
          let city = {
            name: res.data.name,
            country: res.data.sys.country,
            lon: res.data.coord.lon,
            lat: res.data.coord.lat,
            weather: res.data.weather[0].main,
            iconId: res.data.weather[0].icon,
            temp: res.data.main.temp,
            feels_like: res.data.main.feels_like,
            min_temp: res.data.main.temp_min,
            max_temp: res.data.main.temp_max,
            humidity: res.data.main.humidity
          };

          setResult((searchResult = { city }));
          setPresentData((isDataPresent = true));
        }
      });
  };

  return (
    <div className="p-2 shadow col-xs-12 mx-auto m-2 col-md-10">
      <div className="text-center">
        <h2>
          <span className="text-warning">Weather</span> App
        </h2>
      </div>
      <div className="row m-4">
        <div className="col-md-4 col-xs-8 mx-auto">
          <div className="list-group">
            <button
              type="radio"
              value="10001"
              name="radio"
              onClick={e => {
                e.preventDefault();
                changeZip((zipcode = e.target.value));
              }}
              className="list-group-item"
            >
              New York
            </button>
            <button
              type="radio"
              value="77001"
              name="radio"
              onClick={e => {
                e.preventDefault();
                changeZip((zipcode = e.target.value));
              }}
              className="list-group-item"
            >
              Houston
            </button>
            <button
              type="radio"
              value="90001"
              name="radio"
              onClick={e => {
                e.preventDefault();
                changeZip((zipcode = e.target.value));
              }}
              className="list-group-item"
            >
              Los Angeles
            </button>

            <button
              className="btn btn-primary mt-1"
              onClick={fetchDataFromServer}
              disabled={!zipcode}
            >
              Show Weather
            </button>
          </div>
        </div>
        <div className="col-md-5 col-xs-8 mt-2 mx-auto">
          <div className="title col text-center">
            <h3>
              {isDataPresent
                ? "Weather in " +
                  searchResult.city.name +
                  "," +
                  searchResult.city.country +
                  ""
                : "Choose a city"}
            </h3>
          </div>

          <div className="image col-4 mx-auto">
            {isDataPresent && (
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  searchResult.city.iconId +
                  "@2x.png"
                }
                alt=""
              />
            )}

            <div className="temp">
              <div className="temp text-center">
                <h4>
                  {isDataPresent
                    ? Math.floor(searchResult.city.temp) - 273
                    : ""}
                  {isDataPresent && <sup>&#8451;</sup>}
                </h4>
              </div>
            </div>
            <p className="text-center">
              <b>{searchResult.city.weather}</b>
            </p>
          </div>
          <div className="row">
            <div className="col-4 mx-auto">
              {isDataPresent && (
                <p>
                  High:{" "}
                  <span className="text-primary">
                    {Math.floor(searchResult.city.max_temp) - 273}
                    <sup>&#8451;</sup>
                  </span>
                </p>
              )}
            </div>
            <div className="col-4 mx-auto">
              {isDataPresent && (
                <p>
                  Low:{" "}
                  <span className="text-danger">
                    {Math.floor(searchResult.city.min_temp) - 273}
                    <sup>&#8451;</sup>
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-4 mx-auto">
              {isDataPresent && (
                <p>
                  Feels:{" "}
                  <span className="text-success">
                    {Math.floor(searchResult.city.feels_like) - 273}
                    <sup>&#8451;</sup>
                  </span>
                </p>
              )}
            </div>
            <div className="col-4 pr-0 mx-auto">
              {isDataPresent && (
                <p>
                  Humid:{" "}
                  <span className="text-warning">
                    {searchResult.city.humidity} %
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="lonlat row">
            <div className="col-4 mx-auto">
              <p>
                {isDataPresent ? "Lat: " : ""}
                <span className="text-info">
                  {isDataPresent ? searchResult.city.lat : ""}
                </span>
              </p>
            </div>
            <div className="col-4 mx-auto">
              <p>
                {isDataPresent ? "Lon: " : ""}
                <span className="text-info">
                  {isDataPresent ? searchResult.city.lon : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
