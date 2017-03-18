var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var request = require("request");
var unirest = require('unirest');
var axios=require('axios');

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

db.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
        console.log(data.length);

        for (var i = 0; i < data.length; i++) {
            if (data[i].latLong.length > 3) {
                var latLong = data[i].latLong.split(",");

                console.log("latLong" + latLong);
                var latitude = latLong[0].split(":");
                latitude = latitude[1];
                var longitude = latLong[1].split(":");
                longitude = longitude[1];

                db.Park.create({
                    park_id: data[i].parkCode,
                    park_name: data[i].fullName,
                    description: data[i].description,
                    latitude: latitude,
                    longitude: longitude,
                    state: data[i].states,
                    directions_info: data[i].directionsInfo,
                    url: data[i].url,
                    directions_url: data[i].directionsUrl,
                    weather_info: data[i].weatherInfo
                })
            }
        }
    });
});
