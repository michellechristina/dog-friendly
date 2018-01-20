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

    // const data = {
    //     newPlace: newPlace,
    //     latitude: latitude,
    //     longitude: longitude
    // };

    // This goes server side, where google places api is queried & results are returned.

    $.ajax({
        method: "get",
        url: `/api/places/${newPlace}/${latitude}/${longitude}`,
        success: function (response) {
            console.log(response);


            /// store response in local storage, it will have data you need to build the 2 views
            localStorage.setItem('data', JSON.stringify(response.data));
            /// if response.ruffSpots then redirect to browse.html
            if (response.ruffSpots) {
                window.location = "browse.html";
            }
            /// else redirect to result.html
            else {
                window.location = "result.html"
            };

        } // this ends the callback function
    })



    // $.post("/api/search", data)
    //     .then(function (results, status) {
    //         console.log("-------------------------");
    //         console.log("results");
    //         console.log(results);

    //     });

})
// this activates the modal when "add a ruff spot" button is clicked on the index.html "home page"
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });