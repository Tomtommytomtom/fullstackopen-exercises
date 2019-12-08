import React from 'react';

const Countries = ({countries}) => {
    return (
        <>
            {countryNameIntoCountries(countries)}
        </>
    );
};

const countryNameIntoCountries = countries => {
    countries.map((country) => {
        <CountryName key={countries.id} name={country.name} />
    })
}

const CountryName = ({name}) => {
    <li>{name}</li>
}

// const CountryInformation = () => {
//     return(

//     )
// }

export default Countries;