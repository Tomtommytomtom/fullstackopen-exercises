import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/phonebookentries'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
    },[])

  const addPerson = event => {
    if(isPersonInPhonebook(newName)){
      const result = window.confirm(`${newName} is already in the Phonebook, replace old Number with a new one?`)
      if(result){
        const id = persons.find(person => person.name === newName).id
        const person = {
          name : newName,
          number : newNumber
        }
        personService.update(id, person)
          .then(persons => setPersons(persons))
      }
    }else{
      event.preventDefault()
      const person = {
        name : newName,
        number : newNumber
      }
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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
  
  const deletePerson = (id, name) => {
    const result = window.confirm(`Delete ${name} ?`)
    if(result){
      personService
        .deletePerson(id)
        .then(() => {
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
        })
  }
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
      {newFilter === '' ? <Persons onClick={deletePerson} persons={persons}/> : <Persons onClick={deletePerson} persons={personsIncluding(newFilter)}/>}
    </div>
  )
}

export default App