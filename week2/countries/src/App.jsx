import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountries = ({ filteredCountries, onShow }) => {
  if(filteredCountries.length > 10)
  {
    return(
      <div> Too many matches, specify another filter </div>
       
    )
  }
  if(filteredCountries.length === 1)
  {
    const country = filteredCountries[0]
    return(
      <div>
        <h1> {country.name.common} </h1>
        <p> Capital : {country.capital[0]}</p>
        <p> Area : {country.area} </p>

        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}> {language} </li>
          ))}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width='150'/>
      </div>

    )
  }
  return(
    <ul>
      {filteredCountries.map(filteredCountry => (
        <li key={filteredCountry.cca3}>
          {filteredCountry.name.common}
          <button onClick={() => onShow(filteredCountry.name.common)}> show </button>
        </li>
      ) )}
    </ul>
  )
}

const DisplayWeather = () => {
  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })

  const handleSearching = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (countryName) => {
  setSearch(countryName)
}

  return (
    <div>
      <div>
        find countries : <input value={search} onChange={handleSearching}/>
      </div> 
      <DisplayCountries filteredCountries={filteredCountries} onShow={handleShow}/>

    </div>
  )
}

export default App