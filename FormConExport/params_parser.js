function parse(req) {
	var arreglo_parametros = [];
	var parametros = {};

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

	return parametros;
}

module.exports.parse = parse;