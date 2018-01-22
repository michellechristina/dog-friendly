 //Adds the Add a Ruff Spot button to the card
 var addSpot = $('<a class="waves-effect waves-light btn modal-trigger" href="#modal2">Review A Ruff Spot</a>');
 addSpot.addClass('addRuff');
 

 resultCard.append(addSpot);



 $(".addRuff").click(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#modal2').modal();
  });