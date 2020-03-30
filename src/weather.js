import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBroom, faLocationArrow, faMapPin, faCloudSun } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel' 
import './weather.css'
import CovidService from './Covid'

export default class  Weather extends React.Component
{
    constructor(props)
    {
        super(props);

        this.OnSubmitClick = this.OnSubmitClick.bind(this);
        this.OnClear = this.OnClear.bind(this);
        this.state={long:'', lat:'', weather:'',loaded:false, addressLength:0, addressList:null};
    }
     
    getData(address) {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
    
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          const json = JSON.parse(xhr.responseText);
            if(json.length > 1)
            {
                this.setState({addressLength:json.length, addressList:json});
            }
            else if(json.length === 1)
            {
                this.OnAddressClick(json[0]);
            }        
          });
        const url = 'https://us1.locationiq.com/v1/search.php?key=4422f45283ca3e&q='+address+'&format=json';
        // open the request with the verb and the url
        xhr.open('GET',url )
        // send the request
        xhr.send()
      }

        OnSubmitClick()
        {
            const address = document.getElementById('address').value;
            const weatherData = this.getData(address);
        }

      OnClear()
      {
        this.setState({long:'', lat:'', weather:'',loaded:false, addressLength:0, addressList:null});
        document.getElementById('address').value = '';
      }

      FormatDate(currentDate,daystoAdd)
      {
         let displayDate = currentDate.setTime( currentDate.getTime() + daystoAdd * 86400000 );
         return new Date(displayDate);
      }

      OnAddressClick(address)
      {
          let lat = address.lat;
          let lon = address.lon;
          var weatherReq = new XMLHttpRequest();
          weatherReq.addEventListener('load',()=>{
                let data = JSON.parse(weatherReq.responseText);  
                this.setState({loaded:true,weather:data, address: address });  
            });

         const weatherurl  = "https://api.darksky.net/forecast/dfce2fd1c0bc3b83de117d49f2cd1121/"+lat+','+lon;
          weatherReq.open('GET',weatherurl);
          weatherReq.send();

          this.setState({addressLength:0})
      }

      CreateAddressList()
      {
          return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                    <p className="lead"> Did you mean any of the below address ?? </p>
                    <ul className="list-unstyled">
                        {this.state.addressList.map((address,index)=>(
                        <li>
                         <a href="#"  onClick={this.OnAddressClick.bind(this,address)}> <FontAwesomeIcon icon={faLocationArrow} /> <small> {address.display_name} </small></a>
                         </li>  
                        ))}
                    </ul>
                    </div>
                    </div>
                </div>
            )
      }

      CreateWeeklyForecast(weatherJson, address)
      {
          const weatherData = weatherJson;
          let currentDate = new Date();

          return(
            <div className="">
                
                <p  > <FontAwesomeIcon icon={faMapPin} /> <i> {address.display_name} </i> </p>
                <Carousel className="justify-center">
                    {weatherData.daily.data.map((dailyweather, index)=>
                    (
                        <Carousel.Item >
                            <div className="d-block w-100">
                                <h3 >
                                    {moment().add(index,'days').format('MMM Do YYYY')}
                                </h3>  
                                <br></br>  
                                <img  src={require("./weathericons/"+dailyweather.icon+".svg")}></img>
                                <br></br>
                                    <span> Hi {dailyweather.temperatureHigh} &#8457; </span>
                                    <br></br>
                                    <span> Lo {dailyweather.temperatureLow} &#8457;</span>
                                    <br></br>
                                    <span>
                                         {dailyweather.summary}
                                    </span>
                                    </div>
                        </Carousel.Item>
                    ))}
                    </Carousel>
              </div> 

          );
      }

    render()
    {
        return(
            <div className="container" >
                <div style={{"height":50}}>

                </div>
                <div className="row justify-content-around">
                    <div className="col-4 text-dark bg-white border border-dark rounded" style={{"opacity":0.5}} >
                        <div className="" >
                            <h4 className=""> <FontAwesomeIcon icon={faCloudSun}></FontAwesomeIcon> Weather Forecast</h4>
                                <input type="address" id="address" aria-describedby="addressHelp"
                                    placeholder="Enter Address">
                                </input> 
                                <button type="submit" className="btn btn-link d-inline" onClick={this.OnSubmitClick}>
                                    <FontAwesomeIcon icon={faSearch} className="far fa-search" />
                                </button>
                                <button type="submit" className="btn btn-light d-inline" onClick={this.OnClear}>
                                    <FontAwesomeIcon icon={faBroom} />
                                </button>    
                        </div>  
                        <div>
                            {this.state.addressLength > 1 ? this.CreateAddressList():null}
                        </div>
                    </div>
                    <div className="col-4 bg-white  border border-dark rounded" style={{"height":300, "opacity":0.5}}>
                        {this.state.loaded ? this.CreateWeeklyForecast(this.state.weather, this.state.address):null}   
                    </div>
                    <div id="covidData" className="col-3 bg-white  border border-dark rounded pull-right" style={{"height":300, "opacity":0.5}}>
                        <CovidService></CovidService>
                    </div>
                </div>
            </div>
        )
    }
} 