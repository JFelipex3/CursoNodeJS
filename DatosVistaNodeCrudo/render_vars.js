var http = require("http");
	fs = require("fs");

http.createServer(function(req, res){
	fs.readFile("./index.html", function(err, html){
		//Convertir archivo a cadena de texto
		var html_string = html.toString();

		//Metodo que permite pasar una expresion regular que devuelve un arreglo, el patron busca texto entre llaves {xxx}
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var nombre = "Código Facilito";

		// variable ['nombre']

		for (var i = variables.length - 1; i >= 0; i--) {
			//Obtiene el nombre de la variable entre llaves
			var value = eval(variables[i]);

			//Asigna valor de la variable, en este caso nombre
			html_string = html_string.replace("{" + variables[i] + "}", value);
		};

		//codigo 200 respuesta OK, 400 no se ha encontrado lo pedido, 300 no existe en el lugar, 500 errores
		//Mandar encabezados
		res.writeHead(200, {"Content-Type":"text/html"})
		res.write(html_string);
		res.end();
	});
}).listen(8080);