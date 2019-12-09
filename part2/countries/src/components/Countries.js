import React from 'react'

const Countries = ({countries, onClick}) => {

    const countryList = (list) => {
        return(
            list.map(country => <Country key={country.name} name={country.name} onClick={() => onClick(country.name)} />)
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

const Country = ({name, onClick}) => {
    return(
        <li>
            {name}
            <button onClick={onClick}>show</button>
        </li>
    )
}

const CountryInformartion = ({country}) => {
    console.log(country.languages)
    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <Languages languages={country.languages} />
            <img src={country.flag} alt={country.name} width='200px' ></img>
        </div>
    )
}

const Languages = ({languages}) => {
    console.log(languages)
    const languageList = () => languages.map(language => {
    return(
        <li key={language.name}>
            {language.name}
        </li> 
    )})
    
    return(
        <ul>
            {languageList()}
        </ul>
    )
}

export default Countries
