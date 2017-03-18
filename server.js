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

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(port, function() {
    console.log("App listening on PORT " + port);

});
