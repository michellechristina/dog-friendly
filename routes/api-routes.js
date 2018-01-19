var db = require("../models");
const axios = require('axios');
const fs = require('fs');

module.exports = function (app) {

    //Fetches all places from the DB
    app.get('/api/places', function (req, res) {
      db.places.findAll().then(function (placesdb) {
          res.json(placesdb);
      })
  });

  app.get('/api/reviews', function (req, res) {
      db.reviews.findAll().then(function (reviewsdb) {
          res.json(reviewsdb);
      })
  });

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
    // console.log(req.params);

    db.places.findAll({
        include: [db.reviews]
      })
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

            let ruffSpotsInGooglePlaces = [];
            debugger
            googlePlaces.filter(function (gPlace) {
              return dbPlaces.filter(function (dbPlace) {

                if (gPlace.place_id === dbPlace.place_id) {
                  var comboPlace = Object.assign({}, gPlace, dbPlace);

                  console.log("===================")
                  console.log("comboPlace:")
                  console.log(comboPlace)
                  // ruffSpotsInGooglePlaces.push(comboPlace);
                  ruffSpotsInGooglePlaces.push(gPlace);
                }
              })
            });

            console.log("ruffSpotsInGooglePlaces");
            console.log(JSON.stringify(ruffSpotsInGooglePlaces, null, 2));

            // if ruffSpotsInGooglePlaces.length is greater than 0, then you have a known ruff spot
            if (ruffSpotsInGooglePlaces.length > 0) {

              // this is the browse view object
              var ruffSpots = ruffSpotsInGooglePlaces.map(ruffPlace => {
                var object = {};
                object.place_id = ruffPlace.place_id;
                object.name = ruffPlace.name;
                object.address = ruffPlace.vicinity;
                object.photo = 'https://placehold.it/200x200';
                object.date_added = ruffPlace.created_at;
                object.rating = 5; // this needs to be fixed - average the ratings
                object.reviews = ruffPlace.reviews;
                return object;
              });

              var testRuffSpots = [{
                  place_id: "ChIJ-QHaz2yb4okR_k-QLFvapa4", // google response
                  name: "Rochester Commons", // google response: 
                  address: "195 Ten Rod Road, Rochester", // google response: vicinity
                  rating: 2, // review table: friendly_rating
                  reviews: [{
                      review: "this is a review"
                    },
                    {
                      review: "this is a 2nd review"
                    }
                  ], // review table
                  photo: "<img src='https://placehold.it/200x200' alt=''/>", // ?
                  date_added: "11/20/2017" // places table: created at
                },
                {
                  place_id: "ChIJ-QHaz2yb4okR_k-QLFvapa4", // google response
                  name: "Rochester Opera House", // google response: 
                  address: "195 Main St, Rochester", // google response: vicinity
                  rating: 2, // review table: friendly_rating
                  reviews: [{
                      review: "this is a review"
                    },
                    {
                      review: "this is a 2nd review"
                    }
                  ], // review table
                  photo: "<img src='https://placehold.it/200x200' alt=''/>", // ?
                  date_added: "10/20/2016" // places table: created at
                }
              ];

              var obj = {};
              obj.data = testRuffSpots;
              obj.ruffSpots = true;

              res.send(obj);
            }


            // ELSE you have no known ruff spots. return 5 google places to Search Results 2B
            else {
              // the whole google place object. limit to 5. the results view
              var googleSpotsNoKnownRuffSpots = googlePlaces.map(gPlace => {
                var object = {};
                object.place_id = gPlace.place_id;
                object.name = gPlace.name;
                object.address = gPlace.vicinity;
                object.photo = 'https://placehold.it/200x200'; // probably going to remain hardcoded. this is a separate api call.
                return object;
              });

              // this limits the result to 5 :-)
              googleSpotsNoKnownRuffSpots.length = 5;

              // var googleSpotsNoKnownRuffSpots = [
              //     {
              //         place_id: "ChIJ-QHaz2yb4okR_k-QLFvapa4",  // google response
              //         name: "Rochester Commons", // google response: 
              //         address: "195 Ten Rod Road, Rochester", // google response: vicinity
              //         photo: "<img src='https://placehold.it/200x200' alt=''/>", // ?
              //     },
              //     {
              //         place_id: "ChIJ-QHaz2yb4okR_k-QLFvapa4",  // google response
              //         name: "Rochester Opera House", // google response: 
              //         address: "195 Main St, Rochester", // google response: vicinity
              //         photo: "<img src='https://placehold.it/200x200' alt=''/>", // ?
              //     }
              // ];
              var obj = {};
              obj.data = googleSpotsNoKnownRuffSpots;
              obj.ruffSpots = false;

              res.send(obj);
              // res.send(googlePlaces);
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
  var matchedSpots = [];




};