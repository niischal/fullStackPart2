import axios from "axios"
import { useState, useEffect } from "react"

const DisplayCountry = ({country}) => {
  const [weather, setWeather]=useState([])
    const hook = () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=`)
        .then(response => setWeather(response))
    }
    useEffect(hook,[])
    console.log(weather)
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

  export default DisplayCountry