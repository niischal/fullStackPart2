import DisplayCountry from "./DisplayCountry"
import Countries from "./Countries"

const GetCountry = ({filterCountry,filter,handleFilterChange}) => {
    let currentCountry=null
    
    if (filter.length>0){
      if(filterCountry.length===0){
        return <>no such countries</>
      } 
      else if(filterCountry.length===1){
        currentCountry=filterCountry
        return(
          
          <DisplayCountry country= {currentCountry[0]} />
        )
      } 
      else if(filterCountry.length>10){
        return <>too many countries to search</>
      } 
      else {
        return(
            <Countries filterCountry={filterCountry} handleFilterChange={handleFilterChange}/>
        )
      }
    }
}
export default GetCountry