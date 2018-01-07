var db = require("../models");

module.exports = function(app) {

    //Get all indoor places
    app.get("/api/allIndoors", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.indoors.findAll({}).then(function(dbIndoors) {
          // We have access to the todos as an argument inside of the callback function
          res.json(dbIndoors);
        });
      });

    //Get all outdoor places
    app.get("/api/allOutdoors", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.outdoors.findAll({}).then(function(dbOutdoors) {
          // We have access to the todos as an argument inside of the callback function
          res.json(dbOutdoors);
        });
      });

};