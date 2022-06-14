import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const[filter,setFilter]=useState('') 
  
  const hook = () => {
    axios 
      .get('http://localhost:3001/persons')
      .then(response => 
        setPersons(response.data))
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
        <Person name={person.name} number={person.number} key={person.id}/>
      </div>
    ));
   };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      {getPersons()}
    </div>
  )
}

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
const Person = ({name, number}) => {
  return(
    <div>{name}  -  {number}</div>
  )
}

const PersonForm = ({persons,setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    
  }
  const handleAdd = (event) => {
    event.preventDefault()
    const  newObj ={
      name:newName,
      number: newNumber,
      id: persons.length+1
    }
    
    const compare = (o1,o2) => {
      if (o1.name===o2.name || o1.number===o2.number){
        return true
      }
    }
    (persons.some(person=> compare(person,newObj)))
    ? alert (`${newName} is already added to phonebook`)
    :setPersons(persons.concat(newObj))

    
    setNewName('')
    setNewNumber('')
  }
  return(
    <div>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </div>
  )
} 
export default App