import React, { useEffect } from 'react';
import { useState } from 'react';
import CountryForm from './components/CountryForm';
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

    

    const filterCountriesBy = string => countries.filter(country => country.name.includes(string))
    console.log(filterCountriesBy(filter))
    return (
        <div>
            <CountryForm
                name="find countries"
                value={filter}
                onChange={handleCountryChange}
            />
            <Countries countries={filterCountriesBy(filter)} />
        </div>
    );
};

const Countries = ({countries}) => {

    const countryList = (list) => {
        return(
            list.map(country => <Country key={country.name} name={country.name} />)
        )
    }

    return(
    <ul>
        {countries.length > 10 
            ? <p>Too many matches, specify another filter</p>
            : countries.length === 1
                ? <CountryInformartion country={countries[0]} />
                : countryList(countries)
        } 
    </ul>
    )
}

const Country = ({name}) => <li>{name}</li>

const CountryInformartion = ({country}) => {
    console.log(country.languages)
    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital :{country.capital}</p>
            <p>population :{country.population}</p>
            <Languages languages={country.languages} />
            <img src={country.flag} alt={country.name} width='200px'></img>
        </div>
    )
}

const Languages = ({languages}) => {
    console.log(languages)
    const languageList = () => languages.map(language => {
    return(
        <li key={language.name}>{language.name}</li> 
    )})
    
    return(
        <ul>
            {languageList()}
        </ul>
    )
}

export default App;