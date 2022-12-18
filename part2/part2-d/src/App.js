import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { createData, getData, updateData } from './service/service'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      let data = await getData();
      setPersons(data);
    }
    fetch()
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

  const handleSubmit = async (event) => {
    let id;
    event.preventDefault();
    const check = persons.some(val => {
      if(isEqual(val.name, newName)) {
        id = val.id;
        return true;
      }
      return false;
    })
    if(check) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      && await updateData(id, {name: newName, number: newNumber});
      setMessage(`${newName} data updated`);
      setError(false);
      setNotify(true);

    } else {
      let data = await createData({name: newName, number: newNumber});
      setPersons(persons => [...persons, data]);
      setMessage(`Added ${newName}`);
      setError(false);
      setNotify(true);
    }

    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      { notify &&
        <Notification message={message} error={error} setNotify={setNotify} />
      }
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
      <Persons
        personData={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setNotify={setNotify}
        setError={setError}
      />
    </div>
  );
}

export default App;