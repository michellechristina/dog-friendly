var db = require("../models");
const axios = require('axios');

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


    // Google Places API search, sends data back to front end (search.js)
    app.post('/api/search', (req, res) => {
        if (!req.body) return res.sendStatus(400)
        
        //   console.log("----------------------------");
        //   console.log("req.body");
        //   console.log(req.body);
        //   console.log("----------------------------");
        
          axios({
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            params: {
              location: `${req.body.latitude},${req.body.longitude}`,
              radius: 5000,
              key: "AIzaSyDF3cJTRy-rvv-j_2VUSZJs22QjvRzVVcg",
              name: req.body.newPlace
            }
          })
            .then(function (response) {
              const data = response.data.results;
            //   console.log(data);
              res.send(data);
            })
            .catch(function (error) {
            //   console.log(error);
            });
      });

};