import phonebookService from '../services/phonebookService'

const Person = ({name, number,id}) => {
    const handleDelete =(event) => {
        window.confirm(`Delete ${name}?`)
        ? phonebookService.deletePerson(event.target.value)
        : console.log('no')
        
    }
    return(
      <div>
        {name}  -  {number}     
        <button value={id} onClick={handleDelete} >delete</button>
    </div>
    )
}

export default Person