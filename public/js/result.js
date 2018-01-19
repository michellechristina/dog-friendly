// This is results from the api search. this is 5 google places that are not known ruff spots.
var googlePlaces = JSON.parse(localStorage.getItem('data'));

console.log(googlePlaces);

// $('#places').html(`<pre>${JSON.stringify(googlePlaces, null, 2)}</pre>`);


//append each result as a clickable entry to the DOM
//when an entry is pressed, add it to the database.  
for (var i = 0; i < googlePlaces.length; i++) {

    //Create the div for the card
    var resultDiv = $('<div>');
    resultDiv.addClass('col-med-8');

    //create the actual card
    var resultCard = $('<div>');
    resultCard.addClass('card');

    resultDiv.append(resultCard);

    $('#places').append(resultDiv);

}
console.log(googlePlaces[0]);


// <div class="row">
// <div class="col s12 m5">
//   <div class="card-panel teal">
//     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
//     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
//     </span>
//   </div>
// </div>
// </div>
      