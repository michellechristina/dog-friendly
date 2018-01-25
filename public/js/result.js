// This is results from the api search. this is 5 google places that are not known ruff spots.
var googlePlaces = JSON.parse(localStorage.getItem('data'));

$(document).ready(function () {
    $('#addPlace').modal();
    $('#redirectModal').modal();
    $('select').material_select();
});


//append each result as a clickable entry to the DOM
for (var i = 0; i < googlePlaces.length; i++) {
    var places = $('#places');
    //Create the div for the card
    var resultDiv = $('<div>');
    resultDiv.addClass('col-med-4');
    resultDiv.addClass('center-align')
    resultDiv.addClass('place')
    resultDiv.attr('place_id', googlePlaces[i].place_id);
    //create the actual card
    var resultCard = $('<div>');
    resultCard.addClass('card teal lighten-4');
    resultCard.addClass('hoverable');
    //append the card to the column div
    resultDiv.append(resultCard);
    //create a card title
    var cardTitle = $('<div>');
    cardTitle.addClass('card-title teal lighten-3 lime-text text-darken-4');
    cardTitle.html(googlePlaces[i].name);
    //append the card title to the card
    resultCard.append(cardTitle);
    //Create the location
    var address = $('<div>');
    address.addClass('card-content teal lighten-2');
    address.html(googlePlaces[i].address);
    //Add location to the card
    resultCard.append(address);
    //Add the div containing the card to the DOM
    places.append(resultDiv);
}

//When an entry is pressed, populate the modal and activate it
$(".place").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    var title = $(this).children().children()[0]
    title = title.innerHTML;
    var location = $(this).children().children()[1];
    location = location.innerHTML;
    //Inject data into the modal
    $('#title').html(title);
    $('#location').html(location);
    $('#addPlace').modal('open');
    $('#newPlace').attr('data',$(this).attr("place_id"));
})

//When the add new place button is pressed, add the Place_ID and Category to the DB
$('#newPlace').on('click', function (event){
    event.preventDefault();
    var place = {};
    place.place_id = $(this).attr("data")
    //need to capture a category from the modal
    place.category = $('#category').val();
    console.log(place);

    $.ajax({
        method: "put",
        url: `/api/places/${place.place_id}/${place.category}`,
        success: function (response) {
            // when success, open modal & redirect to index after 2 seconds
            $('#redirectModal').modal('open');
            console.log(response);
            setTimeout(() => {
                window.location="/index.html";
            }, 2000);
        }
    })
})





