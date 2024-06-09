import React from "react";
import "../../App.css";

const DisplayWeather = ({ data, currentTime, currentDate }) => {
  // console.log(hours, minutes, seconds);

  return (
    <div className="Display">
      <div className="Top-wrapper">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-desc">{data.weather[0].description}</p>
        </div>
        <img
          src={`icons/${data.weather[0].icon}.png`}
          className="weather-icon"
          alt="weather"
        />
      </div>

      <div className="Bottom-wrapper">
        <p className="temperature">{Math.round(data.main.temp)}&deg;C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Current Time</span>
            <span className="parameter-value">{currentTime}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Date</span>
            <span className="parameter-value">{currentDate}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels Like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}&deg;C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed}m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humadity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
