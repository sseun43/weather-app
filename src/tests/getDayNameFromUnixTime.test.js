const getDayNameFromUnixTime = require('./getDayNameFromUnixTime');

test('equalCurrentWeatherObj',()=>{
	expect(getDayNameFromUnixTime(new Date().getTime())).toBe("Wed");
});