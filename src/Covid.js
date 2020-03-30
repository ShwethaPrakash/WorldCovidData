import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirus} from '@fortawesome/free-solid-svg-icons'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './weather.css'

const CovidService = ()=>{
    const [countrySpecificData, setCountryData] = useState({country:"",todayCases:"",cases:"",deaths:"",todayDeaths:"",recovered:""})
    const [covidData, setCovidData] = useState(()=>LoadCovidData())

    function LoadCovidData()
    {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        let data = [];
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            
          // update the state of the component with the result here
            data = JSON.parse(xhr.responseText);
            setCovidData(data);
          });
        const url = 'https://coronavirus-19-api.herokuapp.com/countries';
        // open the request with the verb and the url
        xhr.open('GET',url )
        // send the request
        xhr.send()
         
        return data;
    }

    function DisplayCovidDetails()
    {
        return(

            <div className="text-dark ">
                {typeof countrySpecificData.error != 'undefined'? <h6>{countrySpecificData.error}</h6> : null}
                <h4 className="">{countrySpecificData.country}</h4>
                <p>Total Cases : {countrySpecificData.cases }</p>
                <p>Todays Cases : {countrySpecificData.todayCases }</p>
                <p>Total deaths : {countrySpecificData.deaths }</p>
                <p>Todays deaths : {countrySpecificData.todayDeaths }</p>
                <p>Recovered : {countrySpecificData.recovered }</p>
            </div>

        );
    }
    function FectchCountryWiseData(country)
    {
            var countryData = covidData.filter((e)=>e.country.toUpperCase() === country.toUpperCase())
            if(typeof countryData[0] != 'undefined')
            {
                 setCountryData(countryData[0])
            }
            else
            {
                setCountryData({country:"",todayCases:"",cases:"",deaths:"",todayDeaths:"",recovered:"", error:"No Data for this country."});
            }
    }   

    return(
        <div id="covidDiv">
            <h4 className="text-dark"> <FontAwesomeIcon icon={faVirus}></FontAwesomeIcon> Covid-19</h4>
            <select className="form-control" style={{"width":200}} onChange={(e)=>FectchCountryWiseData(e.target.value)}>
                <option>---select---</option>
                {
                    covidData.map((h, i) => 
                    (<option key={i} value={h.country}>{h.country}</option>))
                }
            </select>
            {
                countrySpecificData!=[] ? DisplayCovidDetails(): null
            }
        </div>
    );  
}  



     
export default CovidService;