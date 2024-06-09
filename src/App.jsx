import Search from "./components/search/search";
import React, { useState } from "react";
import "./App.css";
import DisplayWeather from "./components/Display_Weather/DisplayWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/Forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getDate = new Date();
  let currentHour = getDate.getHours();
  let currentMintues = getDate.getMinutes();
  let currentSeconds = getDate.getSeconds();
  let currentDate = getDate.toDateString();

  currentHour = currentHour % 12;
  const ampm = currentHour <= 12 ? "PM" : "AM";

  const Time = `${(currentHour = currentHour ? currentHour : 12)}:${
    currentMintues < 10 ? "0" + currentMintues : currentMintues
  }:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds} ${ampm}`;

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const ForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, ForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const ForecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });

        setForecast({ city: searchData.label, ...ForecastResponse });
      })
      .catch((error) => console.log(error));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />

      {currentWeather && (
        <DisplayWeather
          data={currentWeather}
          currentTime={Time}
          currentDate={currentDate}
        />
      )}

      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
