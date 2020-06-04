import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import India from "@svg-maps/india";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { RadioSVGMap, SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

const IndiaMap = ((props)=>
 {
   const [covidData,setCovidData] = useState(India);
   const[confirmedCases, setConfirmedCases] = useState();
   const[activeCases, setactiveCases] = useState();
   const[recoveredCases, setrecoveredCases] = useState();
   const[deaths, setdeaths] = useState();

   useEffect(()=>{
    loadCovidDetails();
   })
   
   function mergeDataAndSetState(data)
   {
    let IndiaCovidData = 
    {
      label:"India COVID 19 Data",
      viewBox : India.viewBox,
      locations : []
    }
     India.locations.map((location)=>{
       let stateWiseData = {
         ...data.state_wise[location.name],
         ...location
      }
      IndiaCovidData.locations.push(stateWiseData);
     })

     setCovidData(IndiaCovidData);
   }

   function loadCovidDetails()
    {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        let data = [];

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            data = JSON.parse(xhr.responseText);
            mergeDataAndSetState(data);
          });
        const url = 'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india';

        // open the request with the verb and the url
        xhr.open('GET',url )
        xhr.setRequestHeader("X-RapidAPI-Key","076229d9bemshf401c028a607da0p1771c7jsn150bcce03b45")
        xhr.setRequestHeader("x-RapidAPI-host","corona-virus-world-and-india-data.p.rapidapi.com")

        // send the request
        xhr.send();

        return data;
    }
    function displayCovidData(data)
    {
        covidData.locations.find((stateData)=>{return stateData.state == data.name})
    }
    return(
      <div className="container">
        <div className="row">
          <div className="col" style={{"height":100}}>

          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col">
            <div className="container">
              <div className="row ">
                <div className="col ">
                 <div className="d-inline-block stats confirmedStats"><h5>Confirmed</h5><p>{confirmedCases}</p></div>
                  <div className="d-inline-block stats activeStats"><h5>Active</h5><p>{activeCases}</p></div>
                  <div className="d-inline-block stats recoveredStats"><h5>Recovered</h5>{recoveredCases}</div>
                  <div className="d-inline-block stats deathsStats "><h5>Deaths</h5><p>{deaths}</p></div>
                </div>
              </div>
              <div className="row">
                <div className="col">
              <RadioSVGMap map={covidData}       
                onChange={(d)=>{console.log(d)}}/>
                </div>
              </div>
            </div>
            
      </div>
      <div className="col">


      </div>
      </div>
      </div>
      
    )

  })

  export default IndiaMap;