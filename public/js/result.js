// This is results from the api search. this is 5 google places that are not known ruff spots.
var googlePlaces = JSON.parse(localStorage.getItem('data'));

console.log(googlePlaces);

// $('#places').html(`<pre>${JSON.stringify(googlePlaces, null, 2)}</pre>`);

//append each result as a clickable entry to the DOM
//when an entry is pressed, add it to the database.  
for (var i = 0; i < googlePlaces.length; i++) {
    var places = $('#places');

    //Create the div for the card
    var resultDiv = $('<div>');
    resultDiv.addClass('col-med-4');
    resultDiv.addClass('center-align')

    //create the actual card
    var resultCard = $('<div>');
    resultCard.addClass('card');
    resultCard.addClass('hoverable');
    //append the card to the column div
    resultDiv.append(resultCard);

    //add photo to card
    var resultPhoto = $('<div>');
    resultPhoto.addClass('card-image');
    resultPhoto.addClass('waves-effect');
    resultPhoto.addClass('waves-block');
    resultPhoto.addClass('waves-light');
    // Add photo div to the card
    resultCard.append(resultPhoto);

    // create the photo

    var resultImg = googlePlaces[i].photo;
    var cardImg = $('<img>').attr({
        'class': 'activator',
        'src': resultImg,
    });
    resultPhoto.append(cardImg);


    // Add photo to the card
    console.log("build photo : " + googlePlaces[i].photo);



    // // actually get photo
    // var googleImg = $('<img>');
    // googleImg.src(googlePlaces[i].photo);
    // // add image to card
    // esultCard.append(googleImg);

    //create a card title
    var cardTitle = $('<div>');
    cardTitle.addClass('card-title');
    cardTitle.html(googlePlaces[i].name);
    //append the card title to the card
    resultCard.append(cardTitle);

    //Create the location
    var address = $('<div>');
    address.addClass('card-content');
    address.html(googlePlaces[i].address);
    //Add location to the card
    resultCard.append(address);




    //Add the div containing the card to the DOM
    places.append(resultDiv);

}
// $('#title').html(googlePlaces[0].name)


//Need to create this using jquery...

// <div class="row">
// <div class="col s12 m5">
//   <div class="card-panel teal">
//     <span class="white-text">I am a very simple card. I am good at containing small bits of information.
//     I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
//     </span>
//   </div>
// </div>
// </div>