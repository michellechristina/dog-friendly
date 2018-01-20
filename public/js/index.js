$(document).ready(function() {
$('select').material_select();
 });

// bringing variables back into scope so the onclick event can access them
var latitude = "";
var longitude = "";


// get geolocation upon page load, (used for the NEAR ME search)
var geolocate = $("#geolocate");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("INDEX Latitude: " + latitude + "\n INDEX Longitude: " + longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

getLocation()

// event handler for the NEAR ME submit button
$("#localSubmit").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    var place = $("#typeOfPlace option:selected").val();
    var newPlace = place.split(" ").join("+");

    // This request goes server side, where google places api is queried & results are returned.
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

        } 
    })

})