var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var request = require("request");

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

var port = process.env.PORT || 3000;

var transitAndTrails = {
    url: "http://api.transitandtrails.org/api/v1/",
    apikey: "91997658eaba148bf2c1cf238dff88f44e52ad0978dc4290dabfb189ff32d605",
}

app.get("/", function(req, res) {
    request("https://api.transitandtrails.org/api/v1/trailheads?key=91997658eaba148bf2c1cf238dff88f44e52ad0978dc4290dabfb189ff32d605", function(err, body, response) {
        // if (!error && response.statusCode === 200) {
        	console.log(typeof(response));
        	response=JSON.parse(response);
        response.forEach(function(arrayItem) {
            var x = arrayItem.name;
            var y=arrayItem.park_name;
            console.log(x + " - " + y);
        });
       

        // console.log(JSON.parse(response).name);
        // foreach(response) {
        //     console.log(response.name + " - " + response.park_name);
        // }
        // console.log(body.length);
        // console.log(JSON.parse(body).length);
        // console.log("The movie's rating is: " + JSON.parse(body).name);
        // }
    })
})

app.listen(port, function() {
    console.log("App listening on PORT " + port);
});
