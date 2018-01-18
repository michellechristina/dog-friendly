var db = require("../models");
const axios = require('axios');
const fs= require('fs');

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
        console.log(req.params);
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
                    console.log("===================")
                    console.log("RESPONSE:")
                    console.log(response.data); 
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

                  // if spotIds.length is greater than 0, then you have a known ruff spot
                  if (spotIds.length>0) {

                    
                    var ruffSpots = [
                        {
                            place_id: "jrkwoh4rhiyir9fw",
                            name: "Rochester Commons",
                        },
                        {
                            place_id: "hjkhjkhui2342uihu",
                            name: "Rochester Opera House",
                        }
                    ];
                    var obj = {};
                    obj.data = ruffSpots;
                    obj.ruffSpots = true;

                    res.send(obj);
                  }


                  // ELSE you have no known ruff spots. return 5 google places to Search Results 2B
                  else {
                      // the whole google place object. limit to 5.
                    var googleSpotsNoKnownRuffSpots = [
                        {
                            place_id: "jrkwoh4rhiyir9fw",
                            name: "We are in data set 2 Commons",
                        },
                        {
                            place_id: "hjkhjkhui2342uihu",
                            name: "No Know Ruff Spots",
                        }
                    ];
                    var obj = {};
                    obj.data = googleSpotsNoKnownRuffSpots;
                    obj.ruffSpots = false;

                    res.send(obj);
                  }




                })
                .catch(function (error) {
                //   console.log(error);
                });

            // res.json(dbPlaces);
        });
    });
    console.log("===================")
    console.log("PLACES:")
    // console.log(dbPlaces.place_id[0]);

    //empty array to catch matching place id from google places & places DB
var matchedSpots =[];




};