var express = require("express");

var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");

var orm = require("./config/orm.js");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 3000;

// orm.insertOne("burgers", "burger_name", "devoured", "Bacon Burger", true);
// orm.selectAll("burgers");

var routes = require("./controllers/burgers_controller.js");

app.use(routes);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});