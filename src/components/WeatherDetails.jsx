import React from "react";

// Utility function for temperature conversion
const kelvinToCelsius = (temp) => Math.floor(temp - 273);

const WeatherDetails = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <h3 className="text-center">
        Weather in {data.name}, {data.country}
      </h3>
      <div className="image col-4 mx-auto">
        <img
          src={`http://openweathermap.org/img/wn/${data.iconId}@2x.png`}
          alt={data.weather}
        />
        <h4 className="text-center">
          {kelvinToCelsius(data.temp)}
          <sup>&#8451;</sup>
        </h4>
        <p className="text-center">
          <b>{data.weather}</b>
        </p>
      </div>
      <div className="row">
        <div className="col-4 mx-auto">
          <p>
            High:{" "}
            <span className="text-primary">
              {kelvinToCelsius(data.max_temp)}
              <sup>&#8451;</sup>
            </span>
          </p>
        </div>
        <div className="col-4 mx-auto">
          <p>
            Low:{" "}
            <span className="text-danger">
              {kelvinToCelsius(data.min_temp)}
              <sup>&#8451;</sup>
            </span>
          </p>
        </div>
        <div className="col-4 mx-auto">
          <p>
            Feels:{" "}
            <span className="text-success">
              {kelvinToCelsius(data.feels_like)}
              <sup>&#8451;</sup>
            </span>
          </p>
        </div>
        <div className="col-4 mx-auto">
          <p>
            Humid: <span className="text-warning">{data.humidity}%</span>
          </p>
        </div>
        <div className="col-4 mx-auto">
          <p>
            Lat: <span className="text-info">{data.lat}</span>
          </p>
        </div>
        <div className="col-4 mx-auto">
          <p>
            Lon: <span className="text-info">{data.lon}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
