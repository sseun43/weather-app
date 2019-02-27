import React, { Component } from 'react';
import AdminPage from './AdminPage.js';
import socketIOClient from "socket.io-client";
import clearDay from './logos/iconfinder_Sunny_3741356.svg';
import clearNight from './logos/iconfinder_Clearly_Night_3741364.svg';
import rain from './logos/iconfinder_Heavy_Rain_3741348.svg';
import snow from './logos/iconfinder_Snow_3741358.svg';
import sleet from './logos/iconfinder_Light_Snow_3741353.svg';
import wind from './logos/iconfinder_Windy_3741354.svg';
import fog from './logos/iconfinder_Foggy_3741362.svg';
import cloudy from './logos/iconfinder_Overcast_3741359 (1).svg';
import partlyCloudyDay from './logos/iconfinder_Partly_Cloudy_3741357.svg';
import partlyCloudyNight from './logos/iconfinder_Cloudy_Night_3741352.svg';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderAdmin: false,
      currentCity: 'Helsinki',
      loading : true,
      weekWeather:[],
      mainIcon:'',
      currentWindSpeed :'',
      currentCondition:'',
      backGroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/dd/Eduskuntatalo_Helsinki.jpg)'
      
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.loadWeather = this.loadWeather.bind(this);
    this.convertTempToCelsius = this.convertTempToCelsius.bind(this);
    this.changeViewToAdmin = this.changeViewToAdmin.bind(this);
    this.changeViewBackTomainPage = this.changeViewBackTomainPage.bind(this);
    this.changeCurrentCity = this.changeCurrentCity.bind(this);
  }

  getDayNameFromUnixTime(unixTime){
      var reformedUnixTime = Number(unixTime + '000');
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(reformedUnixTime);
      var dayName = days[d.getDay()];
      return dayName.slice(0,3);
  }

  loadWeather(pos) {
    var position = pos.coords.latitude + "," + pos.coords.longitude;
    this.state.socket.emit('latestPosition',position);
    var localAddress = "http://localhost:4001/getWeather/" + position;
    fetch(localAddress)
        .then((response) => {
          return response.json();
        })
        .then(this.handleResponse);
  }

  changeViewToAdmin(){
      this.setState({
        renderAdmin: true
      });
  }

  changeCurrentCity(currentCity){
      this.setState({currentCity});
  }

  changeViewBackTomainPage(){
      this.setState({
        renderAdmin: false
      });
  }

  convertTempToCelsius(temp) {
    return Math.floor((temp - 32) * 5 / 9);
  }

  getBackGroundImage(condition){
    var imageUrlMapping = {
      'clear-day':'url(https://upload.wikimedia.org/wikipedia/commons/4/42/Southern_Helsinki_panorama_2011-06-28_1.jpg)',
      'clear-night':'url(https://upload.wikimedia.org/wikipedia/commons/3/3a/Sunset_in_Coquitlam.jpg)',
      'rain':'url(https://upload.wikimedia.org/wikipedia/commons/6/65/Black_Rain_Clouds.jpg)',
      'snow':'url(https://upload.wikimedia.org/wikipedia/commons/3/37/Morning_Freezing_Fog_in_Elko%2C_Nevada.JPG)',
      'sleet':'url(https://upload.wikimedia.org/wikipedia/commons/0/0b/2014-03-04_06_31_33_Slush_produced_from_a_mixture_of_rain_and_snow_%28Commonwealth_definition_of_sleet%29.JPG)',
      'wind':'url(https://upload.wikimedia.org/wikipedia/commons/8/8b/Windbruch-WJP-1.jpg)',
      'fog':'url(https://upload.wikimedia.org/wikipedia/commons/b/be/Tree_in_field_during_extreme_cold_with_frozen_fog.png)',
      'cloudy':'url(https://upload.wikimedia.org/wikipedia/commons/3/30/Red_Color_in_Gray_Clouds.JPG)',
      'partly-cloudy-day':'url(https://upload.wikimedia.org/wikipedia/commons/2/2f/Sunrise_%28Abbottabad%29.jpg)',
      'partly-cloudy-night': 'url(https://upload.wikimedia.org/wikipedia/commons/8/8a/Sunset_and_Clouds.jpg)'
    };

    return imageUrlMapping[condition];
  }

  getWeatherIcon(condition){
    var svgIconMapping = {
      'clear-day':clearDay,
      'clear-night':clearNight,
      'rain':rain,
      'snow':snow,
      'sleet':sleet,
      'wind':wind,
      'fog':fog,
      'cloudy': cloudy,
      'partly-cloudy-day':partlyCloudyDay,
      'partly-cloudy-night': partlyCloudyNight
    };

    return svgIconMapping[condition];
  }

  handleResponse(wholeWeatherData) {
    console.log(wholeWeatherData);
    var currentCondition = wholeWeatherData.currently.icon;
    var currentWindSpeed = Math.floor(wholeWeatherData.currently.windSpeed);
    var currentTemperature = this.convertTempToCelsius(wholeWeatherData.currently.temperature);
    var currentWeeksweather = wholeWeatherData.daily;
    this.setState({
          loading:false,
          weekWeather: currentWeeksweather.data,
          mainIcon: currentWeeksweather.icon,
          currentCondition : currentCondition,
          currentWindSpeed : currentWindSpeed,
          currentTemperature : currentTemperature
        });
    }

  componentDidMount(){
    const socket = socketIOClient('http://localhost:4001');
    this.setState({socket});  
    navigator.geolocation.getCurrentPosition(this.loadWeather);
  }


  render() {
    var currentDayWeather = this.state.weekWeather;
    var backGroundImage = this.state.backGroundImage;
    var renderAdminState = this.state.renderAdmin;
    var currentCity = this.state.currentCity;
    console.log(currentDayWeather);
    if(this.state.loading){
      return <div class="loader"></div>
    }
    if(renderAdminState){
      return (<AdminPage 
                socket = {this.state.socket}
                viewMethod = {this.changeViewBackTomainPage} 
                changeCityMethod = {this.changeCurrentCity} 
                loadWeather={this.loadWeather}
              />)
    }
    return (
      <div className="gridContainer" style={{'backgroundImage' : this.getBackGroundImage(this.state.currentCondition)}}>
        <div className="mainItem">
          <div className="topLeft">
            <h3 className = "cityHeader">{currentCity}</h3>
            <h4 className = "weatherHeader">{this.state.currentWindSpeed + ' ms'} | {this.state.currentCondition}</h4>
          </div>
          <div className="topRight">
            <button className="btn" onClick={this.changeViewToAdmin}> <i className="material-icons">settings</i></button>
          </div>
          <div className="centered">
            <img src={this.getWeatherIcon(this.state.currentCondition)} alt= {this.state.currentCondition} className="img"/>
          </div>
          <div className="tempText">{this.state.currentTemperature + '°C'}</div>

        </div>

        <div className="secondaryItem">

          {
            currentDayWeather.map((weekday,index) =>(
              <div className="tinyDays" key={index}>
                <p className = "tinyDaytext">{this.getDayNameFromUnixTime(weekday.time)}</p>
                <img src={this.getWeatherIcon(weekday.icon)} alt={weekday.icon} />
                <p className = "tinyTempText">{this.convertTempToCelsius(weekday.temperatureMax)  + '°C'+ ' / ' + this.convertTempToCelsius(weekday.temperatureMin) + '°C'}</p>
              </div>
            ))
          }
                    
        </div>
      </div>
    );
  }
}

export default App;
