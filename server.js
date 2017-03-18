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

// request("https://api.transitandtrails.org/api/v1/trailheads?key=91997658eaba148bf2c1cf238dff88f44e52ad0978dc4290dabfb189ff32d605", function(err, body, response) {
// 	    console.log(typeof(response));
// 	    console.log(body);
//   			response = JSON.parse(response);

//   			// response.forEach(function(arrayItem) {
//    		// 	console.log(arrayItem.id);     
//    		// });

// 	})



db.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
        unirest.get("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[country_cont]=United+States")
            .header("X-Mashape-Key", "1EUZc9Yh0Dmsh3NULqLjzLCBf7rsp1iedcgjsnE14nUri24ZVA")
            .header("Accept", "text/plain")
            .end(function(result) {
            	 console.log(result.body.places.length);
            	// var data=result.body;
            	// for(var i=0;i<data.places)
            	// console.log(result.body.places[0]);
                // console.log(result.body[0].places.length);
                // console.log(result.body.places.length);
                // console.log(result.body.places.length);
                // for(var i=0;i<result.places.length;i++)
                //  result.forEach(function(arrayItem) {
                //  	for()
//             // 	db.Trail.create({
//             // 		trail_id:arrayItem.id,
//             // 		trail_name:arrayItem.name,
//             // 		description:arrayItem.description,
//             // 		latitude:arrayItem.latitude,
//             // 		longitude:arrayItem.longitude,
//             // 		park_name:arrayItem.park_name,
//             // 		distance:arrayItem.distance,
//             // 		url:arrayItem.park_agency_website
//             // 	}).then(function(data){
//             //     		console.log("Rows inserted successfully!!");
//             // 	})       
//             // });
            });
    });
});








// // Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(function() {
//     app.listen(port, function() {
//         console.log("App listening on PORT " + port);
//         request("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[country_cont]=United+States", function(err, response, body) {
//             console.log(typeof(body));
//             body = JSON.parse(body);
//             console.log(body);
//             // body.forEach(function(arrayItem) {
//             // 	db.Trail.create({
//             // 		trail_id:arrayItem.id,
//             // 		trail_name:arrayItem.name,
//             // 		description:arrayItem.description,
//             // 		latitude:arrayItem.latitude,
//             // 		longitude:arrayItem.longitude,
//             // 		park_name:arrayItem.park_name,
//             // 		distance:arrayItem.distance,
//             // 		url:arrayItem.park_agency_website
//             // 	}).then(function(data){
//             //     		console.log("Rows inserted successfully!!");
//             // 	})       
//             // });

//         })
//     });
// });
