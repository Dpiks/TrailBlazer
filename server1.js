var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var request = require("request");
var unirest = require('unirest');
var axios = require('axios');

var app = express();

app.use(express.static(__dirname + '/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Requiring our models for syncing
var db = require("./models");

var port = process.env.PORT || 3000;

function parkFilter(parks) {
    return parks.filter(function(p, i, arr) {
        return p.latLong !== '';
    });
};


function NPSaxios(req, res) {
    axios.get('https://developer.nps.gov/api/v0/parks?', {
            headers: {
                'Authorization': 'FF6C5C39-6EA5-47E1-B07C-C70339D68963'
            }
        })
        .then(function(result) {
            var filter = result.data.data;
            console.log(filter.length);
            for (i = 0; i < filter.length; i++) { 
                console.log(filter[i].parkCode);                   
                if (filter[i].latLong.length > 3) {
                    var latLong = filter[i].latLong.split(",");
                    console.log("latLong" + latLong);
                    var latitude = latLong[0].split(":");
                    latitude = latitude[1];
                    var longitude = latLong[1].split(":");
                    longitude = longitude[1];
                    console.log(latitude,longitude);

                    db.Park.create({
                        park_id: filter[i].parkCode,
                        park_name: filter[i].fullName,
                        description: filter[i].description,
                        latitude: latitude,
                        longitude: longitude,
                        state: filter[i].states,
                        directions_info: filter[i].directionsInfo,
                        url: filter[i].url,
                        directions_url: filter[i].directionsUrl,
                        weather_info: filter[i].weatherInfo
                    })
                }
            }

        });
};

db.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
        NPSaxios();
    });
});
