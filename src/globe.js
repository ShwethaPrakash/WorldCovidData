import React, { useState, useEffect } from 'react'
import Globe from 'react-globe.gl';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import countries  from './contries.json'

const GlobalData = ((props)=>{
    const [covidData, setCovidData] = useState(()=>LoadCovidData())

    function MergeData(data)
    {
        let newCountriesData = [];

        data.map((covidCountry)=>{
          let latLonCountryData = countries.find((country)=>{return country.country === covidCountry.country 
            || country.alpha3 === covidCountry})            
            let mergedCountryData = {...covidCountry, ...latLonCountryData};
            newCountriesData.push(mergedCountryData);
          })

          return newCountriesData;
        
    }

    function LoadCovidData()
    {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        let data = [];
        let newCountriesData = []
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            
          // update the state of the component with the result here
            data = JSON.parse(xhr.responseText);
            newCountriesData = MergeData(data);
            setCovidData(newCountriesData);
          });
        const url = 'https://coronavirus-19-api.herokuapp.com/countries';
        // open the request with the verb and the url
        xhr.open('GET',url )
        // send the request
        xhr.send()
         
        return newCountriesData;
    }

    useEffect(() => {
        let script = document.createElement('script');
        script.src = "//unpkg.com/react@16/umd/react.production.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.src = "//unpkg.com/react-dom@16/umd/react-dom.production.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.src = "//unpkg.com/babel-standalone";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.src = "//unpkg.com/d3";
        script.async = true;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        }
      }, []);
      
    return(
        <Globe
                    
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                    pointsData={covidData}
                  pointLabel={(d)=>{   return `${d.country} <br>  Cases: ${d.cases} <br> Today's Cases: ${d.todayCases} <br> Deaths : ${d.deaths}
                  <br> Todays Deaths : ${d.todayDeaths}`  }}
                    pointLat = "latitude"
                    pointLng = "longitude"
                    pointColor = {(d)=> d.deaths>1000 ? '#8B0000': '#ffffaa'}
                    pointAltitude = {d => d.cases * 0.0001}

                    labelsData = {covidData}
                    labelLat = "latitude"
                    labelLng = "longitude"
                    labelText = {(d)=> d.country}
    />
    )
})
export  default GlobalData;