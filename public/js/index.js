$(document).ready(function() {
    $('select').material_select();
  });

var latitude = "";
var longitude = "";


// get geolocation upon page load
var geolocate = $("#geolocate");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    latitude= position.coords.latitude;
    longitude=position.coords.longitude; 
    console.log("INDEX Latitude: " + latitude + "\n INDEX Longitude: " + longitude);
}

getLocation()


$("#localSubmit").on("click", function (event) {
      // Prevent form from submitting
      event.preventDefault();
    
    var place = $("#typeOfPlace option:selected").val();
    var newPlace = place.split(" ").join("+");
    console.log(newPlace);

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


})