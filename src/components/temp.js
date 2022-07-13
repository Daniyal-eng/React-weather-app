import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";


const Temp = () => {

    const [searchVal,setSearchVal] =useState('karachi');
    const [tempInfo,setTempInfo] =useState({});

    const getWeather =async ()=>{

        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&appid=e97737909f857d795459cfbedd9e8864`
            
            const responce =await fetch(url)
            const data =await responce.json();


            
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

            console.log(data);
        } catch (error) {
            alert(error);
            console.log(error)
        }
    }

    useEffect(() => {
      getWeather();
    }, [])
    
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            autoFocus
            placeholder="search..."
            id="search"
            className="searchTerm"
            value={searchVal}
            onChange={(e)=>{setSearchVal( e.target.value)}}
          />

          <button type="button" className="searchButton" onClick={getWeather}>
            Search
          </button>
        </div>
      </div>

      {/* temp card */}

      <WeatherCard tempInfo={tempInfo}/>
      
    </>
  );
};

export default Temp;
