var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var posibles_valores = ["M", "F"];

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email no válido"];

var user_schema = new Schema({

  name: String,
  last_name: String,
  username: {type: String,
             required: "Debe ingresar Username",
             maxlength: [50, "Username no debetener más de 50 caracteres"]
  },
  password: {type: String,
             required: true,
             minlength: [8, "El Password debe tener al menos 8 caracteres"],
             validate: {
               validator: function(p){
                 return this.password_confirmation == p;
               },
               message: "Las contraseñas no son iguales"
             }
  },
  age: {type: Number,
        min: [5, "La edad no puede ser menor a 5"],
        max: [100, "La edad no puede ser mayor a 100"]
  },
  email: {type: String,
          required: "El correo es obligatorio",
          match: email_match
  },
  date_of_birth: Date,
  sex: {type: String,
        enum: {values: posibles_valores, message: "Opción no válida"}
  }
});

user_schema.virtual("password_confirmation").get(function(){
  return this.p_c;
}).set(function(password) {
  this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;
