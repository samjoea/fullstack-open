import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WeatherData = ({ lat, lon }) => {
   const [weatherInfo, setWeatherInfo] = useState({})
   const KEY = process.env.REACT_APP_WEATHER_API_KEY;
   useEffect( () => {
      const fetchData = async() => {
         try {
         let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`);
         let tempdata = {
            temperature: data.main.temp,
            icon: data.weather[0].icon,
            wind: data.wind.speed,
            description: data.weather[0].main
         }
         setWeatherInfo(tempdata);
      } catch (error) {
         console.log(error.response.response)
      }
   }
   fetchData();
   }, [lat, lon, KEY])

   const { temperature, icon, wind, description } = weatherInfo;

  return (
    <div>
      <p>temperature {(temperature - 273.15).toFixed(2)} &deg;C</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
      <p>wind {wind} m/s</p>
    </div>
  )
}

export default WeatherData