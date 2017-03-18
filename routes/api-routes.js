var db = require("../models");


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
}
