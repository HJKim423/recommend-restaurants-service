import { useState,useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "./reducer/useReducer";
import {placeAction} from "./reducer/placeReducer";
import styled from 'styled-components';
import { Link } from "react-router-dom";

function Weather(){
    const [coords, saveCoords] = useState();
    const [temp, setTemp] = useState();
    const [weather, setWeather] = useState();
    const [location, setLocation] = useState();
    const [Icon, setIcon] = useState();

        function handleGeoSucc(position) {
            // console.log(position);
            const latitude = position.coords.latitude;  // 경도  
            const longitude = position.coords.longitude;  // 위도
            const coordsObj = {
                latitude,
                longitude
            }
            saveCoords(coordsObj);
            getWeather(latitude, longitude);
            handlePlace(latitude, longitude);
        }
    
        function handleGeoErr(err) {
            console.log("geo err! " + err);
        }
    
        function requestCoords() {
            navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
        }
    
        function getWeather(lat, lon) {
            const key = '7dea7b6ab6c8c5d1cc04341f943c0d17';
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
                .then(res => res.json())
                .then(data => {
                const temp = data.main.temp;
                const weathers = data.weather[data.weather.length - 1];
                const location = data.name;
                setTemp(Math.round(temp - 273.15));
                // setTemp(100);
                setWeather(weathers.main)
                setWeather("Rain");
                if(location === "Bucheon-si"){
                    setLocation("부천시");
                }
                setIcon(data.weather[0].icon);
                
                })
        }
    
        useEffect(() => {
            requestCoords();
        }, []);

        
        const dispatch = useDispatch();
        const handleMenu = () => {
            const weatherInfo = {weather, temp};
            dispatch(userAction(
                {weatherInfo},
                ),
            );
        }

        const handlePlace = (lat, lon) => {
            const placeInfo = {lat, lon};
            dispatch(placeAction(
                {placeInfo},
                ),
            );
        }

        
        let iconurl = "http://openweathermap.org/img/w/" + Icon + ".png"; 
        return(
            <WeatherStyle>
            <div className="location">{location} <span>의 현재 날씨</span></div>
            <div className="weather">
                <img className="icon" src={iconurl}/>
                <div className="temp">{temp}도</div>
                <div className="main">{weather}</div>
                </div>
                <Link to="/main">
                    <button onClick={handleMenu}>추천받기</button>
                </Link>
                
            
            </WeatherStyle>
        )
}

const WeatherStyle = styled.div`
    padding: 24px 8px;
    color:#172c66;
    background-color: #f3d2c1;
    border-radius:12px;
    
.location{
    font-weight:600;
    font-size:32px;

    span{
        font-size:24px;
    }
}

.weather{
    margin:auto;
    width:500px;
    display:flex;
    justify-content:center;
    align-items: center;
    
}

.icon{
    width:100px;
    height:100px;
}

.temp{
    font-size:22px;
    font-weight:600;
    margin-right:8px;
}

.main{
    font-size:16px;
    font-weight:600;
    margin-right:16px;
}

button{
    padding:8px 20px;
    background-color:#8bd3dd;
    border:none;
    border-radius:12px;
    font-size:20px;
    font-weight:600;
    color:#001858;
    cursor:pointer;
}
`;

export default Weather;