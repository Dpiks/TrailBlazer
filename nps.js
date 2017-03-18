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
            	res.append('park code = '+ filter[i].parkCode + "     "+ 
            		'park code = '+ filter[i].parkCode+ "     "+
            		'weather info = '+ filter[i].weatherInfo+ "     "+
            		'state = '+ filter[i].states+ "     "+
            		'latLong= '+ filter[i].latLong);
            	// console.log('park code = '+ filter[i].parkCode);
            	// console.log('full name = '+ filter[i].fullName);
            	// console.log('weather info = '+ filter[i].weatherInfo);
            	// console.log('state = '+ filter[i].states);
            	// console.log('latLong= '+ filter[i].latLong);

            }
            
        });
};


app.get('/nps', NPSaxios) /*app.get*/



app.listen(port, function() {
    console.log("App listening on PORT " + port);
});