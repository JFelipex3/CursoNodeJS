var http = require("http");

var manejador = function(req, resp){
	console.log("Recibimos una petici�n");
	resp.end("Hola Mundo");
};

var servidor = http.createServer(manejador);

servidor.listen(8080);
