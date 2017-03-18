var express = require('express');
var app = express();
var axios = require('axios');
var port = process.env.PORT || 3000;

function parkFilter(parks){
	return parks.filter(function(p, i, arr){
		return	p.latLong!=='';
		});
};



// var pFilt = (pArr)=> pArr.filter((p)=> p.latLong!=='');

function NPSaxios(req, res) {
    axios.get('https://developer.nps.gov/api/v0/parks?', {
            headers: {
                'Authorization': 'FF6C5C39-6EA5-47E1-B07C-C70339D68963'
            }
        })
        .then(function(result) {
        	var filter = parkFilter(result.data.data);

            
            for(i=0; i < filter.length; i++){ 
               var latLong = filter[i].latLong.split(",");
               console.log("latLong" + latLong);
               var latitude = latLong[0].split(":");
               latitude = latitude[1];
               var longitude = latLong[1].split(":");
               longitude = longitude[1];

               db.Park.create({
                   park_parkCode: filter[i].parkCode,
                   park_name: filter[i].fullName,
                   description: filter[i].description,
                   latitude: latitude,
                   longitude: longitude,
                   state: fitler[i].states,
                   directions_info: filter[i].directionsInfo,
                   url: filter[i].url,
                   directions_url: filter[i].directionsUrl,
                   weather_info: filter[i].weatherInfo
               })
            }
            
        });
};


app.get('/nps', NPSaxios) /*app.get*/



app.listen(port, function() {
    console.log("App listening on PORT " + port);
});