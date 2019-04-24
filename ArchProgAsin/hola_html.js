var http = require("http");
	fs = require("fs");

//Versión Sincrona
/*var html = fs.readFileSync("./index.html");

http.createServer(function(req, res){
	res.write(html);
	res.end();
}).listen(8080);*/

//Versión Asincrona #1 - No se Crea otra petición mientrás proceso una
/*fs.readFile("./index_Async.html", function(err, html){
	http.createServer(function(req, res){
		res.write(html);
		res.end();
	}).listen(8080);
});*/

//Versión Asincrona #2 - Se lee el archivo cada vez que hay una petición, si se actualiza el index.html no es necesario reiniciar el servidor.
/*http.createServer(function(req, res){
	fs.readFile("./index.html", function(err, html){
		//write escribe parte de la respuesta, aquella que se le ha enviado
		res.write(html);
		res.end();
	});
}).listen(8080);*/

//Encabezados y Objeto Response con JSON
/*http.createServer(function(req, res){
	fs.readFile("./index_Async.html", function(err, html){
		//codigo 200 respuesta OK, 400 no se ha encontrado lo pedido, 300 no existe en el lugar, 500 errores
		//Mandar encabezados
		res.writeHead(200, {"Content-Type":"application/json"})
		res.write(JSON.stringify({nombre:"Eduardo",username:"edu88"}));
		res.end();
	});
}).listen(8080);*/

