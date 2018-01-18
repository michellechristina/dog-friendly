// This is results from the api search. this are known ruff spot matches
var ruffSpots = JSON.parse(localStorage.getItem('data'));

console.log(ruffSpots);

$('#places').html(`<pre>${JSON.stringify(ruffSpots,null,2)}</pre>`);