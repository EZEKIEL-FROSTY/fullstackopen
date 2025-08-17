import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ( {person} ) => {
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({ persons }) => {
  return(
    <div>
      {persons.map((person) => {
        return (<Person key={person.id} person={person}/>)
      }
      )}
    </div>
  )
}

const PersonForm = ({onSubmit, newName, newNumber, setNewNumber, setNewName}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input 
          value={newName} 
          onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ( {value, onChange} ) => {
  return(
    <div>
        filter shown with a <input value={value} onChange={onChange}/>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])
  
  const handleAddButton = (event) => {
    event.preventDefault()
    if(persons.some((person) => {return person.name === newName}))
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      setPersons([...persons, {name : newName, number : newNumber, id : persons.length + 1}])
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={(event) => setNewFilter(event.target.value)}/>
      
      <h3> add a new </h3>
      <PersonForm 
      onSubmit={handleAddButton}
      newName = {newName}
      newNumber = {newNumber}
      setNewName={setNewName}
      setNewNumber={setNewNumber}
      />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
