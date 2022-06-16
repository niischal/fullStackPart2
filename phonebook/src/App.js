import { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebookService'


const App = () => {
  const [persons, setPersons] = useState([])
  const[filter,setFilter]=useState('') 
  
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
        <Person name={person.name} number={person.number} id={person.id}/>
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
export default App