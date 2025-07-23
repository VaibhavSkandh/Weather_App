import React from "react";
import { MainWrapper } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { BsWind } from "react-icons/bs";

const DisplayWeather = () => {
  return (
    <MainWrapper>
      <div className="container">
        {/* Search Section */}
        <div className="searchArea">
          <input type="text" placeholder="Enter a City" />
          <div className="searchCircle">
            <AiOutlineSearch className="searchIcon" />
          </div>
        </div>

        {/* Weather Display */}
        <div className="weatherArea">
          <h1>Auckland</h1>
          <h2>New Zealand</h2>
          <div className="icon">🌥️</div>
          <h1>18°C</h1>
          <h2>Cloudy</h2>
        </div>

        {/* Bottom Info Area */}
        <div className="bottomInfoArea">
          <div className="humidityLevel">
            <WiHumidity className="humidIcon" />
            <div className="humidInfo">
              <h2>60%</h2>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind">
            <BsWind className="windIcon" />
            <div className="windInfo">
              <h2>10 km/h</h2>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
