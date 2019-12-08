import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addPerson = event => {
    console.log(persons)
      console.log(isPersonInPhonebook(newName))
    if(isPersonInPhonebook(newName)){
      
      alert(`${newName} is already added to phonebook`)
    }else{
      event.preventDefault()
      console.log('button has been clicked', event.target)
      const person = {
        name : newName,
        number : newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
    }
    
  }

  const personsIncluding = filterString => persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

  const isPersonInPhonebook = name => persons.find(entry => name === entry.name)

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }
  

  

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        value={newFilter}
        onChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {newFilter === '' ? <Persons persons={persons}/> : <Persons persons={personsIncluding(newFilter)}/>}
    </div>
  )
}

export default App