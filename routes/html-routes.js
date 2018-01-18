var db = require("../models");
var path = require('path');

module.exports = function (app) {

    // index route loads view.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // search route loads search.html
    app.get("/search", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/search.html"));
    });

    app.get("/result", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/result.html"));
    });

    app.get("/browse", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/browse.html"));
    });
};

