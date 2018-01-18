// google object
var gobj = {
    "place_id": "jdkfsjlfj",
    "name": "The commons",
    "moreGoogleShit": "jklfjsklfjsa",
    "photo": "<img src='djfaklsjf' />"
}

// db object
var dbobj = {
    "place_id": "jdkfsjlfj",
    "category": "parks",
    "createdAt": "2018-12-18"
}

var masterObj = Object.assign({}, gobj, dbobj);

console.log(masterObj);
