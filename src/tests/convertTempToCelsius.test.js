const convertTempToCelsius = require('./convertTempToCelsius');

test('equalZeroFor32Fahrenheit',()=>{
	expect(convertTempToCelsius(32)).toBe(0);
});