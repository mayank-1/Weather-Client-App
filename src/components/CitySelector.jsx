import React from "react";

const CitySelector = ({ onSelect, fetchWeather, zipCode }) => (
  <div className="list-group">
    {[
      { name: "New York", code: "10001" },
      { name: "Houston", code: "77001" },
      { name: "Los Angeles", code: "90001" },
    ].map((city) => (
      <button
        key={city.code}
        type="button"
        className="list-group-item"
        onClick={() => onSelect(city.code)}
      >
        {city.name}
      </button>
    ))}
    <button
      className="btn btn-primary mt-1"
      onClick={() => fetchWeather()}
      disabled={!zipCode}
    >
      Show Weather
    </button>
  </div>
);

export default CitySelector;
