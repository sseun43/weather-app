function getBackGroundImage(condition){
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

module.exports = getBackGroundImage;