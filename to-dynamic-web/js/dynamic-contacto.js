console.log("hola, desde dynamic-contacto.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var directora;

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
	renderDirectora();
}
function renderDirectora () {
	directora = tabletop.sheets('directora').all();
	console.log('directora :'+directora);
	var len = directora.length;
	var rowDynamicCountDirectora = 0;
	var yControl = 0;
	var iterations = 0;

	// render section COLABORADORES
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountDirectora++;
		rowDynamic = rowDynamic + rowDynamicCountDirectora;
		$('#directora').append('<div class="row '+rowDynamic+' featurette row-directora">');
		$('#formulario-contacto').append('<div class="'+rowDynamic+'">');

    // Fill out COLABORADORES HTML
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
			$('#directora .'+rowDynamic).prepend('<div class="" id="miembro'+[i+y+1]+'"></div>');
			if (directora[i+y].foto === "") {
				foto = "https://picsum.photos/4"+i+y+"/3"+y+i;
			} else {
				foto = "info-miembros/"+directora[i+y].foto;
			}
			$('#directora .'+rowDynamic).append(
				'\r <a href="'+directora[i+y].enlace_a_web+'">'+
				'\r   <div id="miembro1" class="col-md-5">'+
				'\r     <img class="featurette-image img-responsive center-block" src="'+foto+'" alt="Generic placeholder image">'+
				'\r   </div>'+
				'\r   <div class="col-md-7">'+
				'\r     <h2 class="featurette-heading">'+directora[i+y].nombre+
				'\r       <span class="text-muted español">'+directora[i+y].title_es+'</span>'+
				'\r       <span class="text-muted ingles noVisible">'+directora[i+y].title_en+'</span>'+
				'\r     </h2>'+
				'\r     <p class="lead español">Departamento de Filología Inglesa, Universidad Autónoma de Madrid.</p>'+
				'\r     <p class="lead ingles noVisible">Department of English Philology, Autonomous University of Madrid.</p>'+
				'\r     <p>'+directora[i+y].email+'</p>'+
				'\r   </div>'+
				'\r </a>'
			);
			$('#formulario-contacto .'+rowDynamic).append(
        '<iframe class="español" src="https://docs.google.com/forms/d/e/1FAIpQLSeilwcQsP-zn2ICi2-rY1rfQG7_Kp9YcPv9Adt_GFaQ88yIyA/viewform?embedded=true#start=embed" width="100%" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'+
        '<iframe class="ingles noVisible" src="https://docs.google.com/forms/d/e/1FAIpQLSfSK1h4VOOuoORDf-ut0FmI9Gq5xUjZlhutNnizI_HsJtsu3Q/viewform?embedded=true" width="100%" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'
			);


		}
	}

}


window.addEventListener('DOMContentLoaded', init);
