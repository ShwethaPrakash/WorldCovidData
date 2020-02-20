import React from 'react'
import DateTime from 'react-datetime' 
import moment from 'moment'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel' 
import Clock from './Clock.js'

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

        console.log(address)
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
    
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          const json = JSON.parse(xhr.responseText);
          console.log(json)
            if(json.length > 1)
            {
                this.setState({addressLength:json.length, addressList:json});
            }
            else if(json.length == 1)
            {
                this.OnAddressClick(json[0]);
            }        
          });
        const url = 'https://us1.locationiq.com/v1/search.php?key=4422f45283ca3e&q='+address+'&format=json';
        console.log(url)
        // open the request with the verb and the url
        xhr.open('GET',url )
        // send the request
        xhr.send()
      }

      OnSubmitClick()
      {
          const address = document.getElementById('address').value;
          const weatherData = this.getData(address);
          console.log("On Submit click "+weatherData);
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

        console.log("inside OnAddressClick : Loaded value"+this.state.loaded)
          let lat = address.lat;
          let lon = address.lon;
          var weatherReq = new XMLHttpRequest();
          weatherReq.addEventListener('load',()=>{
                let data = JSON.parse(weatherReq.responseText);  
                this.setState({loaded:true,weather:data });  
            });

         const weatherurl  = "https://api.darksky.net/forecast/dfce2fd1c0bc3b83de117d49f2cd1121/"+lat+','+lon;
          weatherReq.open('GET',weatherurl);
          weatherReq.send();

          this.setState({addressLength:0})
      }

      CreateAddressList()
      {
        console.log("inside CreateAddressList : Loaded value"+this.state.loaded)
        console.log("Address List")
        console.log(this.state.addressList);
          return(
                <div className="container ">
                    <ul>
                        {this.state.addressList.map((address,index)=>(
                         <li> <a href="#" className="font-italic text-decoration-none text-justify" onClick={this.OnAddressClick.bind(this,address)} >{address.display_name}</a></li>
                        ))}
                    </ul>
                </div>
            )
      }

      CreateWeeklyForecast(weatherJson)
      {
          console.log("inside CreateWeeklyForecast")
          console.log(weatherJson)
          const weatherData = weatherJson;
          console.log(weatherData.daily.data)
          let currentDate = new Date();

          return(
            <div className="col bg-success">
                <Carousel>
                    {weatherData.daily.data.map((dailyweather, index)=>
                    (
                        <Carousel.Item className="justify-center">
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
           <div>
               <nav class=" navbar bg-dark navbar-dark navbar-expand-sm">
                <div class="container">
                        <a href="#" class="navbar-brand">
                            <img src={require("./imgs/weatherlogo.png")} style={{width:40}} />
                        </a>
                        <div class="navbar-nav justify-content-end">
                            <a class="nav-link nav-item active" href="#">Home</a>
                            <a class="nav-link nav-item" href="#">About</a>
                            <a class="nav-link nav-item" href="#">Contact</a>
                        </div>
                    </div>
               </nav>

            <div className="container" style={{"padding-top": 10 }}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input type="address" class="form-control" id="address" aria-describedby="addressHelp" placeholder="Enter Address"></input>
                        </div>  
                        <button type="submit" class="btn btn-primary" onClick={this.OnSubmitClick}>Forecast</button> 

                        <button type="submit" class="btn btn-light" onClick={this.OnClear}>Clear</button>          
                    </div>
                    <div className="col">
                        {this.state.addressLength > 1 ? this.CreateAddressList():null}
                    </div>
                    {this.state.loaded ? this.CreateWeeklyForecast(this.state.weather):null}   
                </div>
               
                        
                
            </div>
            </div>
        )
    }
} 