import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const  newObj =[ 
      {name:newName}
    ]
    const compare = (o1,o2) => {
      console.log("comp..",o1,o2,o1.name===o2.name)
      if (o1.name===o2.name){
        return true
      }
    }
  
    console.log(persons)
    persons.map(person => {
     console.log( compare(person,newObj))

    })
    
    // if(compare){
    //   console.log(newName)
    //   alert(`${newName} is already added to phonebook`)
    // }
    // else{
    
    // setPersons(persons.concat(newObj))
    // }
    
    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person name={person.name}/>)}
    </div>
  )
}

const Person = ({name}) => {
  return(
    <div>{name}</div>
  )
}
export default App