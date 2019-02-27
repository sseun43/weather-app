function getDayNameFromUnixTime(unixTime){
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(unixTime);
      var dayName = days[d.getDay()];
      return dayName.slice(0,3);
  }

module.exports = getDayNameFromUnixTime