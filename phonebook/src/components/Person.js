
const Person = ({person,handleDelete}) => {
    
    
    return(
      <div>
        {person.name}  -  {person.number}     
        <button id={person.id} name={person.name} onClick={handleDelete} >delete</button>
    </div>
    )
}

export default Person