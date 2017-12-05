console.log("hola, desde dynamic-proyectos.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1HyXFWpW4WJFNrgd0yNmdFjdGd348b33N2v5U2xtRa9w/edit?usp=sharing';
var tabletop;
var proyectos;

function init() {
	tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
															callback: onSheetsLoad,
															simpleSheet: false
														}
													);
}

function showInfo(data, tabletop) {
	alert('Successfully processed!')
	console.log(data);
}

function onSheetsLoad () {
	renderProyectos();

}


function renderProyectos () {
	proyectos = tabletop.sheets('proyectos').all();
	console.log('proyectos :'+proyectos);
	var len = proyectos.length;
	var rowDynamicCountproyectos = 0;
	var yControl = 0;
	var iterations = 0;

	// render section proyectos
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountproyectos++;
		rowDynamic = rowDynamic + rowDynamicCountproyectos;
		$('#proyectos').append('<div class="row '+rowDynamic+' proyectos-row">');

    // Fill out proyectos HTML
		var y = 0;
		var foto;
		// Me define el número de veces que debo iterar el segundo for anidado. Tal que sólo itere el número total de 'rows' que tenga el Sheet y no más (así no da ERROR y para la ejecución del script).
		if (yControl <= Math.floor(len / 3)) {
			iterations = 3;
		} else {
			iterations = len % 3;
		}
		for ( y = 0; y < iterations; y++) {
			console.log(y);
			$('#proyectos .'+rowDynamic).prepend('<div class="" id="proyecto'+[i+y+1]+'"></div>');
			if (proyectos[i+y].foto === "") {
				foto = "https://picsum.photos/7"+i+y+"/7"+y+i;
			} else {
				foto = "img/"+proyectos[i+y].foto;
			}
			$('#proyectos .'+rowDynamic).append(
        '\r   <div class="col-md-4">'+
        '\r     <img class="img-proyecto" src="'+foto+'" alt="imágen Proyecto'+proyectos[i+y].proyecto_es+'">'+
        '\r     <div class="proyecto-descripcion español">'+
        '\r       <h3>'+proyectos[i+y].proyecto_es+'</h3>'+
        '\r     </div>'+
        '\r     <div class="proyecto-descripcion ingles noVisible">'+
        '\r       <h3>'+proyectos[i+y].proyecto_en+'</h3>'+
        '\r     </div>'+
        '\r   </div>'
			);


		}
	}

}
window.addEventListener('DOMContentLoaded', init);
