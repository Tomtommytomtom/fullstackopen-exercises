import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const WeatherApi = ({capital}) => {
    const[loading, setLoading] = useState(true)
    const[weatherInfo, setWeatherInfo] = useState([])

    console.log(capital, weatherInfo)

    
    useEffect(() => {
        const header = {access_key : '8264ac8f695fdda8c39800ce401b97df'}
        Axios
        .get(`http://api.weatherstack.com/current?access_key=${header.access_key}&query=${capital}`)
        .then(response => {
            console.log(response.data)
            setWeatherInfo(response.data)
            setLoading(false)
        })
        
    },[capital]);
    
    return (
        <>
            {loading
                ? <p>loading</p>
                : <p>{weatherInfo.location.name}</p>
            }
        </>
    );
}



export default WeatherApi;