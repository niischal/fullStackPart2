import DisplayCountry from "./DisplayCountry"

const Countries = ({filterCountry,handleFilterChange}) => {
    const handleShowClick = (country) => {
        return <DisplayCountry country={country}/>
    }
    console.log(handleShowClick(filterCountry[0]))

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