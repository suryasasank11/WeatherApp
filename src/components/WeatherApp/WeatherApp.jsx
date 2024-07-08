import React, { useState } from 'react'
import './weatherapp.css'

import clear_icon from '../Assets/Assets/clear.png'
import cloud_icon from '../Assets/Assets/cloud.png'
import drizzle_icon from '../Assets/Assets/drizzle.png'
import humidityimg from '../Assets/Assets/humidity.png'
import rain_icon from '../Assets/Assets/rain.png'
import searchim from '../Assets/Assets/search.png'
import snow_icon from '../Assets/Assets/snow.png'
import windimg from '../Assets/Assets/wind.png'

const WeatherApp =  () => {
    let api_key="041c8165ac9fcd4a15ba8dae77676c9b"
    
    const [wicon,setWicon]=useState(cloud_icon)
    
    async function search() {
        let element = document.getElementsByClassName("cityInput")
        console.log(element)
        if (element[0].value === -"") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`
        let response = await fetch(url)
        let data = await response.json()
        console.log(data)
        let humidity = document.getElementsByClassName('humidity-percent')
        let wind = document.getElementsByClassName('wind-rate')
        let temperature = document.getElementsByClassName('weather-temp')
        let location = document.getElementsByClassName('weather-location')

        humidity[0].innerHTML = data.main.humidity + " %"
        wind[0].innerHTML = data.wind.speed + " km/h"
        temperature[0].innerHTML = ((data.main.temp)-273.15).toFixed(2)  + " °c"
        location[0].innerHTML = data.name

        if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
            setWicon(cloud_icon);
        }else if(data.weather[0].icon==='03d'|| data.weather[0].icon==='03n'){
            setWicon(drizzle_icon);
        }else if(data.weather[0].icon==='04d'|| data.weather[0].icon==='04n'){
            setWicon(drizzle_icon)
        }else if(data.weather[0].icon==='09d'|| data.weather[0].icon==='09n'){
            setWicon(rain_icon)
        }else if(data.weather[0].icon==='10d'|| data.weather[0].icon==='10n'){
            setWicon(rain_icon)
        }else if(data.weather[0].icon==='13d'|| data.weather[0].icon==='13n'){
            setWicon(snow_icon)
        }else{
            setWicon(clear_icon)
        }
    }

  return (
    <div className='container'>
        <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Enter City Name...'/>
        <div className='search-icon' onClick={()=>{search()}}>
            <img src={searchim} alt='search'/>
        </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt='cloud'/>
        </div>
        <div className='weather-temp'>24°C</div>
        <div className='weather-location'>London</div>
        <div className='data-container'>
            <div className='element'>
                <img src={humidityimg} alt='' className='icon'></img>
                <div className='data'>            
                    <div className='humidity-percent'>64%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='element'>
                <img src={windimg} alt='' className='icon'></img>
                <div className='data'>            
                    <div className='wind-rate'>18kmph</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default WeatherApp