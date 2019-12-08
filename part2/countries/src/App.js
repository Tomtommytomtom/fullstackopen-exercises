import React, { useEffect } from 'react';
import { useState } from 'react';
import CountryForm from './components/CountryForm';
import Countries from './components/Countries'
import Axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    
    useEffect(() => 
        Axios
            .get(`https://restcountries.eu/rest/v2/all`)
            .then(response => {
                setCountries(response.data)
            }
        ),[])
    
    const handleCountryChange = (event) => {
        setFilter(filter)
        setCountries(filterCountriesBy(filter))
    }

    const filterCountriesBy = string => countries.filter(country => country.name.includes())
    
    return (
        <div>
            <CountryForm
                name="find countries"
                value={filter}
                onChange={handleCountryChange}
            />
            <Countries countries={countries}/>
            {/* <CountryInformation/> */}
        </div>
    );
};

export default App;