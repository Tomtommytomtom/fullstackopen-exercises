import React from 'react';

const makePersonArray = (arr, onClick) => arr.map(
    person => <Person
     key={person.id}
     id={person.id}
     name={person.name}
     number={person.number}
     onClick={onClick}
    />)

const Persons = ({persons, onClick}) => {
    return (
        <div>
            {makePersonArray(persons,onClick)}
        </div>
    );
};

const Person = ({name, number,id, onClick}) => {

    return (
        <div>
            <li>{name} {number} <button onClick={() => onClick(id, name)}>delete</button></li>
            
        </div>
    );
};

export default Persons;