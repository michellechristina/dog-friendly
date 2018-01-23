var db = require("../models");
const axios = require('axios');
const fs = require('fs');

module.exports = function (app) {


  // Get all places from the Places Table in the DB
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

  app.put("/api/places/:placeID/:category", function (req, res) {
    //Add the new place to the Places DB
    db.places.create({
      place_id: req.params.placeID,
      category: req.params.category
    }).then(function (newPlace) {
      res.json(newPlace);
    })
  })



  //GET all places with the passed in params
  app.get("/api/places/:newPlace/:latitude/:longitude", function (req, res) {

    // findAll returns all entries for the PLACES table as well as associated REVIEW table entries
    db.places.findAll({
        include: [db.reviews]
      })
      // pass in our collected database data
      .then(function (dbPlaces) {
        // And then we make a GET request to google places api with the original params passed in.
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
          // another promise. Pass in our google places api response. dbPlaces data is still in scope
          .then(function (response) {
            const googlePlaces = response.data.results;

            // this is where our google places objects that match with our ruff spots in PLACES table will go
            let ruffSpotsInGooglePlaces = [];

            // Here we filter google places results and PLACES table results.
            // Loop thru both arrays on filtered element (PLACE_ID), if matches are found
            // combine google places object with PLACES table object into the comboPlace variable
            // Push comboplaces into ruffSpotsInGooglePlaces array
            googlePlaces.filter(function (gPlace) {
              return dbPlaces.filter(function (dbPlace) {

                if (gPlace.place_id === dbPlace.place_id) {
                  var comboPlace = Object.assign({}, gPlace, dbPlace);

                  ruffSpotsInGooglePlaces.push(comboPlace);
                  // debugger
                }
              })
            });

            // if ruffSpotsInGooglePlaces.length is greater than 0, then you have a known ruff spot
            if (ruffSpotsInGooglePlaces.length > 0) {

              // this is the browse view object. BROWSE = Known ruff spot (Already in Places Table)
              var ruffSpots = ruffSpotsInGooglePlaces.map(ruffPlace => {
                var object = {};
                object.place_id = ruffPlace.place_id;
                object.name = ruffPlace.name;
                object.address = ruffPlace.vicinity;
                object.photo = 'https://placehold.it/200x200';
                object.date_added = ruffPlace.dataValues.createdAt;
                // here we are using .map to mutate the data a bit. this returns an array of ratings
                object.rating = ruffPlace.reviews.map(review => {
                  return review.dataValues.friendly_rating;
                });
                object.reviews = ruffPlace.reviews.map(review => {
                  return review.dataValues.review;
                });

                return object;

              });

              // there are ruff spots, stuff them into a variable & send them back to frontend
              // these are key value pairs being passed back.
              var obj = {};
              obj.data = ruffSpots;
              obj.ruffSpots = true;

              res.send(obj);
            }


            // ELSE you have no known ruff spots. return 5 google places to Search Results 2B View
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

              // there are no ruff spots, stuff them into a variable & send them back to frontend
              // this should probably be reformated. it's a bit confusing, but
              // these are key value pairs being passed back.
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

};