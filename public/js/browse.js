//This is results from the api search. this are known ruff spot matches
var ruffSpots = JSON.parse(localStorage.getItem('data'));

console.log(ruffSpots);

// $('#places').html(`<pre>${JSON.stringify(ruffSpots,null,2)}</pre>`);
$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#modal2').modal();
    $('select').material_select();
    $(".button-collapse").sideNav();
});


//append each result as a clickable entry to the DOM
//when an entry is pressed, add it to the database.  
for (var i = 0; i < ruffSpots.length; i++) {
    var places = $('#places');

    //Create the div for the card
    var resultDiv = $('<div>');
    resultDiv.addClass('col med 12');
    resultDiv.addClass('center-align')
    resultDiv.addClass('place')
    console.log(ruffSpots[i].place_id)
    resultDiv.attr('place_id', ruffSpots[i].place_id);

    //create the actual card
    var resultCard = $('<div>');
    resultCard.addClass('card lime lighten-3');
    resultCard.addClass('hoverable');
    //append the card to the column div
    resultDiv.append(resultCard);
    //create a card title
    var cardTitle = $('<div>');
    cardTitle.addClass('card-title');
    cardTitle.html(ruffSpots[i].name);
    //append the card title to the card
    resultCard.append(cardTitle);
    //Create the location
    var address = $('<div>');
    address.addClass('card-content');
    address.html(ruffSpots[i].address);
    //Add location to the card
    resultCard.append(address);

    
    //Adds the Add a Ruff Spot button to the card
    var reviewSpot = $('<a class="waves-effect waves-light btn modal-trigger align-right" href="#modal2">Review A Ruff Spot</a>');
    reviewSpot.addClass('revRuff');

    resultCard.append(reviewSpot);

    //Add the div containing the card to the DOM
    places.append(resultDiv);

};


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
        // $('#addPlace').modal('open');
        $('#newReview').attr('data',$(this).attr("friendly_rating"));
    })
    
    $('#newReview').on('click', function (event){
        event.preventDefault();
        // console.log($('.select-dropdown').html())
        var review = {};
        // review.place_id = $(this).attr("data")
        // console.log($(this));
        review.friendly_rating = $('#rating option:selected').val();
        review.review = $('#textarea1').val();
        console.log(review);
    
        $.ajax({
            method: "put",
            url: `/api/reviews/`,
            data: review.friendly_rating,  //this is where you pass data to the backend 
            success: function (response) {
                console.log(response);
            }
        })
    })
    
    //${review.friendly_rating}/${review.review}`,