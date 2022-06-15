import {useState,useEffect} from 'react'
import axios from 'axios'
import GetCountry from './components/GetCountry'


const App = () => {
  const [countries,setCountries]= useState([])
  const [filter,setFilter]= useState('')
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook,[])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterCountry = () => {
    return(
      countries.filter(country => {
        return(
          country.name.toLowerCase().includes(filter.toLowerCase())
        )})
    )
  }

  

  return(
    <div>
      <div>Find Countries:  <input value={filter} onChange={handleFilterChange}/></div>
      <div><GetCountry filter={filter} filterCountry={filterCountry()} handleFilterChange={handleFilterChange}/></div>
    </div>
  )
}

export default App;
