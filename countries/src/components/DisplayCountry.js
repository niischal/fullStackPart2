import axios from "axios"
import { useState, useEffect } from "react"

const DisplayCountry = ({country}) => {
  const [weather, setWeather]=useState([])
    useEffect( () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => setWeather(response.data))
    },[country.name])
    
    if(weather.length===0){
      return( 
        <div>
          <div>
           <CountryDetails country={country}/>
          </div>
          <div>
            <img src={country.flags.png} alt={country.name}/>
          </div>
          <div>
            <h3>Loading ...</h3>
          </div>
        </div>
      )
    }else  { 
      return(
        <div>
          <CountryDetails country={country}/>
          <div>
          <h3>Weather in {country.name}</h3>
          <p>Temperature: {(weather.main.temp-273.15).toFixed(2)} Celsius </p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` } alt={weather.weather.main}/>
          <p>wind {weather.wind.speed} m/s </p>
          </div> 
        </div>
      )}
      }
  const CountryDetails = ({country}) => {
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