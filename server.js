const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const apiRoutes = require("./app/routing/apiRoutes");
const htmlRoutes = require("./app/routing/htmlRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./app/public"));

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

