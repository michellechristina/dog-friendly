$(document).ready(function () {
    $('select').material_select();
});

// bringing variables back into scope so the onclick event can access them
var latitude = "";
var longitude = "";


// get geolocation upon page load, (used for the NEAR ME search)
var geolocate = $("#geolocate");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("INDEX Latitude: " + latitude + "\n INDEX Longitude: " + longitude);
}

getLocation()

// event handler for the NEAR ME submit button
$("#localSubmit").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    var place = $("#typeOfPlace option:selected").val();
    var newPlace = place.split(" ").join("+");
    console.log("THIS IS THE PLACE YOU ARE LOOKING FOR");
    console.log(newPlace);

    // This request goes server side, where google places api is queried & results are returned.
    $.ajax({
        method: "get",
        url: `/api/places/${newPlace}/${latitude}/${longitude}`,
        success: function (response) {
            console.log(response);
console.log("THIS IS THE URL YOU ARE LOOKING FOR");
// console.log(url);

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

        } 
    })

})