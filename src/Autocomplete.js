import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import './App.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      completeCityData:[],
      showSuggestions: false,
      userInput: ""
    };
    this.loadListOfCities = this.loadListOfCities.bind(this);
    this.handleCityList = this.handleCityList.bind(this);
    this.getPlaceId = this.getPlaceId.bind(this);
    this.loadPlaceLocation = this.loadPlaceLocation.bind(this);
  }

    loadListOfCities(value) {
      const localAddress = "http://localhost:4001/cityList/" + value;
      fetch(localAddress)
          .then((response) => {
            return response.json();
          })
          .then(this.handleCityList);
    }

   handleCityList(data){
    const completeCityData = data.predictions;
    const filteredSuggestions = completeCityData.map((v)=>v.description);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      completeCityData,
      showSuggestions: true
    });
   }

   getPlaceId(city){
    const aSelectedCity = this.state.completeCityData.filter((v)=>{
      return v.description === city
    })
    return aSelectedCity[0].place_id;
   }

   loadPlaceLocation(value) {
      const localAddress = "http://localhost:4001/getCityLocation/" + value;
      fetch(localAddress)
          .then((response) => {
            return response.json();
          })
          .then(this.props.loadWeather);
    }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    this.loadListOfCities(userInput); 
    this.setState({userInput});
  };

  onClick = e => {
    const userInput = e.currentTarget.innerText;
    this.props.changeCityMethod(userInput);
    const placeId = this.getPlaceId(userInput);
    this.loadPlaceLocation(placeId);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;  
    if (e.keyCode === 13) { // User pressed the enter key, update the input and close the
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    
    else if (e.keyCode === 38) { // User pressed the up arrow, decrement the index
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    
    else if (e.keyCode === 40) { // User pressed the down arrow, increment the index
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;