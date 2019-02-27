function handleCityList(data){
    const completeCityData = data.predictions;
    const filteredSuggestions = completeCityData.map((v)=>v.description);
    return filteredSuggestions;
   }

module.exports = handleCityList;