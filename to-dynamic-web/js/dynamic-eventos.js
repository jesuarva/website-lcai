console.log("hola, desde dynamic-eventos.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1874UWhdFVcZCXxzxFPNnZwnYkiqrHoBfxNl5VBhLE18/edit?usp=sharing';
var tabletop;
var eventos;

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
	rendereventos();

}


function rendereventos () {
	eventos = tabletop.sheets('eventos').all();
	console.log('eventos :'+eventos);
	var len = eventos.length;
	var rowDynamicCounteventos = 0;
	var yControl = 0;
	var iterations = 0;

	// render section eventos
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCounteventos++;
		rowDynamic = rowDynamic + rowDynamicCounteventos;
		$('#eventos').append('<div class="row '+rowDynamic+' proyectos-row">');
		$('#modal').append('<div class="'+rowDynamic+'">');

    // Fill out eventos HTML
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
			$('#eventos .'+rowDynamic).prepend('<div class="" id="evento'+[i+y+1]+'"></div>');
			if (eventos[i+y].foto === "") {
				foto = "https://picsum.photos/10"+i+y+"/10"+y+i;
			} else {
				foto = "cartel-y-folletos/"+eventos[i+y].foto;
			}
			$('#eventos .'+rowDynamic).append(
        '\r <div class="col-md-6">'+
        '\r   <div href="#Modal-'+[i+y+1]+'" class="modal-trigger" data-toggle="modal">'+
        '\r     <!-- width 480 , heigth 245 -->'+
        '\r     <img class="img-proyecto" src="'+foto+'" alt="Imágen del evento'+[i+y+1]+'">'+
        '\r     <div class="proyecto-descripcion español">'+
        '\r       <h3>'+eventos[i+y].evento_es+'</h3>'+
        '\r       <p>Click para ver cartel y folleto</p>'+
        '\r     </div>'+
        '\r     <div class="proyecto-descripcion ingles noVisible">'+
        '\r       <h3>'+eventos[i+y].eventos_en+'</h3>'+
        '\r       <p>Click to see poster and brochure</p>'+
        '\r     </div>'+
        '\r   </div>'+
        '\r </div>'
			);
			$('#modal .'+rowDynamic).append(
        '\r <!-- Modal HTML -->'+
        '\r <div id="Modal-'+[i+y+1]+'" class="modal fade">'+
        '\r     <div class="modal-dialog">'+
        '\r         <div class="modal-content">'+
        '\r             <div class="modal-header">'+
        '\r                 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
        '\r                 <h2 class="text-center modal-title">'+eventos[i+y].evento_es+'</h2>'+
        '\r             </div>'+
        '\r             <div class="modal-body">'+
        '\r                 <img class="img-responsive" alt="Cartel evento '+eventos[i+y].evento_es+'" title="Cartel evento '+eventos[i+y].evento_es+'" src="cartel-y-folletos/'+eventos[i+y].cartel+'">'+
        '\r                 <hr class="featurette-divider">'+
        '\r                 <img class="img-responsive" alt="Frontal del folleto para '+eventos[i+y].evento_es+'" title="Frontal del folleto para '+eventos[i+y].evento_es+'" src="cartel-y-folletos/'+eventos[i+y].folleto_frontal+'">'+
        '\r                 <hr class="featurette-divider">'+
        '\r                 <img class="img-responsive" alt="Reverso del folleto para '+eventos[i+y].evento_es+'" title="Reverso del folleto para '+eventos[i+y].evento_es+'" src="cartel-y-folletos/'+eventos[i+y].folleto_reverso+'">'+
        '\r             </div>'+
        '\r             <div class="modal-footer">'+
        '\r                 <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>'+
        '\r             </div>'+
        '\r         </div>'+
        '\r     </div>'+
        '\r </div>'
			);
		}
	}

}
window.addEventListener('DOMContentLoaded', init);
