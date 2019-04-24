function render (html, parametros) {
	
	var html_string = html;
	//Metodo que permite pasar una expresion regular que devuelve un arreglo, el patron busca texto entre llaves {xxx}
	var variables = html_string.match(/[^\{\}]+(?=\})/g);

	for (var i = variables.length - 1; i >= 0; i--) {
		var variable = variables[i];

		//Asigna valor de la variable, en este caso nombre
		html_string = html_string.replace("{" + variables[i] + "}", parametros[variable]);

	};

	return html_string;
}

module.exports.render = render;