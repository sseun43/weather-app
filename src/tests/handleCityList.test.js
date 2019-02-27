const handleCityList = require('./handleCityList');

var data = {
  "predictions": [
    {
      "description": "Helsinki, Finland",
      "id": "a88c998a95685a43779840919259d41788eb8210",
      "matched_substrings": [
        {
          "length": 3,
          "offset": 0
        }
      ],
      "place_id": "ChIJkQYhlscLkkYRY_fiO4S9Ts0",
      "reference": "ChIJkQYhlscLkkYRY_fiO4S9Ts0",
      "structured_formatting": {
        "main_text": "Helsinki",
        "main_text_matched_substrings": [
          {
            "length": 3,
            "offset": 0
          }
        ],
        "secondary_text": "Finland"
      },
      "terms": [
        {
          "offset": 0,
          "value": "Helsinki"
        },
        {
          "offset": 10,
          "value": "Finland"
        }
      ],
      "types": [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      "description": "Helsingborg, Sweden",
      "id": "7e263592c44c77964614f903b0f6562b93ed49ad",
      "matched_substrings": [
        {
          "length": 3,
          "offset": 0
        }
      ],
      "place_id": "ChIJJSmiUHotUkYRkHoOKXiQAQQ",
      "reference": "ChIJJSmiUHotUkYRkHoOKXiQAQQ",
      "structured_formatting": {
        "main_text": "Helsingborg",
        "main_text_matched_substrings": [
          {
            "length": 3,
            "offset": 0
          }
        ],
        "secondary_text": "Sweden"
      },
      "terms": [
        {
          "offset": 0,
          "value": "Helsingborg"
        },
        {
          "offset": 13,
          "value": "Sweden"
        }
      ],
      "types": [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      "description": "Helmond, Netherlands",
      "id": "e3a691307bae58fcb7c8b937d89c23ebf912a0b3",
      "matched_substrings": [
        {
          "length": 3,
          "offset": 0
        }
      ],
      "place_id": "ChIJIYnWquQjx0cReFJWVYDpFCU",
      "reference": "ChIJIYnWquQjx0cReFJWVYDpFCU",
      "structured_formatting": {
        "main_text": "Helmond",
        "main_text_matched_substrings": [
          {
            "length": 3,
            "offset": 0
          }
        ],
        "secondary_text": "Netherlands"
      },
      "terms": [
        {
          "offset": 0,
          "value": "Helmond"
        },
        {
          "offset": 9,
          "value": "Netherlands"
        }
      ],
      "types": [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      "description": "Hellerup, Denmark",
      "id": "a218bc907409a7f2c67a367213ae6d56958b4dcc",
      "matched_substrings": [
        {
          "length": 3,
          "offset": 0
        }
      ],
      "place_id": "ChIJa6109XhSUkYRRFX1Zps-vmc",
      "reference": "ChIJa6109XhSUkYRRFX1Zps-vmc",
      "structured_formatting": {
        "main_text": "Hellerup",
        "main_text_matched_substrings": [
          {
            "length": 3,
            "offset": 0
          }
        ],
        "secondary_text": "Denmark"
      },
      "terms": [
        {
          "offset": 0,
          "value": "Hellerup"
        },
        {
          "offset": 10,
          "value": "Denmark"
        }
      ],
      "types": [
        "locality",
        "political",
        "geocode"
      ]
    },
    {
      "description": "Helena, MT, USA",
      "id": "8a426c1eed31d4f9e325748b68e1e33e5a5dff31",
      "matched_substrings": [
        {
          "length": 3,
          "offset": 0
        }
      ],
      "place_id": "ChIJTdvH7Q9RQ1MRFPf943EdTCE",
      "reference": "ChIJTdvH7Q9RQ1MRFPf943EdTCE",
      "structured_formatting": {
        "main_text": "Helena",
        "main_text_matched_substrings": [
          {
            "length": 3,
            "offset": 0
          }
        ],
        "secondary_text": "MT, USA"
      },
      "terms": [
        {
          "offset": 0,
          "value": "Helena"
        },
        {
          "offset": 8,
          "value": "MT"
        },
        {
          "offset": 12,
          "value": "USA"
        }
      ],
      "types": [
        "locality",
        "political",
        "geocode"
      ]
    }
  ],
  "status": "OK"
}

test('equalCityArray',()=>{
	expect(handleCityList(data)).toContain('Helsinki, Finland');
});