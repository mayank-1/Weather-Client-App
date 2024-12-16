import React, { useState } from "react";
import axios from "axios";

// Components
import CitySelector from "./components/CitySelector";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  // State
  const [zipCode, setZipCode] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch weather data
  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:9000/${zipCode}`);
      if (response.data !== "INVALID") {
        const data = response.data;
        const city = {
          name: data.name,
          country: data.sys.country,
          lon: data.coord.lon,
          lat: data.coord.lat,
          weather: data.weather[0].main,
          iconId: data.weather[0].icon,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          min_temp: data.main.temp_min,
          max_temp: data.main.temp_max,
          humidity: data.main.humidity,
        };
        setWeatherData(city);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
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
          <CitySelector
            onSelect={(data) => setZipCode(data)}
            zipCode={zipCode}
            fetchWeather={fetchWeather}
          />
        </div>
        <div className="col-md-5 col-xs-8 mt-2 mx-auto">
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <WeatherDetails data={weatherData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
