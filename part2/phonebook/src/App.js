import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameArray = persons.map(person => person.name)
    if (nameArray.includes(newName) === true) {
      let confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirm === true) {
        const person = persons.find(person => person.name === newName)
        return replaceNumber(person.id)
      } else {
        return
      }
    } 
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personsServices
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
   }

  const replaceNumber = (id) => {
    const newNumberObject = {
      name: newName,
      number: newNumber
    }

    personsServices
      .update(id, newNumberObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmation = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (confirmation !== true) return; 

    personsServices
      .removeObject(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(() => {
        alert(`the person ${person.name} was already deleted from server`)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addName={addName}
      />
      <h3>Numbers</h3>
      <ul>
        {persons.map(person => 
          <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePerson(person.id)}
        /> 
        )}
      </ul>
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App