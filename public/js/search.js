var latitude = "";
var longitude = "";

// 1st eventhandler = blur = kicked off by zip code entered & input box clicked off of
$("#input-zipCode").on("blur", function (event) {

    var zipCode = $('#input-zipCode').val().trim();
    var radius = 10;

    //Geocoder - takes zipcode & parses into Latidue & Longitude
    $.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyDF3cJTRy-rvv-j_2VUSZJs22QjvRzVVcg",
        function (results, status) {
            // console.log(results);
            latitude = results.results[0].geometry.location.lat;
            longitude = results.results[0].geometry.location.lng;
            console.log("Latitude: " + latitude + "\nLongitude: " + longitude);

        })
})

// 2nd event handler - When submit form is submitted...
$("#btn-place").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();


    var place = $('#input-place').val().trim();
    var newPlace = place.split(" ").join("+");
    console.log(newPlace);

    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=" + newPlace + "&location=" + latitude + "," + longitude + "&radius=500&key=AIzaSyDF3cJTRy-rvv-j_2VUSZJs22QjvRzVVcg";

    const data = {
        newPlace: newPlace,
        latitude: latitude,
        longitude: longitude
    };

    // This goes server side, where google places api is queried & results are returned.
    $.post("/api/search", data)
        .then(function (results, status) {
            console.log("-------------------------");
            console.log("results");
            console.log(results);

        });

})