$(document).ready(function () {









    function insertIndoor(event) {
        event.preventDefault();
        var indoor = {
            name: 'Test',
            location: 'Portsmouth',
            dogFriendly: true,
            rating: 5
        };

        $.post("/api/new/indoors", todo);

    }
}