import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './component/Notification'

const Person = ( {person, onDelete} ) => {
  return(
    <div>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, onDelete }) => {
  return(
    <div>
      {persons.map((person) => {
        return (<Person key={person.id} person={person} onDelete={onDelete}/>)
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
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const handleAddButton = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson)
    {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const updatedPerson = {...existingPerson, number : newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => {
              return person.id !== existingPerson.id ? person : returnedPerson
            }))
          })
          .catch(error => {
            setNewMessage(`Information of ${newName} has already been removed from the system`)
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          })
      }
    }
    else
    {
      const newPerson = {
      name : newName,
      number : newNumber
      }
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if(!person) return 

    const okayToDelete = window.confirm(`Delete ${person.name}?`)
    if (!okayToDelete) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {newMessage} />
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
      <Persons persons={personsToShow} onDelete={handleDeletePerson}/>
    </div>
  )
}

export default App
