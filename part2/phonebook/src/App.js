import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/phonebookentries'


const App = () => {

  const notificationStyle = {
    color : 'green',
    border : 'solid green 4px',
    borderRadius : 10,
    backgroundColor : 'rgba(0,255,0,0.3)',
    margin : '20px 0px',
    textAlign : 'center'
  }

  const errorStyle = {
    color : 'red',
    border : 'solid red 4px',
    borderRadius : 10,
    backgroundColor : 'rgba(255,0,0,0.3)',
    margin : '20px 0px',
    textAlign : 'center'

  }



  const [persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ notificationMessage, setNotificationMessage] = useState(null)
  
  const reloadPage = () => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }

  const displayError = message => {
    console.log('error');
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const displayNotification = message => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

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
        const personToEdit = persons.find(person => person.name === newName)
        personService
          .getOne(personToEdit.id)
          .catch(error => displayError(`${personToEdit.name} has already been removed.`))
        const newPerson = {
          name : personToEdit.name,
          number : newNumber
        }
        personService.update(personToEdit.id, newPerson)
          .then(persons => setPersons(persons))
      }
    }
      else{
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
          displayNotification(`Added ${person.name}`)
        })
        .catch(error => displayError(`${person.name} has already been removed.`))
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
          displayNotification(`Deleted ${name}`)
        })
        .catch(error => {
          displayError(`Deleted person couldnt be found`)
          reloadPage()
        })
  }
} 
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} styles={errorStyle}/>
      <Notification message={notificationMessage} styles={notificationStyle}/>
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


const Notification = ({message, styles}) => {
  if(message === null){
    return null
  }else return(
    <div style={styles}>
      <p>{message}</p>
    </div>
  )
}

export default App