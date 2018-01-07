var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory to be served
app.use(express.static("app/public"));

// Routes
require("./routes/api-routes.js")(app);

// HTML Routes
require("./routes/html-routes.js")(app);

// Starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
