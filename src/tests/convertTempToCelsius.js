function convertTempToCelsius(temp) {
    return Math.floor((temp - 32) * 5 / 9);
  }

module.exports = convertTempToCelsius;