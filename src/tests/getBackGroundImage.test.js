const getBackGroundImage = require('./getBackGroundImage');

test('equalBackGroundImage',()=>{
	expect(getBackGroundImage("rain")).toBe("url(https://upload.wikimedia.org/wikipedia/commons/6/65/Black_Rain_Clouds.jpg)");
});