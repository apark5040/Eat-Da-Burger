var express = require("express");

var PORT = process.env.PORT || 3000;

var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");

var routes = require("./controllers/burgers_controller.js");

var app = express();

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(routes);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on port: " + PORT);
});