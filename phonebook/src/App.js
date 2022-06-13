import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
      {getPersons()}
    </div>
  )
}

const Filter = ({persons}) => {
  const[filter,setFilter]=useState('') 

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
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