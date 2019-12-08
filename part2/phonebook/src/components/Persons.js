import React from 'react';
import Person from './Person';

const makePersonArray = arr => arr.map(
    person => <Person
     key={person.name}
     name={person.name}
     number={person.number}
    />)

const Persons = ({persons}) => {
    return (
        <div>
            {makePersonArray(persons)}
        </div>
    );
};

export default Persons;