var express = require("express");
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
var methodOverride = require("method-override");

var User = require("./models/user").User;
var router_app = require("./router_app");
var session_middleware = require("./middlewares/session");

var app = express();

app.use("/public", express.static('public'));
app.use(bodyParser.json()); // Para peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); // Se puede hacer parser de muchos objetos como arreglos

app.use(methodOverride("_method"));

app.use(cookieSession({
  name: "session",
  keys: ["llave-1", "llave-2"]
}));

app.set("view engine", "jade");

app.get("/", function(req, res) {
  console.log(req.session.user_id);
  res.render("index");
});

app.get("/signup", function(req, res) {
  User.find(function(err, doc){
    console.log(doc);
  });
  res.render("signup");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/users", function(req, res) {

  var user = new User({
                        name: req.body.nombre,
                        last_name: req.body.apellido,
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                        password_confirmation: req.body.password_confirmation
                      });

  //Programación de Promesas
  user.save().then(function(us){
    res.send("Guardamos el usuario exitosamente");
  }, function(err){
    if(err){
      console.log(String(err));
      res.send("No se ha guardado el usuario");
    }
  });
});

app.post("/sessions", function(req, res) {

  User.findOne({
                email: req.body.email,
                password: req.body.password},
                function(err, user){
                  req.session.user_id = user._id;
                  res.redirect("/app");
                }
           );

});

app.use("/app", session_middleware);
app.use("/app", router_app);

app.listen(8080);
