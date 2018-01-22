// This is results from the api search. this is 5 google places that are not known ruff spots.
var googlePlaces = JSON.parse(localStorage.getItem('data'));

console.log(googlePlaces);

$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#addPlace').modal();
    $('select').material_select();
});


//append each result as a clickable entry to the DOM
//when an entry is pressed, add it to the database.  
for (var i = 0; i < googlePlaces.length; i++) {
    var places = $('#places');

    //Create the div for the card
    var resultDiv = $('<div>');
    resultDiv.addClass('col med 12');
    resultDiv.addClass('center-align')
    resultDiv.addClass('place')
    console.log(googlePlaces[i].place_id)
    resultDiv.attr('place_id', googlePlaces[i].place_id);

    //create the actual card
    var resultCard = $('<div>');
    resultCard.addClass('card lime lighten-3');
    resultCard.addClass('hoverable');
    //append the card to the column div
    resultDiv.append(resultCard);
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

$(".place").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    var title = $(this).children().children()[0]
    title = title.innerHTML;
    console.log(title);
    var location = $(this).children().children()[1];
    location = location.innerHTML;
    console.log(location);
    //Inject data into the modal
    $('#title').html(title);
    $('#location').html(location);
    $('#addPlace').modal('open');
    $('#newPlace').attr('data',$(this).attr("place_id"));
})

$('#newPlace').on('click', function (event){
    event.preventDefault();
    console.log($('#title').html())
    var place = {};
    console.log($(this));
    place.place_id = $(this).attr("data")
    //need to capture a category from the modal
    place.location = $('#location').html();
    console.log(place);

    $.ajax({
        method: "get",
        url: `/api/places/`,
        success: function (response) {
            console.log(response);
        }
    })
})





