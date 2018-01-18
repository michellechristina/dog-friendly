// This is results from the api search. this is 5 google places that are not known ruff spots.
var googlePlaces = JSON.parse(localStorage.getItem('data'));

console.log(googlePlaces);

$('#places').html(`<pre>${JSON.stringify(googlePlaces,null,2)}</pre>`);