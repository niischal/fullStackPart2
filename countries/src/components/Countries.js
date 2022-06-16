

const Countries = ({filterCountry,handleFilterChange}) => {
    let currentCountry=null
    currentCountry=filterCountry
        return currentCountry.map(country => (
        <div key={country.numericCode}>
            {country.name} 
            <button value={country.name} onClick={handleFilterChange}>Show</button>
        </div>
    ))
}

export default Countries