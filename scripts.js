//LA LETRA Ñ DA PROBLEMAS, HAY QUE REVISAR ESO
const tablaMadre = [' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const flagCodificar = 0;
const flagDecodificar = 1;

function algoritmoCifrado(input, clave, flag) {

	// en este array guardamos los códigos de cada char de la string que recibimos como input
	var inputCodeArray = [];
	// en este array guardamos los códigos de cada char de la string de la clave de cifrado
	var claveCodeArray = [];

	inputCodeArray = stringToArrayDeCodigos(input);
	if (inputCodeArray == null) {
		alert('HAY CARACTERES INVALIDOS EN LA ENTRADA');
		return;
	}

	claveCodeArray = stringToArrayDeCodigos(clave);
	if (claveCodeArray == null) {
		alert('HAY CARACTERES INVALIDOS EN LA CLAVE');
		return;
	}

	var resultadoCodNum;
	var resultado;

	switch (flag) {

		case flagCodificar:
		resultadoCodNum = suma(inputCodeArray, claveCodeArray);
		resultadoCodNum = transposicionPares(resultadoCodNum);
		resultadoCodNum = suma(resultadoCodNum, claveCodeArray);
		resultadoCodNum = transposicionTotal(resultadoCodNum);
		break;

		case flagDecodificar:
		resultadoCodNum = transposicionTotal(inputCodeArray);
		resultadoCodNum = resta(resultadoCodNum, claveCodeArray);
		resultadoCodNum = transposicionPares(resultadoCodNum);
		resultadoCodNum = resta(resultadoCodNum, claveCodeArray);
		break;

	}

	resultado = numCodesToString(resultadoCodNum);

	return resultado;

}

// algoritmo para convertir una string en un array de códigos tomando como referencia tablaMadre
function stringToArrayDeCodigos(input) {

	var elArray = [];
	var i = 0;
	for (char of input) {
		elArray[i] = charToNumcodes(char);
		if (elArray[i] == null) return null;
		i++;
	}

	return elArray;

}

// algoritmo para convertir un char de una string al código correspondiente de tablaMadre
function charToNumcodes(input) {

	var i = 0;
	for (char of tablaMadre) {
		if (input.toUpperCase() == char) return i;
		i++;
	}

	return null;

}

// algoritmo para hacer la suma de los códigos numéricos de la entrada y la clave de cifrado
// los datos de entrada deben ser arrays de integers
function suma(input, clave) {

	if (clave.length == 0) return input;

	var resultado = [];
	var indexClave = 0;

	for (i = 0; i < input.length; i++) {
		resultado[i] = input[i] + clave[indexClave];
		indexClave++;
		if (indexClave == clave.length) indexClave = 0;
	}

	return resultado;

}

// algoritmo para hacer la resta de los códigos numéricos de la entrada y la clave de cifrado
// los datos de entrada deben ser arrays de integers
function resta(input, clave) {

	if (clave.length == 0) return input;

	var resultado = [];
	var indexClave = 0;

	for (i = 0; i < input.length; i++) {
		resultado[i] = input[i] - clave[indexClave];
		indexClave++;
		if (indexClave == clave.length) indexClave = 0;
	}

	return resultado;

}

// algoritmo para hacer la transposición por pares
// los datos de entrada deben ser arrays de integers
function transposicionPares(input) {

	var resultado = [];
	var a = 0;
	var b = 1;

	while (b < input.length) {
		resultado[a] = input[b];
		resultado[b] = input[a];
		a = a + 2;
		b = b + 2;
	}

	if (b == input.length) resultado[a] = input[a];

	return resultado;

}

// algoritmo para hacer la transposición total
// los datos de entrada deben ser arrays de integers
function transposicionTotal(input) {

	var resultado = [];
	var a = 0;
	var b = input.length - 1;

	while (a <= b) {
		resultado[a] = input[b];
		resultado[b] = input[a];
		a++;
		b--;
	}

	return resultado;

}

// algoritmo para pasar los códigos numéricos al rango de tablaMadre
// los datos de entrada deben ser arrays de integers
function convertirRango(input) {

	var resultado = input;

	for (i = 0; i < resultado.length; i++) {

		while (resultado[i] >= tablaMadre.length)
			resultado[i] = resultado[i] - (tablaMadre.length - 1);

		while (resultado[i] < 0)
			resultado[i] = resultado[i] + (tablaMadre.length - 1);

	}

	return resultado;

}

// algoritmo para pasar un array de códigos numéricos a string
// los datos de entrada deben ser arrays de integers
function numCodesToString(input) {

	var resultado = '';
	var inputConvertido = convertirRango(input);

	for (i = 0; i < inputConvertido.length; i++)
		resultado += tablaMadre[inputConvertido[i]];

	return resultado;

}

// a partir de aquí va el código que interactúa con el html, esta parte usa jquery para facilitar el trabajo

function codificar() {

	var entrada = $('#inputCodificar').val();
	var clave = $('#inputClave').val();
	var resultado = algoritmoCifrado(entrada, clave, flagCodificar);
	$('#codificar .textoResultado').text(resultado);

}

function decodificar() {

	var entrada = $('#inputDecodificar').val();
	var clave = $('#inputClave').val();
	var resultado = algoritmoCifrado(entrada, clave, flagDecodificar);
	$('#decodificar .textoResultado').text(resultado);

}

function switchTheme() {

	if ($('body').hasClass('dark')) {
		$('body').removeClass('dark');
		$('body').addClass('light');
		$('#switchThemeButton').html('dark_mode');
	} else {
		$('body').removeClass('light');
		$('body').addClass('dark');
		$('#switchThemeButton').html('light_mode');
	}

}

$(document).ready(function() {

	$('body').addClass('light');
	$('#switchThemeButton').on('click', switchTheme);
	$('#codificar button').on('click', codificar);
	$('#decodificar button').on('click', decodificar);

});