var db = require("../models");

module.exports = function (app) {

    //GET all indoor places
    app.get("/api/allIndoors", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.Indoors.findAll({}).then(function (dbIndoors) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbIndoors);
        });
    });

    //GET all outdoor places
    app.get("/api/allOutdoors", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.Outdoors.findAll({}).then(function (dbOutdoors) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbOutdoors);
        });
    });


    // POST a new place to indoors table
    app.post("/api/new/indoors", function (req, res) {

        db.Todo.create({
            name: req.body.name,
            location: req.body.location,
            dogFriendly: true,
            rating: 5
        }).then(function (dbIndoors) {
            // Allows access to new entry 
            res.json(dbIndoors);
        })
            .catch(function (err) {
                // If an error occurs, throw it
                res.json(err);
            });
    });

};