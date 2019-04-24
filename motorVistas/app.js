var express = require("express");

var app = express();

app.set("view engine", "jade");

app.get("/", function(req, res) {
  res.render("index", {hola: "Hola Mundo con Jade y Express"});
});

app.listen(8080);
