var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.send("Hola Mundo con Express");
});

app.listen(8080);
