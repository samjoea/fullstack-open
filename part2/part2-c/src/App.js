import axios from 'axios'
import {useEffect, useState} from 'react'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    const {value} = event.target
    const searchResults = countries.filter(country => (
      country.name.common
        .toLowerCase().match(value.toLowerCase())
    ))
    value ? setSearchInput(searchResults) : setSearchInput('');
  }

  return (
    <div>
      find countries <input 
        onChange={handleChange}
        />
        <div>
          <Filter resultsData={searchInput} />
        </div>
    </div>
  )
}

export default App