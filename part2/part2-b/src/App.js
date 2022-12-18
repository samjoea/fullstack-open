import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleChange = (event) => {
    const {value, name} = event.target
    name === 'name' ? setNewName(value) : setNewNumber(value)
  }
  const handleSearch = (event) => {
    const {value} = event.target
    const result = persons.filter(person => person.name.toLowerCase().match(value.toLowerCase()))
    value? setResults(result): setResults([]);
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const check = persons.some(val => isEqual(val, {name: newName}))
    check ? alert(`${newName} is already added to phonebook`) :
      setPersons(persons => [...persons, {name: newName, number: newNumber}])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        resultsData={results} 
        searchFunc={handleSearch} 
      />
      <h3>add a new</h3>
      <PersonForm 
        nameData={newName}
        numberData={newNumber}
        submitFunc={handleSubmit}
        changeFunc={handleChange}
        />
      <h3>Numbers</h3>
      <Persons personData={persons}/>
    </div>
  )
}

export default App