var http = require("http");
	fs = require("fs");
	parser = require("./params_parser.js");
	renderer = require("./render_view.js");

var p = parser.parse;
var r = renderer.render;

http.createServer(function(req, res){

	if(req.url.indexOf("favicon.ico") > 0){
		return;
	}

	fs.readFile("./index.html", function(err, html){
		//Convertir archivo a cadena de texto
		var html_string = html.toString();

		var parametros = p(req);
		var datos = r(html_string, parametros);

		//codigo 200 respuesta OK, 400 no se ha encontrado lo pedido, 300 no existe en el lugar, 500 errores
		//Mandar encabezados
		res.writeHead(200, {"Content-Type":"text/html"})
		res.write(datos);
		res.end();
	});
}).listen(8080);