var db = require("../models");
var unirest = require('unirest');


module.exports = function(app) {

    // GET route for getting all of the todos
    //state has to be in 2 letter format ex:DC, CO, MN
    app.get("/api/:state", function(req, res) {
        db.Park.findAll({
            where: {
                state: req.params.state
            }
        }).then(function(results) {
            res.json(results);
        });

    });

    app.get("/api/:latitude/:longitude", function(req, res) {
    	var latitude=req.params.latitude;
    	var longitude=req.params.longitude;
        unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=" + latitude + "&limit=25&lon=" + longitude + "&q[activities_activity_type_name_eq]=hiking&radius=50")
            .header("X-Mashape-Key", "1EUZc9Yh0Dmsh3NULqLjzLCBf7rsp1iedcgjsnE14nUri24ZVA")
            .header("Accept", "text/plain")
            .end(function(result) {                
                res.json(result.body);
            });      

    });


}
