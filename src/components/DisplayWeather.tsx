import { MainWrapper } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import React from "react";

interface WeatherStackWeatherData {
  request: { type: string; query: string; language: string; unit: string };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
}

const DisplayWeather: React.FC = () => {
  const WEATHERSTACK_API_KEY = "4957db9a6bc6cdf6a8b13f72a0f81319";
  const WEATHERSTACK_API_ENDPOINT = `http://api.weatherstack.com/current`;

  const [weatherData, setWeatherData] =
    React.useState<WeatherStackWeatherData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchCity, setSearchCity] = React.useState("");

  const fetchWeatherData = async (city: string) => {
    setIsLoading(true);
    const url = `${WEATHERSTACK_API_ENDPOINT}?access_key=${WEATHERSTACK_API_KEY}&query=${city}&units=m`;
    const response = await axios.get<WeatherStackWeatherData>(url);
    setWeatherData(response.data);
    setIsLoading(false);
  };

  const handleSearch = () => {
    if (searchCity.trim() === "") return;
    fetchWeatherData(searchCity);
  };

  const iconChanger = (weatherDescription: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;
    const descriptionLower = weatherDescription.toLowerCase();

    if (
      descriptionLower.includes("rain") ||
      descriptionLower.includes("drizzle")
    ) {
      iconElement = <BsFillCloudRainFill />;
      iconColor = "#272829";
    } else if (
      descriptionLower.includes("clear") ||
      descriptionLower.includes("sun")
    ) {
      iconElement = <BsFillSunFill />;
      iconColor = "#FFC436";
    } else if (descriptionLower.includes("cloud")) {
      iconElement = <BsCloudyFill />;
      iconColor = "#102C57";
    } else if (
      descriptionLower.includes("mist") ||
      descriptionLower.includes("fog")
    ) {
      iconElement = <BsCloudFog2Fill />;
      iconColor = "#279EFF";
    } else {
      iconElement = <TiWeatherPartlySunny />;
      iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  React.useEffect(() => {
    fetchWeatherData("Bengaluru");
  }, []);

  if (isLoading || !weatherData) {
    return (
      <MainWrapper>
        <div className="container">
          <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>Loading weather data...</p>
          </div>
        </div>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            placeholder="enter a city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="searchCircle">
            <AiOutlineSearch className="searchIcon" onClick={handleSearch} />
          </div>
        </div>

        <div className="weatherArea">
          <h1>{weatherData.location.name}</h1>
          <span>{weatherData.location.country}</span>
          <div className="icon">
            {iconChanger(weatherData.current.weather_descriptions[0])}
          </div>
          <h1>{weatherData.current.temperature.toFixed(0)}&deg;C</h1>
          <h2>{weatherData.current.weather_descriptions[0]}</h2>
        </div>

        <div className="bottomInfoArea">
          <div className="humidityLevel">
            <WiHumidity className="windIcon" />
            <div className="humidInfo">
              <h1>{weatherData.current.humidity}%</h1>
              <p>Humidity</p>
            </div>
          </div>

          <div className="wind">
            <SiWindicss className="windIcon" />
            <div className="humidInfo">
              <h1>{weatherData.current.wind_speed} km/h</h1>
              <p>Wind speed</p>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
