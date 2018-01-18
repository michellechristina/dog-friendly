var db = require("../models");
const axios = require('axios');

module.exports = function (app) {

 


    // Google Places API search, sends data back to front end (search.js)
    // app.post('/api/search', (req, res) => {
    //     if (!req.body) return res.sendStatus(400)
        
    //     //   console.log("----------------------------");
    //     //   console.log("req.body");
    //     //   console.log(req.body);
    //     //   console.log("----------------------------");
        
          
    //   });



      /// query places DB here
     //GET all places
     app.get("/api/places/:newPlace/:latitude/:longitude", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.places.findAll({})
            .then(function (dbPlaces) {
            // We have access to the todos as an argument inside of the callback function

            axios({
                method: 'get',
                url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                params: {
                  location: `${req.params.latitude},${req.params.longitude}`,
                  radius: 5000,
                  key: "AIzaSyDF3cJTRy-rvv-j_2VUSZJs22QjvRzVVcg",
                  name: req.params.newPlace
                }
              })
                .then(function (response) {
                  const googlePlaces = response.data.results;
                  console.log("===================")
                  console.log("DATA:")
                  console.log(googlePlaces); 

                  let spotIds = [];

                  googlePlaces.filter(function(gPlace) {
                    return dbPlaces.filter(function(dbPlace) {
                        if (gPlace.place_id === dbPlace.place_id ) {
                        spotIds.push(gPlace);
                      }
                    })
                  });
                 console.log("SPOTIDS")
                 console.log(spotIds);
                })
                .catch(function (error) {
                //   console.log(error);
                });

            res.json(dbPlaces);
        });
    });
    console.log("===================")
    console.log("PLACES:")
    // console.log(dbPlaces.place_id[0]);

    //empty array to catch matching place id from google places & places DB
var matchedSpots =[];




};