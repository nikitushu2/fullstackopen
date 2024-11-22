import { useState, useEffect } from 'react'
import Filter from "./Filter.jsx"
import PersonForm from "./PersonForm.jsx"
import Persons from "./Persons.jsx"
import axios from "axios";
import phoneService from "./services/phones.js";
import Notification from "./Notification.jsx";
import Error from "./Error.jsx";
import "./App.css";


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [term, setTerm] = useState('')
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  function displayError() {
    setError("The entry was already deleted!");
    setTimeout(() => {
      setError(null);
    }, 5000)
  }

  function handleInputChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleChangeTerm(event) {
    setTerm(event.target.value);
  }

  function onDelete(id) {
    phoneService
      .remove(id)
      .then(entry => {
        setPersons(persons.filter(person => person.id != entry.id))
      })
      .catch(() => displayError())
  }

  function handleAddQuery(event) {
    const repeats = persons.filter(person => person.name === newName);
    const id = repeats[0]?.id

    const phoneObject = {
      name: newName,
      number: newNumber
    }

    if (repeats.length > 0) {
      const confirmed = confirm(`${newName} is already in the list! Do you want to replace it?`);
      if (confirmed) {
        phoneService
          .update(id, phoneObject)
          .then(entry => {
            setPersons(persons.map(person => person.id !== id ? person : entry))
            setNotification(`${entry.name} was succesfully added!`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => displayError())
          return;
      };
    }

    phoneService
      .create(phoneObject)
      .then(entry => {
        setPersons(persons.concat(entry))
        setNotification(`${entry.name} was succesfully added!`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter term={term} changeTerm={handleChangeTerm}/>
      <h3>Add new</h3>
      <PersonForm 
      newName={newName}
      nameChange={handleInputChange}
      newNumber={newNumber}
      numberChange={handleNumberChange}
      queryChange={handleAddQuery}
      />
      <h2>Numbers</h2>
      <ul>
      <Persons 
      term={term}
      persons={persons}
      onDelete={onDelete}
      />
      </ul>
    </div>
  )
}

export default App