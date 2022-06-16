import { useState } from 'react'
import phonebookService from '../services/phonebookService'

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
            number: newNumber
        }
        
        const compare = (o1,o2) => {
            if (o1.name===o2.name || o1.number===o2.number){
            return true
            }
        }

        if (persons.some(person=> compare(person,newObj))){
            persons.map(person => {
                if(person.name===newObj.name){
                    return window.confirm(`${person.name} is already added to phonebook, replace the old number with new one?`)
                    ? phonebookService.updateNumber(person.id,newObj)
                    : false
                } else {
                    return false
                }
            })
        }else {
            phonebookService
            .create(newObj)
            .then(returnedData => {
                setPersons(persons.concat(returnedData))
            })
        
        setNewName('')
        setNewNumber('')
        }
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
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
} 

export default PersonForm