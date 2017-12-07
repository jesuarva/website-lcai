console.log("hola, desde dynamic-miembros.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phd_thesis;
var colaboradores;
var directora;

function initMiembros() {
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
	renderInvestigadores();
	renderDoctorandos();
	renderPHD();
	renderColaboradores();

}
function renderDirectora () {
	directora = tabletop.sheets('directora').all();
	console.log('directora :'+directora);
	var len = directora.length;
	var rowDynamicCountDirectora = 0;
	var yControl = 0;
	var iterations = 0;

	// render section DIRECTORA
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountDirectora++;
		rowDynamic = rowDynamic + rowDynamicCountDirectora;
		$('#directora').append('<div class="row '+rowDynamic+' featurette row-directora">');

    // Fill out DIRECTORA HTML
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
				'\r     <p class="lead español">'+directora[i+y].departamento_es+'</p>'+
				'\r     <p class="lead ingles noVisible">'+directora[i+y].departamento_en+'</p>'+
				'\r   </div>'+
				'\r </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')



		}
	}

}
function renderInvestigadores () {
	investigadores = tabletop.sheets('investigadores').all();
	console.log('investigadores :'+investigadores);
	var len = investigadores.length
	var rowDynamicCountInvestigadores = 0;
	var yControl = 0;
	var iterations = 0;
	// render section INVESTIGADORES
	$('.navbar-nav.ingles .dropdown-menu').append('<li role="separator" class="divider"></li>');
	$('.navbar-nav.español .dropdown-menu').append('<li role="separator" class="divider"></li>');
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountInvestigadores++;
		rowDynamic = rowDynamic + rowDynamicCountInvestigadores;
		$('#investigadores').append('<div  class="row '+rowDynamic+' row-investigadores"></div');

		// Fill out Investigadores HTML
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
			$('#investigadores .'+rowDynamic).prepend('<div class="" id="miembroi'+[i+y+1]+'"></div>');
			if (investigadores[i+y].foto === "") {
				foto = "https://picsum.photos/8"+i+y+"/8"+y+i;
			} else {
				foto = "info-miembros/"+investigadores[i+y].foto;
			}
			$('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'">'+
				'\r        <div class="text-center col-lg-4">'+
				'\r          <div class="img-circle-container">'+
				'\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
				'\r          </div>'+
				'\r          <h3>'+investigadores[i+y].nombre+'</br>'+
				'\r            <span class="text-muted español">Investigador</span>'+
				'\r            <span class="text-muted ingles noVisible">Researcher</span>'+
				'\r          </h3>'+
				'\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
				'\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
				'\r          <p>'+investigadores[i+y].email+'</p>'+
				'\r        </div><!-- /.col-lg-4 -->'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')



		}
	}

}
function renderDoctorandos () {
	doctorandos = tabletop.sheets('doctorandos').all();
	console.log('doctorandos :'+doctorandos);
	var len = doctorandos.length;
	var rowDynamicCountDoctorandos = 0;
	var yControl = 0;
	var iterations = 0;

	// render section DOCTORANDOS
	$('.navbar-nav.ingles .dropdown-menu').append('<li role="separator" class="divider"></li>');
	$('.navbar-nav.español .dropdown-menu').append('<li role="separator" class="divider"></li>');
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountDoctorandos++;
		rowDynamic = rowDynamic + rowDynamicCountDoctorandos;
		$('#doctorandos').append('<div  class="row '+rowDynamic+' proyectos-row row-doctorando"></div');

    // Fill out DOTORANDOS HTML
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
			$('#doctorandos .'+rowDynamic).prepend('<div class="" id="miembrod'+[i+y+1]+'"></div>');
			if (doctorandos[i+y].foto === "") {
				foto = "https://picsum.photos/7"+i+y+"/7"+y+i;
			} else {
				foto = "info-miembros/"+doctorandos[i+y].foto;
			}
			$('#doctorandos .'+rowDynamic).append(
	    '\r    <a href="'+doctorandos[i+y].enlace_a_web+'">'+
	    '\r      <div class="col-md-4">'+
	    '\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
	    '\r            <span class="text-muted español">Doctorando</span>'+
	    '\r            <span class="text-muted ingles noVisible">Doctoral</span>'+
	    '\r          </h3>'+
	    '\r        </div>'+
	    '\r        <img class="img-members" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
	    '\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <p>'+doctorandos[i+y].email+'</p>'+
	    '\r        </div>'+
	    '\r      </div>'+
	    '\r    </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')


		}
	}

}
function renderPHD () {
	phd_thesis = tabletop.sheets('phd-thesis').all();
	console.log('phd :'+phd_thesis);
	var len = phd_thesis.length;
	var rowDynamicCountPhd = 0;
	var yControl = 0;
	var iterations = 0;

	// render section PHD
	$('.navbar-nav.ingles .dropdown-menu').append('<li role="separator" class="divider"></li>');
	$('.navbar-nav.español .dropdown-menu').append('<li role="separator" class="divider"></li>');
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountPhd++;
		rowDynamic = rowDynamic + rowDynamicCountPhd
		$('#phd-thesis').append('<div  class="row '+rowDynamic+' proyectos-row row-phdTesis"></div');

    // Fill out PHD HTML
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
			$('#phd-thesis .'+rowDynamic).prepend('<div class="" id="miembrop'+[i+y+1]+'"></div>');
			if (phd_thesis[i+y].foto === "") {
				foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
			} else {
				foto = "info-miembros/"+phd_thesis[i+y].foto;
			}
			$('#phd-thesis .'+rowDynamic).append(
				'\r      <a href="'+phd_thesis[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+phd_thesis[i+y].nombre+'</br>'+
				'\r              <span class="text-muted español">PhD. Tesis</span>'+
				'\r              <span class="text-muted ingles noVisible">PhD. Theses</span>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r          <img class="img-members" src="'+foto+'" alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <p class="español"><br>'+phd_thesis[i+y].descrip_es+'</p>'+
				'\r            <p class="ingles noVisible"><br>'+phd_thesis[i+y].descrip_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phd_thesis[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phd_thesis[i+y].nombre+'</a></li>')


		}
	}

}
function renderColaboradores () {
	colaboradores = tabletop.sheets('colaboradores').all();
	console.log('colaboradores :'+colaboradores);
	var len = colaboradores.length;
	var rowDynamicCountColaboradores = 0;
	var yControl = 0;
	var iterations = 0;

	// render section COLABORADORES
	$('.navbar-nav.ingles .dropdown-menu').append('<li role="separator" class="divider"></li>');
	$('.navbar-nav.español .dropdown-menu').append('<li role="separator" class="divider"></li>');
	for (var i = 0; i < len; i += 3) {
		yControl++;
		var rowDynamic = 'row';
		rowDynamicCountColaboradores++;
		rowDynamic = rowDynamic + rowDynamicCountColaboradores
		$('#colaboradores').append('<div class="row '+rowDynamic+' proyectos-row row-colaboradores">');

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
			$('#colaboradores .'+rowDynamic).prepend('<div class="" id="miembroc'+[i+y+1]+'"></div>');
			if (colaboradores[i+y].foto === "") {
				foto = "https://picsum.photos/5"+i+y+"/5"+y+i;
			} else {
				foto = "info-miembros/"+colaboradores[i+y].foto;
			}
			$('#colaboradores .'+rowDynamic).append(
				'\r      <a href="'+colaboradores[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
				'\r              <span class="text-muted español">Colaboradora</span>'+
				'\r              <span class="text-muted ingles noVisible">Collaborator</span>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r          <img class="img-members" src="'+foto+'" alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
				'\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')

		}
	}

}

window.addEventListener('DOMContentLoaded', initMiembros);
