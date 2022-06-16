import { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebookService'
import Message from './components/Message'

const Filter = ({filter,setFilter}) => {
  const handleFilterChange = (event) => {
      setFilter(event.target.value)
  }
  return(
      <div>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>  
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter,setFilter]=useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message,setMessege]=useState({})
  
  const hook = () => {
      phonebookService.getAll().then(initialData => 
        setPersons(initialData))
  }
  useEffect(hook,[])
  
  

  const getPersons = () => {
    let currentPersons = null;
    if (filter.length>0) {
      currentPersons = persons.filter(person => {
        return (
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
      });
    } else {
      currentPersons = [...persons];
    }

    return currentPersons.map(person => (
      <div key={person.id}>
        <Person person={person} handleDelete={handleDelete}/>
      </div>
    ));
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
    
  
  const handleAdd = (event) => {
         
    event.preventDefault()
    const  newObj ={
        name: newName,
        number: newNumber
    }
    const repeatedPerson = persons.find(person=> person.name===newName)
    if (persons.find(person=> person.name===newName)){
        if(window.confirm(`${newObj.name} is already added to phonebook, replace the old number with new one?`)){
          phonebookService
            .updateNumber(repeatedPerson.id,newObj)
            .then(returnedData => {
              setPersons(persons.map(person => person.id !== repeatedPerson.id ? person : returnedData))
              setMessege({"msg": `Update ${repeatedPerson.name}`, 'type' : 'success'})
           })
        }
    } else {
      phonebookService
        .create(newObj)
        .then(returnedData => {
         setPersons(persons.concat(returnedData))
         setMessege({"msg": `Added ${newName}`, 'type' : 'success'})
      })
    }
    setNewName('')
    setNewNumber('')
  }
  
  const handleDelete =(event) => {
    const i=Number(event.target.id)
    window.confirm(`Delete ${event.target.name}?`)
    ? phonebookService
        .deletePerson(event.target.id)
        .then(removedPerson => setPersons(persons.filter(person => person.id !==i)))
        .catch(error=> setMessege({'msg':`${event.target.name} has already been deleted`, 'type' : 'error' })) 
    : console.log('no')
    setPersons(persons.filter(person => person.id !==i))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      {message==null?<Message message={message}/>:null}
      <h3>Add a new</h3>
      <PersonForm 
        handleAdd={handleAdd} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}/>

      <h3>Numbers</h3>
      {getPersons()}
    </div>
  )
}

export default App