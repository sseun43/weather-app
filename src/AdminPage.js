
import React, { Component } from 'react';
import Autocomplete from "./Autocomplete";
import './App.css';

class AdminPage extends Component {

    constructor(props){
      super(props)
      this.state = {
        socketStream:[],
        completeCityData:[],
        suggestions:[]
      };
    }

  componentDidMount(){
    const socket = this.props.socket;
    socket.on("FromAPI", data => {
      var upDatedStream = [data].concat(this.state.socketStream);
      this.setState({ 
          socketStream: upDatedStream
        })
    });    
  }

   render(){
    const {suggestions,socketStream} = this.state;
    const {changeCityMethod,loadWeather} = this.props;
    const {loadListOfCities} = this;
      return (
      <div>
        <Autocomplete suggestions={suggestions} changeCityMethod = {changeCityMethod} loadWeather={loadWeather}/>

        <div className="tableDiv">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Time Zone</th>
                <th>Temperature</th>
                <th>Wind Speed</th>
                <th>Time Stamp</th>
              </tr>
            </thead>

            <tbody>
              {socketStream.map((v,i)=>{
                return (
                  <tr key={i}>
                    <td>{v.status}</td>
                    <td>{v.timezone}</td>
                    <td>{v.temp}</td>
                    <td>{v.wind}</td>
                    <td>{v.time}</td>
                  </tr>
                )
              })}
              
            </tbody>
          </table>
         </div> 

        <button type="button" className="block" onClick={this.props.viewMethod}>BACK </button>
      </div>
    );
   } 
}


export default AdminPage