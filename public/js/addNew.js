 //Adds the Add a Ruff Spot button to the card
 var addSpot = $('<a class="waves-effect waves-light btn modal-trigger" href="#modal2">Review A Ruff Spot</a>');
 addSpot.addClass('addRuff');
 

 resultCard.append(addSpot);



 $(".addRuff").click(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#modal2').modal();
  });

  //add photo to card
    // var resultPhoto = $('<div>');
    // resultPhoto.addClass('card-image');
    // resultPhoto.addClass('waves-effect');
    // resultPhoto.addClass('waves-block');
    // resultPhoto.addClass('waves-light');
    // // Add photo div to the card
    // resultCard.append(resultPhoto);

    // create the photo

    // var resultImg = ruffSpots[i].photo;
    // var cardImg = $('<img>').attr({
    //     'class': 'activator',
    //     'src': resultImg,
    // });
    // resultPhoto.append(cardImg);


    // // Add photo to the card
    // console.log("build photo : " + ruffSpots[i].photo);



    // // actually get photo
    // var googleImg = $('<img>');
    // googleImg.src(ruffSpots[i].photo);
    // // add image to card
    // esultCard.append(googleImg);
