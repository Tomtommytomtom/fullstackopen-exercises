import React, { useEffect } from 'react';
import { useState } from 'react';
import CountryForm from './components/CountryForm';
import Countries from './components/Countries'
import WeatherApi from './components/WeatherApi'
import Axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    
    useEffect(() => {
        Axios
            .get(`https://restcountries.eu/rest/v2/all`)
            .then(response => {
                setCountries(response.data)
            }
    )},[])


    

    const handleCountryChange = (event) => {
        setFilter(event.target.value)
    }

    const setFilterToCountry = country => {
        setFilter(country)
    }

    const filterCountriesBy = string => countries.filter(country => country.name.includes(string))


    return (
        <div>
            <CountryForm
                name="find countries"
                value={filter}
                onChange={handleCountryChange}
            />
            <Countries countries={filterCountriesBy(filter)} onClick={setFilterToCountry} />
            {filterCountriesBy(filter).length === 1 ? <WeatherApi capital={filterCountriesBy(filter)[0].capital} /> : <></>}

        </div>
    );
};


export default App;