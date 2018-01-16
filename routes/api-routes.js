var db = require("../models");
const axios = require('axios');

module.exports = function (app) {

    //Fetches all places from the DB
    app.get('/api/places', function (req, res) {
        db.Places.findAll().then(function (placesdb) {
            res.json(placesdb);
        })
    });

    app.get('/api/reviews', function (req, res) {
        db.Reviews.findAll().then(function (reviewsdb) {
            res.json(reviewsdb);
        })
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