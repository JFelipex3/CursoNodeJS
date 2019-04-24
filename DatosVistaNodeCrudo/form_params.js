var http = require("http");
	fs = require("fs");

http.createServer(function(req, res){

	if(req.url.indexOf("favicon.ico") > 0){
		return;
	}

	fs.readFile("./index.html", function(err, html){
		//Convertir archivo a cadena de texto
		var html_string = html.toString();
		var arreglo_parametros = [];
		var parametros = {};

		//Metodo que permite pasar una expresion regular que devuelve un arreglo, el patron busca texto entre llaves {xxx}
		var variables = html_string.match(/[^\{\}]+(?=\})/g);

		if(req.url.indexOf("?") > 0){
			// /?nombre=algo => ['/','nombre=algo&dta=otra']
			var url_data = req.url.split("?");

			// [nombre=algo,data=otra]
			var arreglo_parametros = url_data[1].split("&");
		}

		for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
			// nombre=algo
			var parametro = arreglo_parametros[i];
			//[nombre,algo]
			var param_data = parametro.split("=");
			//{nombre: algo}
			parametros[param_data[0]] = param_data[1];
		};

		for (var i = variables.length - 1; i >= 0; i--) {
			var variable = variables[i];

			//Asigna valor de la variable, en este caso nombre
			html_string = html_string.replace("{" + variables[i] + "}", parametros[variable]);
		};

		//codigo 200 respuesta OK, 400 no se ha encontrado lo pedido, 300 no existe en el lugar, 500 errores
		//Mandar encabezados
		res.writeHead(200, {"Content-Type":"text/html"})
		res.write(html_string);
		res.end();
	});
}).listen(8080);