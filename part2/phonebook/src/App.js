import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (checkDuplicateName(newName) === true) {
      const person = persons.find(person => person.name === newName)
      replaceOldNumber(person.id, newNumber)
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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const checkDuplicateName = (name) => {
    const nameArray = persons.map(person => person.name)
    let confirmation = false
    if (nameArray.includes(name) === true) {
      confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    }
    console.log(confirmation)
    return confirmation
  }

  const replaceOldNumber = (id, newNumber) => {
    let person = persons.find(p => p.id === id)
    person.number = newNumber
    console.log(newNumber)

    personsServices
      .update(id, person)
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? person : response.data))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmation = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (confirmation !== true) return; 

    personsServices
      .removeObject(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(
          `the person ${person.name} was already deleted from server`
        )
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