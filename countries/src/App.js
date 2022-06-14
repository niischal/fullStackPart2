import {useState,useEffect} from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => {
  console.log(country)
  return( 
  <div>
    <div>
      <h1>{country.name}</h1>
    </div>
    <div>
      <p>Capital : {country.capital}</p>
      <p>Area : {country.area}</p>
    </div>
    <div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lang=> <li key={lang.iso639_2}>{lang.name}</li>)}
      </ul>
    </div>
    <div>
      <img src={country.flags.png} alt={country.name}/>
    </div>
  </div>
  )
}



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

  const getCountry = () => {
    let currentCountry=null
    
    if (filter.length>0){
      if(filterCountry().length===0){
        return <>no such countries</>
      } 
      else if(filterCountry().length===1){
        currentCountry=filterCountry()
        return(
          
          <DisplayCountry country= {currentCountry[0]} />
        )
      } 
      else if(filterCountry().length>10){
        return <>too many countries to search</>
      } 
      else {
        currentCountry=filterCountry()
        return currentCountry.map(country => (
          <div key={country.cioc}>
            {country.name}
          </div>
        ))
      }
    }
    
      
    
  }
  

  return(
    <div>
      <div>Find Countries:  <input value={filter} onChange={handleFilterChange}/></div>
      <div>{getCountry()}</div>
    </div>
  )
}

export default App;
