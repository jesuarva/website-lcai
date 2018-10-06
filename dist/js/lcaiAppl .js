console.log("hola, desde dynamic-contacto.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var directora;

/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
	tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
															callback: onSheetsLoad,
															simpleSheet: false
														}
													);
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
  console.log('Hi from onsheetLoad()');
  assignVariablesValuesFromSheet();
  renderContent();

}
function onSessionStorageLoad () {
  console.log('Hi from onSessionStorageLoad()');
  assignVariablesValuesFromSessionStorage();
  renderContent();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
  console.log('Hi from assignVariablesValuesFromSheet()');
  home = tabletop.sheets('home').all();
	sessionStorage.setItem('home', JSON.stringify(home));
  proyectos = tabletop.sheets('proyectos').all();
	sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
  eventos = tabletop.sheets('eventos').all();
	sessionStorage.setItem('eventos', JSON.stringify(eventos));
  directora = tabletop.sheets('directora').all();
  sessionStorage.setItem('directora', JSON.stringify(directora));
  investigadores = tabletop.sheets('investigadores').all();
  sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
  doctorandos = tabletop.sheets('doctorandos').all();
  sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
  phdThesis = tabletop.sheets('phdThesis').all();
  sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
  colaboradores = tabletop.sheets('colaboradores').all();
  sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));
}
function assignVariablesValuesFromSessionStorage () {
  console.log('Hi form assignVariablesValuesFromSessionStorage');
  directora = JSON.parse(sessionStorage.getItem('directora'));
  investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
  doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
  phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
  colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));
}
function renderContent () {
  console.log('Hi from renderContent()');
	renderFormularioContacto();
	renderDirectora();
	renderInvestigadores();
	renderDoctorandos();
	renderPHD();
	renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

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
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')



		}
	}

}
function renderInvestigadores () {

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
				foto = +investigadores[i+y].foto;
				console.log(foto);
				// foto = foto.toString();
				// console.log(foto);
				// fotoControl = foto.indexOf(".dropbox");
				// console.log(fotoControl);
				// foto = "https://dl"+foto.slice(fotoControl);
				// console.log(foto);
			}
			$('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'">'+
				'\r        <div class="text-center col-lg-4">'+
				'\r          <div class="img-circle-container">'+
				'\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
				'\r          </div>'+
				'\r          <h3>'+investigadores[i+y].nombre+'</br>'+
				'\r          </h3>'+
				'\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
				'\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
				'\r          <p>'+investigadores[i+y].email+'</p>'+
				'\r        </div><!-- /.col-lg-4 -->'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')



		}
	}

}
function renderDoctorandos () {

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
	    '\r        <img class="img-members center-block" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
			'\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
	    '\r          </h3>'+
	    '\r        </div>'+
	    '\r      </div>'+
	    '\r    </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')


		}
	}

}
function renderPHD () {

	console.log('phd :'+phdThesis);
	var len = phdThesis.length;
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
			if (phdThesis[i+y].foto === "") {
				foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
			} else {
				foto = "info-miembros/"+phdThesis[i+y].foto;
			}
			$('#phd-thesis .'+rowDynamic).append(
				'\r      <a href="'+phdThesis[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')


		}
	}

}
function renderColaboradores () {

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
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
 				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
				'\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')

		}
	}

}
function renderFormularioContacto () {
	// Render contact form from google-forms
	$('#formulario-contacto').append(
		'<iframe class="español" src="https://docs.google.com/forms/d/e/1FAIpQLSeilwcQsP-zn2ICi2-rY1rfQG7_Kp9YcPv9Adt_GFaQ88yIyA/viewform?embedded=true#start=embed" width="100%" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'+
		'<iframe class="ingles noVisible" src="https://docs.google.com/forms/d/e/1FAIpQLSfSK1h4VOOuoORDf-ut0FmI9Gq5xUjZlhutNnizI_HsJtsu3Q/viewform?embedded=true" width="100%" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'
	);

}

/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
		var storage = window[type],
				x = '__storage_test__';
		try {
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use localStorage awesomeness');
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use sessionStorage awesomeness');
  // Testing whether your storage has been populated
  if(sessionStorage.getItem('directora')) {
    console.log('there are data on sessionStorage');
    window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

  } else {
    console.log('there are NO data on sessionStorage');
    window.addEventListener('DOMContentLoaded', initMiembros);
  }
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no sessionStorage for us');
  window.addEventListener('DOMContentLoaded', initMiembros);
}
;console.log("hola, desde dynamic-eventos.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phdThesis;
var colaboradores;
var directora;
var eventos;

/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
	tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
															callback: onSheetsLoad,
															simpleSheet: false
														}
													);
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
  console.log('Hi from onsheetLoad()');
  assignVariablesValuesFromSheet();
  renderContent();

}
function onSessionStorageLoad () {
  console.log('Hi from onSessionStorageLoad()');
  assignVariablesValuesFromSessionStorage();
  renderContent();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
  console.log('Hi from assignVariablesValuesFromSheet()');
  home = tabletop.sheets('home').all();
	sessionStorage.setItem('home', JSON.stringify(home));
  proyectos = tabletop.sheets('proyectos').all();
	sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
  eventos = tabletop.sheets('eventos').all();
	sessionStorage.setItem('eventos', JSON.stringify(eventos));
  directora = tabletop.sheets('directora').all();
  sessionStorage.setItem('directora', JSON.stringify(directora));
  investigadores = tabletop.sheets('investigadores').all();
  sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
  doctorandos = tabletop.sheets('doctorandos').all();
  sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
  phdThesis = tabletop.sheets('phdThesis').all();
  sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
  colaboradores = tabletop.sheets('colaboradores').all();
  sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));
}
function assignVariablesValuesFromSessionStorage () {
  console.log('Hi form assignVariablesValuesFromSessionStorage');
  eventos = JSON.parse(sessionStorage.getItem('eventos'));
  directora = JSON.parse(sessionStorage.getItem('directora'));
  investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
  doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
  phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
  colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));
}
function renderContent () {
  console.log('Hi from renderContent()');
	renderEventos();
	renderDirectora();
	renderInvestigadores();
	renderDoctorandos();
	renderPHD();
	renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

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
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')



		}
	}

}
function renderInvestigadores () {

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
				foto = +investigadores[i+y].foto;
				console.log(foto);
				// foto = foto.toString();
				// console.log(foto);
				// fotoControl = foto.indexOf(".dropbox");
				// console.log(fotoControl);
				// foto = "https://dl"+foto.slice(fotoControl);
				// console.log(foto);
			}
			$('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'">'+
				'\r        <div class="text-center col-lg-4">'+
				'\r          <div class="img-circle-container">'+
				'\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
				'\r          </div>'+
				'\r          <h3>'+investigadores[i+y].nombre+'</br>'+
				'\r          </h3>'+
				'\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
				'\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
				'\r          <p>'+investigadores[i+y].email+'</p>'+
				'\r        </div><!-- /.col-lg-4 -->'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')



		}
	}

}
function renderDoctorandos () {

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
	    '\r        <img class="img-members center-block" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
			'\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
	    '\r          </h3>'+
	    '\r        </div>'+
	    '\r      </div>'+
	    '\r    </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')


		}
	}

}
function renderPHD () {

	console.log('phd :'+phdThesis);
	var len = phdThesis.length;
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
			if (phdThesis[i+y].foto === "") {
				foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
			} else {
				foto = "info-miembros/"+phdThesis[i+y].foto;
			}
			$('#phd-thesis .'+rowDynamic).append(
				'\r      <a href="'+phdThesis[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')


		}
	}

}
function renderColaboradores () {

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
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
 				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
				'\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')

		}
	}

}
function renderEventos () {

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
			if (!eventos[i+y].foto) {
				foto = "https://picsum.photos/10"+i+y+"/10"+y+i;
			} else {
				foto = eventos[i+y].foto;
			}
			$('#eventos .'+rowDynamic).append(
        '\r <div class="col-md-6">'+
        '\r   <div href="#Modal-'+[i+y+1]+'" class="modal-trigger" data-toggle="modal">'+
        '\r     <!-- width 480 , heigth 245 -->'+
        '\r     <img class="img-proyecto" src='+foto+' alt="Imágen del evento'+[i+y+1]+'">'+
        '\r     <div class="proyecto-descripcion español">'+
        '\r       <h3>'+eventos[i+y].evento_es+'</h3>'+
        '\r     </div>'+
        '\r     <div class="proyecto-descripcion ingles noVisible">'+
        '\r       <h3>'+eventos[i+y].evento_en+'</h3>'+
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
        '\r             </div>'+
        '\r             <div class="modal-body">'+
        '\r                 <img class="img-responsive" alt="Cartel evento '+eventos[i+y].evento_es+'" title="Cartel evento '+eventos[i+y].evento_es+'" src='+eventos[i+y].cartel+'>'+
        '\r                 <hr class="featurette-divider">'+
        '\r                 <img class="img-responsive" alt="Frontal del folleto para '+eventos[i+y].evento_es+'" title="Frontal del folleto para '+eventos[i+y].evento_es+'" src='+eventos[i+y].folleto_frontal+'>'+
        '\r                 <hr class="featurette-divider">'+
        '\r                 <img class="img-responsive" alt="Reverso del folleto para '+eventos[i+y].evento_es+'" title="Reverso del folleto para '+eventos[i+y].evento_es+'" src='+eventos[i+y].folleto_reverso+'>'+
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

/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
		var storage = window[type],
				x = '__storage_test__';
		try {
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use localStorage awesomeness');
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use sessionStorage awesomeness');
  // Testing whether your storage has been populated
  if(sessionStorage.getItem('directora')) {
    console.log('there are data on sessionStorage');
    window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

  } else {
    console.log('there are NO data on sessionStorage');
    window.addEventListener('DOMContentLoaded', initMiembros);
  }
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no sessionStorage for us');
  window.addEventListener('DOMContentLoaded', initMiembros);
}
;console.log("hola, desde dynamic-home.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phdThesis;
var colaboradores;
var directora;
var home;


/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
	tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
															callback: onSheetsLoad,
															simpleSheet: false
														}
													);
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
  console.log('Hi from onsheetLoad()');
  assignVariablesValuesFromSheet();
  renderContent();

}
function onSessionStorageLoad () {
  console.log('Hi from onSessionStorageLoad()');
  assignVariablesValuesFromSessionStorage();
  renderContent();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
  console.log('Hi from assignVariablesValuesFromSheet()');
  home = tabletop.sheets('home').all();
	sessionStorage.setItem('home', JSON.stringify(home));
  proyectos = tabletop.sheets('proyectos').all();
	sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
  eventos = tabletop.sheets('eventos').all();
	sessionStorage.setItem('eventos', JSON.stringify(eventos));
  directora = tabletop.sheets('directora').all();
  sessionStorage.setItem('directora', JSON.stringify(directora));
  investigadores = tabletop.sheets('investigadores').all();
  sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
  doctorandos = tabletop.sheets('doctorandos').all();
  sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
  phdThesis = tabletop.sheets('phdThesis').all();
  sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
  colaboradores = tabletop.sheets('colaboradores').all();
  sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));
}
function assignVariablesValuesFromSessionStorage () {
  console.log('Hi form assignVariablesValuesFromSessionStorage');
	home = JSON.parse(sessionStorage.getItem('home'));
	directora = JSON.parse(sessionStorage.getItem('directora'));
  investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
  doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
  phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
  colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));
}
function renderContent () {
  console.log('Hi from renderContent()');
	renderHome();
	renderDirectora();
	renderInvestigadores();
	renderDoctorandos();
	renderPHD();
	renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

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
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')



		}
	}

}
function renderInvestigadores () {

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
				foto = +investigadores[i+y].foto;
				console.log(foto);
				// foto = foto.toString();
				// console.log(foto);
				// fotoControl = foto.indexOf(".dropbox");
				// console.log(fotoControl);
				// foto = "https://dl"+foto.slice(fotoControl);
				// console.log(foto);
			}
			$('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'">'+
				'\r        <div class="text-center col-lg-4">'+
				'\r          <div class="img-circle-container">'+
				'\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
				'\r          </div>'+
				'\r          <h3>'+investigadores[i+y].nombre+'</br>'+
				'\r          </h3>'+
				'\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
				'\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
				'\r          <p>'+investigadores[i+y].email+'</p>'+
				'\r        </div><!-- /.col-lg-4 -->'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')



		}
	}

}
function renderDoctorandos () {

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
	    '\r        <img class="img-members center-block" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
			'\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
	    '\r          </h3>'+
	    '\r        </div>'+
	    '\r      </div>'+
	    '\r    </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')


		}
	}

}
function renderPHD () {

	console.log('phd :'+phdThesis);
	var len = phdThesis.length;
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
			if (phdThesis[i+y].foto === "") {
				foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
			} else {
				foto = "info-miembros/"+phdThesis[i+y].foto;
			}
			$('#phd-thesis .'+rowDynamic).append(
				'\r      <a href="'+phdThesis[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')


		}
	}

}
function renderColaboradores () {

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
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
 				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
				'\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')

		}
	}

}
function renderHome () {

	console.log('home :'+home);
  $('#español').append(
    '<p class="col-md-12">'+
      home[0].texto_es+
    '</p>'
  );
  $('#ingles').append(
    '<p class="col-md-12">'+
      home[0].texto_en+
    '</p>'
  );
}

/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
		var storage = window[type],
				x = '__storage_test__';
		try {
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use localStorage awesomeness');
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use sessionStorage awesomeness');
  // Testing whether your storage has been populated
  if(sessionStorage.getItem('home')) {
    console.log('there are data on sessionStorage');
    window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

  } else {
    console.log('there are NO data on sessionStorage');
    window.addEventListener('DOMContentLoaded', initMiembros);
  }
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no sessionStorage for us');
  window.addEventListener('DOMContentLoaded', initMiembros);
}
;console.log("hola, desde dynamic-miembros.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phdThesis;
var colaboradores;
var directora;
var foto;
var fotoControl;

/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
	tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
															callback: onSheetsLoad,
															simpleSheet: false
														}
													);
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
  // console.log('Hi from onsheetLoad()');
  assignVariablesValuesFromSheet();
  renderContent();
  addClickEventToMemberSnippet();

}
function onSessionStorageLoad () {
  console.log('Hi from onSessionStorageLoad()');
  assignVariablesValuesFromSessionStorage();
  renderContent();
  addClickEventToMemberSnippet();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
  console.log('Hi from assignVariablesValuesFromSheet()');
  home = tabletop.sheets('home').all();
	sessionStorage.setItem('home', JSON.stringify(home));
  proyectos = tabletop.sheets('proyectos').all();
	sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
  eventos = tabletop.sheets('eventos').all();
	sessionStorage.setItem('eventos', JSON.stringify(eventos));
  directora = tabletop.sheets('directora').all();
  sessionStorage.setItem('directora', JSON.stringify(directora));
  investigadores = tabletop.sheets('investigadores').all();
  sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
  doctorandos = tabletop.sheets('doctorandos').all();
  sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
  phdThesis = tabletop.sheets('phdThesis').all();
  sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
  colaboradores = tabletop.sheets('colaboradores').all();
  sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));
}
function assignVariablesValuesFromSessionStorage () {
  console.log('Hi form assignVariablesValuesFromSessionStorage');
  directora = JSON.parse(sessionStorage.getItem('directora'));
  investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
  doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
  phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
  colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));
}
function renderContent () {
  console.log('Hi from renderContent()');
  renderDirectora();
	renderInvestigadores();
	renderDoctorandos();
	renderPHD();
	renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

	// console.log('directora :'+directora);
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
			// console.log(y);
			$('#directora .'+rowDynamic).prepend('<div class="" id="miembro'+[i+y+1]+'"></div>');
			if (!directora[i+y].foto) {
        console.log('No hay foto');
				foto = "https://picsum.photos/4"+i+y+"/3"+y+i;
			} else {
        console.log('Sí hay foto');
				foto = directora[i+y].foto;
			}
			$('#directora .'+rowDynamic).append(
				'\r <a href="'+directora[i+y].enlace_a_web+'" member-title="directora" member-index="'+[i+y]+'">'+
				'\r   <div id="miembro1" class="col-md-5">'+
				'\r     <img class="featurette-image img-responsive center-block" src='+foto+' alt="Generic placeholder image">'+
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
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')



		}
	}

}
function renderInvestigadores () {

	// console.log('investigadores :'+investigadores);
	var len = investigadores.length;
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

		// Me define el número de veces que debo iterar el segundo for anidado. Tal que sólo itere el número total de 'rows' que tenga el Sheet y no más (así no da ERROR y para la ejecución del script).
		if (yControl <= Math.floor(len / 3)) {
			iterations = 3;
		} else {
			iterations = len % 3;
		}
		for ( y = 0; y < iterations; y++) {
			// console.log(y);
			$('#investigadores .'+rowDynamic).prepend('<div class="" id="miembroi'+[i+y+1]+'"></div>');
			if (!investigadores[i+y].foto) {
				foto = "https://picsum.photos/8"+i+y+"/8"+y+i;
			} else {
        console.log('Sí hay foto');
				foto = investigadores[i+y].foto;
        // console.log(investigadores[i+y].foto);
        // console.log(foto);
			}
			$('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'" member-title="investigadores" member-index="'+[i+y]+'">'+
				'\r        <div class="text-center col-lg-4">'+
				'\r          <div class="img-circle-container">'+
				'\r            <img class="img-circle" src='+foto+' alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
				'\r          </div>'+
				'\r          <h3>'+investigadores[i+y].nombre+'</br>'+
				'\r          </h3>'+
				'\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
				'\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
				'\r          <p>'+investigadores[i+y].email+'</p>'+
				'\r        </div><!-- /.col-lg-4 -->'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')



		}
	}

}
function renderDoctorandos () {

	// console.log('doctorandos :'+doctorandos);
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
			// console.log(y);
			$('#doctorandos .'+rowDynamic).prepend('<div class="" id="miembrod'+[i+y+1]+'"></div>');
			if (!doctorandos[i+y].foto) {
				foto = "https://picsum.photos/7"+i+y+"/7"+y+i;
			} else {
				foto = doctorandos[i+y].foto;
			}
			$('#doctorandos .'+rowDynamic).append(
	    '\r    <a href="'+doctorandos[i+y].enlace_a_web+'" member-title="doctorandos" member-index="'+[i+y]+'">'+
	    '\r      <div class="col-md-4">'+
	    '\r        <img class="img-members center-block" src='+foto+' alt="foto de '+doctorandos[i+y].nombre+'">'+
			'\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
	    '\r          </h3>'+
	    '\r        </div>'+
	    '\r      </div>'+
	    '\r    </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')


		}
	}

}
function renderPHD () {

	// console.log('phd :'+phdThesis);
	var len = phdThesis.length;
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
		rowDynamic = rowDynamic + rowDynamicCountPhd;
		$('#phd-thesis').append('<div  class="row '+rowDynamic+' proyectos-row row-phdThesis"></div');

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
			// console.log(y);
			$('#phd-thesis .'+rowDynamic).prepend('<div class="" id="miembrop'+[i+y+1]+'"></div>');
			if (!phdThesis[i+y].foto) {
				foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
			} else {
				foto = phdThesis[i+y].foto;
			}
			$('#phd-thesis .'+rowDynamic).append(
				'\r      <a href="'+phdThesis[i+y].enlace_a_web+'" member-title="phdThesis" member-index="'+[i+y]+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src='+foto+' alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')


		}
	}

}
function renderColaboradores () {

	// console.log('colaboradores :'+colaboradores);
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
		rowDynamic = rowDynamic + rowDynamicCountColaboradores;
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
			// console.log(y);
			$('#colaboradores .'+rowDynamic).prepend('<div class="" id="miembroc'+[i+y+1]+'"></div>');
			if (!colaboradores[i+y].foto) {
				foto = "https://picsum.photos/5"+i+y+"/5"+y+i;
			} else {
				foto = colaboradores[i+y].foto;
			}
			$('#colaboradores .'+rowDynamic).append(
				'\r      <a href="'+colaboradores[i+y].enlace_a_web+'" member-title="colaboradores" member-index="'+[i+y]+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src='+foto+' alt="">'+
 				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
				'\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')

		}
	}

}

/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
		var storage = window[type],
				x = '__storage_test__';
		try {
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use localStorage awesomeness');
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use sessionStorage awesomeness');
  // Testing whether your storage has been populated
  if(sessionStorage.getItem('directora')) {
    console.log('there are data on sessionStorage');
    window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

  } else {
    console.log('there are NO data on sessionStorage');
    window.addEventListener('DOMContentLoaded', initMiembros);
  }
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no sessionStorage for us');
  window.addEventListener('DOMContentLoaded', initMiembros);
}

/* EVENTS LISTENERS
 * Clicking on a members snippet redirects to a new page with the member information.
 * In order to load dinamically the member info into the template 'ficha-miembro.html'
 * the click event stores some parameters into the sessionStorage. These parameters
 * are used as a help to render the content into 'ficha-miembros.html' page
 */
function addClickEventToMemberSnippet () {
  $('.members-list .row a').on('click', actionOnClick);
}
var actionOnClick = function ( e ) {
  e.preventDefault();
  console.log('actionOnClick is working');
  console.log($(this).attr('href'));
  var miembro_title = $(this).attr('member-title');
  var miembro_index = $(this).attr('member-index');
  var currentUrl = window.location.href;
	console.log(currentUrl);
  sessionStorage.setItem('miembro_title', miembro_title);
  sessionStorage.setItem('miembro_index', miembro_index);

  // Check if current URL has attr 'idioma=en' to concatenate a new URL according to this attr.
	if (currentUrl.indexOf('idioma=en')) {
		window.location = 'http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/ficha-miembro.html?idioma=en&miembro_title='+miembro_title+'&miembro_index='+miembro_index;
	} else {
		window.location = 'http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/ficha-miembro.html?miembro_title='+miembro_title+'&miembro_index='+miembro_index;
	}


};
;console.log("hola, desde dynamic-proyectos.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phdThesis;
var colaboradores;
var directora;
var proyectos;


/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
	tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
															callback: onSheetsLoad,
															simpleSheet: false
														}
													);
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
  console.log('Hi from onsheetLoad()');
  assignVariablesValuesFromSheet();
  renderContent();
	addClickEventToMemberSnippet();

}
function onSessionStorageLoad () {
  console.log('Hi from onSessionStorageLoad()');
  assignVariablesValuesFromSessionStorage();
  renderContent();
	addClickEventToMemberSnippet();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
  console.log('Hi from assignVariablesValuesFromSheet()');
  home = tabletop.sheets('home').all();
	sessionStorage.setItem('home', JSON.stringify(home));
  proyectos = tabletop.sheets('proyectos').all();
	sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
  eventos = tabletop.sheets('eventos').all();
	sessionStorage.setItem('eventos', JSON.stringify(eventos));
  directora = tabletop.sheets('directora').all();
  sessionStorage.setItem('directora', JSON.stringify(directora));
  investigadores = tabletop.sheets('investigadores').all();
  sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
  doctorandos = tabletop.sheets('doctorandos').all();
  sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
  phdThesis = tabletop.sheets('phdThesis').all();
  sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
  colaboradores = tabletop.sheets('colaboradores').all();
  sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));
}
function assignVariablesValuesFromSessionStorage () {
  console.log('Hi form assignVariablesValuesFromSessionStorage');
  proyectos = JSON.parse(sessionStorage.getItem('proyectos'));
  directora = JSON.parse(sessionStorage.getItem('directora'));
  investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
  doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
  phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
  colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));
}
function renderContent () {
  console.log('Hi from renderContent()');
	renderProyectos();
	renderDirectora();
	renderInvestigadores();
	renderDoctorandos();
	renderPHD();
	renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

	// console.log('directora :'+directora);
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
			// console.log(y);
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
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>')



		}
	}

}
function renderInvestigadores () {

	// console.log('investigadores :'+investigadores);
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

		// Me define el número de veces que debo iterar el segundo for anidado. Tal que sólo itere el número total de 'rows' que tenga el Sheet y no más (así no da ERROR y para la ejecución del script).
		if (yControl <= Math.floor(len / 3)) {
			iterations = 3;
		} else {
			iterations = len % 3;
		}
		for ( y = 0; y < iterations; y++) {
			// console.log(y);
			$('#investigadores .'+rowDynamic).prepend('<div class="" id="miembroi'+[i+y+1]+'"></div>');
			if (investigadores[i+y].foto === "") {
				foto = "https://picsum.photos/8"+i+y+"/8"+y+i;
			} else {
				foto = +investigadores[i+y].foto;
				// console.log(foto);
				// foto = foto.toString();
				// console.log(foto);
				// fotoControl = foto.indexOf(".dropbox");
				// console.log(fotoControl);
				// foto = "https://dl"+foto.slice(fotoControl);
				// console.log(foto);
			}
			$('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'">'+
				'\r        <div class="text-center col-lg-4">'+
				'\r          <div class="img-circle-container">'+
				'\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
				'\r          </div>'+
				'\r          <h3>'+investigadores[i+y].nombre+'</br>'+
				'\r          </h3>'+
				'\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
				'\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
				'\r          <p>'+investigadores[i+y].email+'</p>'+
				'\r        </div><!-- /.col-lg-4 -->'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>')



		}
	}

}
function renderDoctorandos () {

	// console.log('doctorandos :'+doctorandos);
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
			// console.log(y);
			$('#doctorandos .'+rowDynamic).prepend('<div class="" id="miembrod'+[i+y+1]+'"></div>');
			if (doctorandos[i+y].foto === "") {
				foto = "https://picsum.photos/7"+i+y+"/7"+y+i;
			} else {
				foto = "info-miembros/"+doctorandos[i+y].foto;
			}
			$('#doctorandos .'+rowDynamic).append(
	    '\r    <a href="'+doctorandos[i+y].enlace_a_web+'">'+
	    '\r      <div class="col-md-4">'+
	    '\r        <img class="img-members center-block" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
			'\r        <div class="text-center proyecto-descripcion">'+
	    '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
	    '\r          </h3>'+
	    '\r        </div>'+
	    '\r      </div>'+
	    '\r    </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>')


		}
	}

}
function renderPHD () {

	// console.log('phd :'+phdThesis);
	var len = phdThesis.length;
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
			// console.log(y);
			$('#phd-thesis .'+rowDynamic).prepend('<div class="" id="miembrop'+[i+y+1]+'"></div>');
			if (phdThesis[i+y].foto === "") {
				foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
			} else {
				foto = "info-miembros/"+phdThesis[i+y].foto;
			}
			$('#phd-thesis .'+rowDynamic).append(
				'\r      <a href="'+phdThesis[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>')


		}
	}

}
function renderColaboradores () {

	// console.log('colaboradores :'+colaboradores);
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
			// console.log(y);
			$('#colaboradores .'+rowDynamic).prepend('<div class="" id="miembroc'+[i+y+1]+'"></div>');
			if (colaboradores[i+y].foto === "") {
				foto = "https://picsum.photos/5"+i+y+"/5"+y+i;
			} else {
				foto = "info-miembros/"+colaboradores[i+y].foto;
			}
			$('#colaboradores .'+rowDynamic).append(
				'\r      <a href="'+colaboradores[i+y].enlace_a_web+'">'+
				'\r        <div id="" class="col-md-4">'+
				'\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
 				'\r          <div class="text-center proyecto-descripcion">'+
				'\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
				'\r            </h3>'+
				'\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
				'\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
				'\r          </div>'+
				'\r        </div>'+
				'\r      </a>'
			);
			$('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')
			$('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>')

		}
	}

}
function renderProyectos () {

	// console.log('proyectos :'+proyectos);
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
		var foto1;
		// Me define el número de veces que debo iterar el segundo for anidado. Tal que sólo itere el número total de 'rows' que tenga el Sheet y no más (así no da ERROR y para la ejecución del script).
		if (yControl <= Math.floor(len / 3)) {
			iterations = 3;
		} else {
			iterations = len % 3;
		}
		for ( y = 0; y < iterations; y++) {
			// console.log(y);
			$('#proyectos .'+rowDynamic).prepend('<div class="" id="proyecto'+[i+y+1]+'"></div>');
			if (!proyectos[i+y].foto1) {
				foto1 = "https://picsum.photos/7"+i+y+"/7"+y+i;
			} else {
				foto1 = proyectos[i+y].foto1;
			}
			$('#proyectos .'+rowDynamic).append(
        '\r   <div class="col-md-4">'+
        '\r   	<a href="" proyecto-title="proyectos" proyecto-index="'+[i+y]+'">'+
        '\r   	  <img class="img-proyecto" src='+foto1+' alt="imágen Proyecto'+proyectos[i+y].proyecto_es+'">'+
        '\r     	<div class="proyecto-descripcion español">'+
        '\r       	<h3>'+proyectos[i+y].title_es+'</h3>'+
        '\r    	 </div>'+
        '\r    	 <div class="proyecto-descripcion ingles noVisible">'+
        '\r     	  <h3>'+proyectos[i+y].title_en+'</h3>'+
        '\r    	 </div>'+
        '\r   	</a>'+
        '\r   </div>'
			);


		}
	}

}

/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
		var storage = window[type],
				x = '__storage_test__';
		try {
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use localStorage awesomeness');
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
  // Yippee! We can use localStorage awesomeness
	console.log('Yippee! We can use sessionStorage awesomeness');
  // Testing whether your storage has been populated
  if(sessionStorage.getItem('proyectos')) {
    console.log('there are data on sessionStorage');
    window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

  } else {
    console.log('there are NO data on sessionStorage');
    window.addEventListener('DOMContentLoaded', initMiembros);
  }
}
else {
  // Too bad, no localStorage for us
	console.log('Too bad, no sessionStorage for us');
  window.addEventListener('DOMContentLoaded', initMiembros);
}


/* EVENTS LISTENERS
 * Clicking on a project snippet redirects to a new page with the project information.
 * In order to load dinamically the project info into the template 'ficha-proyecto.html'
 * the click event stores some parameters into the sessionStorage and add this parameters
 * as attributes to URL.
 * These parameters are used as a base to render the content into 'ficha-miembros.html' page
 */
function addClickEventToMemberSnippet () {
  $('#proyectos .row a').on('click', actionOnClick);
}
var actionOnClick = function ( e ) {
  e.preventDefault();
  console.log('actionOnClick is working');
  console.log($(this).attr('href'));
  var proyecto_title = $(this).attr('proyecto-title');
  var proyecto_index = $(this).attr('proyecto-index');
	var currentUrl = window.location.href;
	console.log(currentUrl);
  sessionStorage.setItem('proyecto_title', proyecto_title);
  sessionStorage.setItem('miembro_index', proyecto_index);

	// Check if current URL has attr 'idioma=en' to concatenate a new URL according to this attr.
	if ($('.idioma-cambia').attr('idioma') == 'en') {
		window.location = 'http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/ficha-proyecto.html?idioma=en&proyecto_title='+proyecto_title+'&proyecto_index='+proyecto_index;
	} else {
		window.location = 'http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/ficha-proyecto.html?proyecto_title='+proyecto_title+'&proyecto_index='+proyecto_index;
	}

};
;console.log("hola, desde dynamic-miembros.js");

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
	renderHome();
	renderProyectos();
	renderEventos();

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
function renderhome () {
  home = tabletop.sheets('home').all();
	console.log('home :'+home);
  $('#español').append(
    '<p class="col-md-12">'+
      home[0].texto_es+
    '</p>'
  );
  $('#ingles').append(
    '<p class="col-md-12">'+
      home[0].texto_en+
    '</p>'
  );
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
function renderEventos () {
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
        '\r       <h3>'+eventos[i+y].evento_en+'</h3>'+
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

window.addEventListener('DOMContentLoaded', initMiembros);
;
console.log("hola, desde dynamic-miembros.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phdThesis;
var colaboradores;
var directora;
var ficha_miembro;
var miembro_title;
var miembro_index;

/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
 tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
                             callback: onSheetsLoad,
                             simpleSheet: false
                           }
                         );
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
 console.log('Hi from onsheetLoad()');
 assignVariablesValuesFromSheet();
 renderContent();

}
function onSessionStorageLoad () {
 console.log('Hi from onSessionStorageLoad()');
 assignVariablesValuesFromSessionStorage();
 renderContent();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
 console.log('Hi from assignVariablesValuesFromSheet()');
 home = tabletop.sheets('home').all();
 sessionStorage.setItem('home', JSON.stringify(home));
 proyectos = tabletop.sheets('proyectos').all();
 sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
 eventos = tabletop.sheets('eventos').all();
 sessionStorage.setItem('eventos', JSON.stringify(eventos));
 directora = tabletop.sheets('directora').all();
 sessionStorage.setItem('directora', JSON.stringify(directora));
 investigadores = tabletop.sheets('investigadores').all();
 sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
 doctorandos = tabletop.sheets('doctorandos').all();
 sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
 phdThesis = tabletop.sheets('phdThesis').all();
 sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
 colaboradores = tabletop.sheets('colaboradores').all();
 sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));

 ficha_miembro = tabletop.sheets(miembro_title).all();

}
function assignVariablesValuesFromSessionStorage () {
 console.log('Hi form assignVariablesValuesFromSessionStorage');
 directora = JSON.parse(sessionStorage.getItem('directora'));
 investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
 doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
 phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
 colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));

 ficha_miembro = JSON.parse(sessionStorage.getItem(miembro_title));
}
function renderContent () {
 console.log('Hi from renderContent()');
 renderFichaMiembros();
 renderDirectora();
 renderInvestigadores();
 renderDoctorandos();
 renderPHD();
 renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

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
       '\r <a href="'+directora[i+y].enlace_a_web+'" member-title="directora" member-index="'+[i+y]+'">'+
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
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>');



   }
 }

}
function renderInvestigadores () {

 console.log('investigadores :'+investigadores);
 var len = investigadores.length;
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
       foto = +investigadores[i+y].foto;
       console.log(foto);
       // foto = foto.toString();
       // console.log(foto);
       // fotoControl = foto.indexOf(".dropbox");
       // console.log(fotoControl);
       // foto = "https://dl"+foto.slice(fotoControl);
       // console.log(foto);
     }
     $('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'" member-title="investigadores" member-index="'+[i+y]+'">'+
       '\r        <div class="text-center col-lg-4">'+
       '\r          <div class="img-circle-container">'+
       '\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
       '\r          </div>'+
       '\r          <h3>'+investigadores[i+y].nombre+'</br>'+
       '\r          </h3>'+
       '\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
       '\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
       '\r          <p>'+investigadores[i+y].email+'</p>'+
       '\r        </div><!-- /.col-lg-4 -->'+
       '\r      </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>');



   }
 }

}
function renderDoctorandos () {

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
     '\r    <a href="'+doctorandos[i+y].enlace_a_web+'" member-title="doctorandos" member-index="'+[i+y]+'">'+
     '\r      <div class="col-md-4">'+
     '\r        <img class="img-members center-block" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
     '\r        <div class="text-center proyecto-descripcion">'+
     '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
     '\r          </h3>'+
     '\r        </div>'+
     '\r      </div>'+
     '\r    </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>');


   }
 }

}
function renderPHD () {

 console.log('phd :'+phdThesis);
 var len = phdThesis.length;
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
   rowDynamic = rowDynamic + rowDynamicCountPhd;
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
     if (phdThesis[i+y].foto === "") {
       foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
     } else {
       foto = "info-miembros/"+phdThesis[i+y].foto;
     }
     $('#phd-thesis .'+rowDynamic).append(
       '\r      <a href="'+phdThesis[i+y].enlace_a_web+'" member-title="phdThesis" member-index="'+[i+y]+'">'+
       '\r        <div id="" class="col-md-4">'+
       '\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
       '\r          <div class="text-center proyecto-descripcion">'+
       '\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
       '\r            </h3>'+
       '\r          </div>'+
       '\r        </div>'+
       '\r      </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>');


   }
 }

}
function renderColaboradores () {

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
   rowDynamic = rowDynamic + rowDynamicCountColaboradores;
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
       '\r      <a href="'+colaboradores[i+y].enlace_a_web+'" member-title="colaboradores" member-index="'+[i+y]+'">'+
       '\r        <div id="" class="col-md-4">'+
       '\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
       '\r          <div class="text-center proyecto-descripcion">'+
       '\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
       '\r            </h3>'+
       '\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
       '\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
       '\r          </div>'+
       '\r        </div>'+
       '\r      </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>');

   }
 }

}
function renderFichaMiembros () {

   console.log('ficha_miembro :'+ficha_miembro);
   var len = ficha_miembro.length;
   var rowDynamicCountficha_miembro = 0;
   var yControl = 0;
   var iterations = 0;

   // render section ficha_miembro
  yControl++;
  var rowDynamic = 'row';
  rowDynamicCountficha_miembro++;
  rowDynamic = rowDynamic + rowDynamicCountficha_miembro;
  $('#ficha-miembro').append('<div class="row '+rowDynamic+' featurette row-directora">');
  $('.sub-header .row').append('<h1 class="col-md-12 ingles noVisible">'+ficha_miembro[miembro_index].nombre+'</h1>');

  // Fill out ficha_miembro HTML
  var y = 0;
  var foto;

  console.log(y);
  $('#ficha-miembro .'+rowDynamic).prepend('<div class="" id="'+miembro_title+miembro_index+'"></div>');
  if (!ficha_miembro[miembro_index].foto) {
  foto = "https://picsum.photos/4"+miembro_index+miembro_index+1+"/3"+miembro_index+miembro_index+2;
  } else {
  foto = ficha_miembro[miembro_index].foto;
  }
  $('#ficha-miembro .'+rowDynamic).append(
    '\r   <div id="'+miembro_title+miembro_index+'" class="col-md-5">'+
    '\r          <div class="img-circle-container">'+
    '\r            <img class="img-circle" src='+foto+' alt="foto de '+ficha_miembro[miembro_index].nombre+'" width="170" height="200">'+
    '\r          </div>'+
    '\r   </div>'+
    '\r   <div class="col-md-7">'+
    '\r     <h2 class="featurette-heading">'+
    '\r       <span class="text-muted español">'+ficha_miembro[miembro_index].title_es+'</span>'+
    '\r       <span class="text-muted ingles noVisible">'+ficha_miembro[miembro_index].title_en+'</span>'+
    '\r     </h2>'+
    '\r     <p class="lead español">'+ficha_miembro[miembro_index].universidad_es+'<br><a class="text-muted" href="mailto:'+ficha_miembro[miembro_index].email+'">'+ficha_miembro[miembro_index].email+'<a></p>'+
    '\r     <p class="lead español">'+ficha_miembro[miembro_index].universidad_es+'<br><a class="text-muted" href="mailto:'+ficha_miembro[miembro_index].email+'">'+ficha_miembro[miembro_index].email+'<a></p>'+
    '\r     <p class="lead ingles noVisible">'+ficha_miembro[miembro_index].universidad_en+'<br><a class="text-muted" href="mailto:'+ficha_miembro[miembro_index].email+'">'+ficha_miembro[miembro_index].email+'<a></p>'+
    '\r     <p class="lead español"><a href="">'+ficha_miembro[miembro_index].enlace_a_web+'</a></p>'+
    '\r   </div>'
  );
  $('#ficha-miembro').append('<div class="row row2 featurette row-directora">');
  $('#ficha-miembro .row2').append(
    '\r   <div id="vacio" class="col-md-1"></div>'+
    '\r   <div id="'+miembro_title+miembro_index+'-detalle" class="col-md-10">'+
    '\r     <p class="lead español">'+ficha_miembro[miembro_index].descrip_es+'</p>'+
    '\r     <p class="lead ingles noVisible">'+ficha_miembro[miembro_index].descrip_en+'</p>'+
    '\r   </div>'+
    '\r   <div id="vacio" class="col-md-1"></div>'
  );
}


/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
   var storage = window[type],
       x = '__storage_test__';
   try {
       storage.setItem(x, x);
       storage.removeItem(x);
       return true;
   }
   catch(e) {
       return e instanceof DOMException && (
           // everything except Firefox
           e.code === 22 ||
           // Firefox
           e.code === 1014 ||
           // test name field too, because code might not be present
           // everything except Firefox
           e.name === 'QuotaExceededError' ||
           // Firefox
           e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
           // acknowledge QuotaExceededError only if there's something already stored
           storage.length !== 0;
   }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
 // Yippee! We can use localStorage awesomeness
 console.log('Yippee! We can use localStorage awesomeness');
}
else {
 // Too bad, no localStorage for us
 console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
 // Yippee! We can use localStorage awesomeness
 console.log('Yippee! We can use sessionStorage awesomeness');
 // Testing whether your storage has been populated
 if(sessionStorage.getItem('directora')) {
   console.log('there are data on sessionStorage');
   window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

 } else {
   console.log('there are NO data on sessionStorage');
   window.addEventListener('DOMContentLoaded', initMiembros);
 }
}
else {
 // Too bad, no localStorage for us
 console.log('Too bad, no sessionStorage for us');
 window.addEventListener('DOMContentLoaded', initMiembros);
}



// Read URL parameters Function
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

miembro_title = getQueryVariable('miembro_title');
miembro_index = getQueryVariable('miembro_index');
;
console.log("hola, desde dynamic-miembros.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1oOnKqQim1RrsvF7Twfjp83SV-myjBFz6TUsZNM2jnFc/edit?usp=sharing';
var tabletop;
var investigadores;
var doctorandos;
var phdThesis;
var colaboradores;
var directora;
var ficha_proyecto;
var proyecto_title;
var proyecto_index;

/* LOAD INFO FROM GOOGLE DIRVE's spreadsheet */
function initMiembros() {
 tabletop = Tabletop.init( { key: publicSpreadsheetUrl,
                             callback: onSheetsLoad,
                             simpleSheet: false
                           }
                         );
}
// function showInfo(data, tabletop) {
// 	alert('Successfully processed!')
// 	console.log(data);
// }

/* RENDER CONTENT */
function onSheetsLoad () {
 console.log('Hi from onsheetLoad()');
 assignVariablesValuesFromSheet();
 renderContent();

}
function onSessionStorageLoad () {
 console.log('Hi from onSessionStorageLoad()');
 assignVariablesValuesFromSessionStorage();
 renderContent();

}

/* DEALING WITH DATA */
function assignVariablesValuesFromSheet () {
 console.log('Hi from assignVariablesValuesFromSheet()');
 home = tabletop.sheets('home').all();
 sessionStorage.setItem('home', JSON.stringify(home));
 proyectos = tabletop.sheets('proyectos').all();
 sessionStorage.setItem('proyectos', JSON.stringify(proyectos));
 eventos = tabletop.sheets('eventos').all();
 sessionStorage.setItem('eventos', JSON.stringify(eventos));
 directora = tabletop.sheets('directora').all();
 sessionStorage.setItem('directora', JSON.stringify(directora));
 investigadores = tabletop.sheets('investigadores').all();
 sessionStorage.setItem('investigadores', JSON.stringify(investigadores));
 doctorandos = tabletop.sheets('doctorandos').all();
 sessionStorage.setItem('doctorandos', JSON.stringify(doctorandos));
 phdThesis = tabletop.sheets('phdThesis').all();
 sessionStorage.setItem('phdThesis', JSON.stringify(phdThesis));
 colaboradores = tabletop.sheets('colaboradores').all();
 sessionStorage.setItem('colaboradores', JSON.stringify(colaboradores));

 ficha_proyecto = tabletop.sheets(proyecto_title).all();

}
function assignVariablesValuesFromSessionStorage () {
 console.log('Hi form assignVariablesValuesFromSessionStorage');
 directora = JSON.parse(sessionStorage.getItem('directora'));
 investigadores = JSON.parse(sessionStorage.getItem('investigadores'));
 doctorandos = JSON.parse(sessionStorage.getItem('doctorandos'));
 phdThesis = JSON.parse(sessionStorage.getItem('phdThesis'));
 colaboradores = JSON.parse(sessionStorage.getItem('colaboradores'));

 ficha_proyecto = JSON.parse(sessionStorage.getItem(proyecto_title));
}
function renderContent () {
 console.log('Hi from renderContent()');
 renderFichaProyecto();
 renderDirectora();
 renderInvestigadores();
 renderDoctorandos();
 renderPHD();
 renderColaboradores();
}

/* BUILD DOM STRUCTURE */
function renderDirectora () {

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
       '\r <a href="'+directora[i+y].enlace_a_web+'" member-title="directora" member-index="'+[i+y]+'">'+
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
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Cordinadora" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembro'+[i+y+1]+'">'+directora[i+y].nombre+'</a></li>');



   }
 }

}
function renderInvestigadores () {

 console.log('investigadores :'+investigadores);
 var len = investigadores.length;
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
       foto = +investigadores[i+y].foto;
       console.log(foto);
       // foto = foto.toString();
       // console.log(foto);
       // fotoControl = foto.indexOf(".dropbox");
       // console.log(fotoControl);
       // foto = "https://dl"+foto.slice(fotoControl);
       // console.log(foto);
     }
     $('#investigadores .'+rowDynamic).append('<a href="'+investigadores[i+y].enlace_a_web+'" member-title="investigadores" member-index="'+[i+y]+'">'+
       '\r        <div class="text-center col-lg-4">'+
       '\r          <div class="img-circle-container">'+
       '\r            <img class="img-circle" src="'+foto+'" alt="foto de '+investigadores[i+y].nombre+'" width="140" height="140">'+
       '\r          </div>'+
       '\r          <h3>'+investigadores[i+y].nombre+'</br>'+
       '\r          </h3>'+
       '\r          <p class="español">'+investigadores[i+y].universidad_es+'</p>'+
       '\r          <p class="ingles noVisible">'+investigadores[i+y].universidad_en+'</p>'+
       '\r          <p>'+investigadores[i+y].email+'</p>'+
       '\r        </div><!-- /.col-lg-4 -->'+
       '\r      </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Investigador" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroi'+[i+y+1]+'">'+investigadores[i+y].nombre+'</a></li>');



   }
 }

}
function renderDoctorandos () {

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
     '\r    <a href="'+doctorandos[i+y].enlace_a_web+'" member-title="doctorandos" member-index="'+[i+y]+'">'+
     '\r      <div class="col-md-4">'+
     '\r        <img class="img-members center-block" src="'+foto+'" alt="foto de '+doctorandos[i+y].nombre+'">'+
     '\r        <div class="text-center proyecto-descripcion">'+
     '\r          <h3>'+doctorandos[i+y].nombre+'</br>'+
     '\r          </h3>'+
     '\r        </div>'+
     '\r      </div>'+
     '\r    </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Doctorando" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrod'+[i+y+1]+'">'+doctorandos[i+y].nombre+'</a></li>');


   }
 }

}
function renderPHD () {

 console.log('phd :'+phdThesis);
 var len = phdThesis.length;
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
   rowDynamic = rowDynamic + rowDynamicCountPhd;
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
     if (phdThesis[i+y].foto === "") {
       foto = "https://picsum.photos/6"+i+y+"/6"+y+i;
     } else {
       foto = "info-miembros/"+phdThesis[i+y].foto;
     }
     $('#phd-thesis .'+rowDynamic).append(
       '\r      <a href="'+phdThesis[i+y].enlace_a_web+'" member-title="phdThesis" member-index="'+[i+y]+'">'+
       '\r        <div id="" class="col-md-4">'+
       '\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
       '\r          <div class="text-center proyecto-descripcion">'+
       '\r            <h3>'+phdThesis[i+y].nombre+'</br>'+
       '\r            </h3>'+
       '\r          </div>'+
       '\r        </div>'+
       '\r      </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Phd - Tesis" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembrop'+[i+y+1]+'">'+phdThesis[i+y].nombre+'</a></li>');


   }
 }

}
function renderColaboradores () {

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
   rowDynamic = rowDynamic + rowDynamicCountColaboradores;
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
       '\r      <a href="'+colaboradores[i+y].enlace_a_web+'" member-title="colaboradores" member-index="'+[i+y]+'">'+
       '\r        <div id="" class="col-md-4">'+
       '\r          <img class="img-members center-block" src="'+foto+'" alt="">'+
       '\r          <div class="text-center proyecto-descripcion">'+
       '\r            <h3>'+colaboradores[i+y].nombre+'</br>'+
       '\r            </h3>'+
       '\r            <p class="español">'+colaboradores[i+y].titulo_es+'</p>'+
       '\r            <p class="ingles noVisible">'+colaboradores[i+y].titulo_en+'</p>'+
       '\r          </div>'+
       '\r        </div>'+
       '\r      </a>'
     );
     $('.navbar-nav.ingles .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>');
     $('.navbar-nav.español .dropdown-menu').append('<li><a class="members" titulo="Colaboradores" href="http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/in%20Develpment/dynamic-miembros.html#miembroc'+[i+y+1]+'">'+colaboradores[i+y].nombre+'</a></li>');

   }
 }

}
function renderFichaProyecto () {

   console.log('ficha_proyecto :'+ficha_proyecto);
   var len = ficha_proyecto.length;
   var rowDynamicCountficha_proyecto = 0;
   var yControl = 0;
   var iterations = 0;

   // render section ficha_proyecto
  yControl++;
  var rowDynamic = 'row';
  rowDynamicCountficha_proyecto++;
  rowDynamic = rowDynamic + rowDynamicCountficha_proyecto;

  $('.sub-header .row').append('<h1 class="col-md-12 español">'+ficha_proyecto[proyecto_index].title_es+'</h1>');
  $('.sub-header .row').append('<h1 class="col-md-12 ingles noVisible">'+ficha_proyecto[proyecto_index].title_en+'</h1>');
  $('#ficha-proyecto').append('<div class="row '+rowDynamic+' row-directora">');
  $('#ficha-proyecto .'+rowDynamic).prepend('<div class="" id="'+proyecto_title+proyecto_index+'"></div>');

  // Fill out ficha_proyecto HTML
  var y = 0;
  var foto1;
  var foto2;
  var foto3;
  var foto4;
  if (!ficha_proyecto[proyecto_index].foto1) {
  foto1 = "'https://picsum.photos/4"+proyecto_index+proyecto_index+1+"/3"+proyecto_index+proyecto_index+2+"'";
  } else {
  foto1 = ficha_proyecto[proyecto_index].foto1;
  }
  if (!ficha_proyecto[proyecto_index].foto2) {
  foto2 = "'https://picsum.photos/5"+proyecto_index+2+"/600'";
  } else {
  foto2 = ficha_proyecto[proyecto_index].foto2;
  }
  if (!ficha_proyecto[proyecto_index].foto3) {
  foto3 = "'https://picsum.photos/4"+proyecto_index+3+"/580'";
  } else {
  foto3 = ficha_proyecto[proyecto_index].foto3;
  }
  if (!ficha_proyecto[proyecto_index].foto4) {
  foto4 = "'https://picsum.photos/5"+proyecto_index+4+"/600'";
  } else {
  foto4 = ficha_proyecto[proyecto_index].foto4;
  }


  $('#ficha-proyecto .'+rowDynamic).append(
    '\r   <div id="'+proyecto_title+proyecto_index+'" class="col-md-5">'+
    '\r     <h2 class="featurette-heading">'+
    '\r       <span class="text-muted español">'+ficha_proyecto[proyecto_index].intro_es+'</span>'+
    '\r       <span class="text-muted ingles noVisible">'+ficha_proyecto[proyecto_index].intro_en+'</span>'+
    '\r     </h2>'+
    '\r     <p class="español">'+ficha_proyecto[proyecto_index].description_es+'</p>'+
    '\r     <p class="ingles noVisible">'+ficha_proyecto[proyecto_index].description_en+'</p>'+
    '\r   </div>'+
    '\r   <div class="col-md-7">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src='+foto1+' alt="Generic placeholder image">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src='+foto2+' alt="Generic placeholder image">'+
    '\r   </div>'
  );
  $('#ficha-proyecto').append('<div class="row row2 row-directora">');
  $('#ficha-proyecto .row2').append(
    '\r   <div id="vacio" class="col-md-1"></div>'+
    '\r   <div id="'+proyecto_title+proyecto_index+'-detalle" class="col-md-10">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src='+foto3+' alt="Generic placeholder image">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src='+foto4+' alt="Generic placeholder image">'+
    '\r   </div>'+
    '\r   <div id="vacio" class="col-md-1"></div>'
  );
}


/* LOCAL STORAGE */
// Function from MDN : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// Function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
   var storage = window[type],
       x = '__storage_test__';
   try {
       storage.setItem(x, x);
       storage.removeItem(x);
       return true;
   }
   catch(e) {
       return e instanceof DOMException && (
           // everything except Firefox
           e.code === 22 ||
           // Firefox
           e.code === 1014 ||
           // test name field too, because code might not be present
           // everything except Firefox
           e.name === 'QuotaExceededError' ||
           // Firefox
           e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
           // acknowledge QuotaExceededError only if there's something already stored
           storage.length !== 0;
   }
}
/* CHECK FOR sessionStorage */
if (storageAvailable('localStorage')) {
 // Yippee! We can use localStorage awesomeness
 console.log('Yippee! We can use localStorage awesomeness');
}
else {
 // Too bad, no localStorage for us
 console.log('Too bad, no localStorage for us');
}
/* CHECK FOR sessionStorage */
if (storageAvailable('sessionStorage')) {
 // Yippee! We can use localStorage awesomeness
 console.log('Yippee! We can use sessionStorage awesomeness');
 // Testing whether your storage has been populated
 if(sessionStorage.getItem('directora')) {
   console.log('there are data on sessionStorage');
   window.addEventListener('DOMContentLoaded', onSessionStorageLoad);

 } else {
   console.log('there are NO data on sessionStorage');
   window.addEventListener('DOMContentLoaded', initMiembros);
 }
}
else {
 // Too bad, no localStorage for us
 console.log('Too bad, no sessionStorage for us');
 window.addEventListener('DOMContentLoaded', initMiembros);
}



// Read URL parameters Function
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

proyecto_title = getQueryVariable('proyecto_title');
proyecto_index = getQueryVariable('proyecto_index');
;console.log("Hi, from main.js");

$(function () {
  // CHANGE LANGUAGE
  // LANGUAGE-CHANGE.ON CLICK - Event handler: toggle content among Spanish and English
	$('.idioma-cambia').on('click', function(){
		$('.español').toggleClass('noVisible');
		$('.ingles').toggleClass('noVisible');
		console.log($('.idioma-cambia').attr('idioma'));
		// ALLOW ALL CONTENT IN ENGLISH WHEN THIS LANGUAGE IS SELECTED AT NAVIGATING WHITIN THE WENSITE
    // on language change add a parameter, ?idioma=en, to the navbar>a.href attribute so on click in new LP we read this attribute and if is there we toggle default-original-content-which-is-in-Spanish to English.
		if ($('.idioma-cambia').attr('idioma') === 'es') {
			$('.idioma-cambia').attr('idioma', 'en');
			// console.log($('.seccion'));
			$('.seccion').each(function(index){
				var hrefOriginal = $(this).attr('href');
				$(this).attr('href', hrefOriginal+'?idioma=en')
				// console.log(this);
			});
			$('.members').each(function(index){
				var hrefOriginal = $(this).attr('href');
				$(this).attr('href', hrefOriginal+'?idioma=en')
				// console.log(this);
			});
		} else { // if language change back to Spanish again -> then remove the navbar>a.href parameter
			$('.idioma-cambia').attr('idioma', 'es');
			$('.seccion').each(function(i){
				var hrefOriginal = $(this).attr('href');
				// console.log(hrefOriginal);
				// console.log(hrefOriginal.indexOf('?idioma=en'));
				$(this).attr('href', hrefOriginal.slice(0,hrefOriginal.indexOf('?idioma=en')))
			});
			$('.members').each(function(i){
				var hrefOriginal = $(this).attr('href');
				$(this).attr('href', hrefOriginal.slice(0,hrefOriginal.indexOf('?idioma=en')))
			});
		}
		console.log('Cambiado idioma a: '+$('.idioma-cambia').attr('idioma'));
		// console.log("hurrah and yihaaah - idioma cambiado");
	});

	// LANGUAGE: RENDER CONTENT IN SELECTED LANGUAGE
  // READ navbar>a.href attribute and if is in the URL toggle content into English.
	if(window.location.href.indexOf('idioma=en') >= 0){
		// console.log('true');
		$('.español').toggleClass('noVisible');
		$('.ingles').toggleClass('noVisible');
		$('.idioma-cambia').attr('idioma', 'en');
		$('.seccion').each(function(index){
			var hrefOriginal = $(this).attr('href');
			$(this).attr('href', hrefOriginal+'?idioma=en')
			// console.log(this);
		});
		$('.members').each(function(index){
			var hrefOriginal = $(this).attr('href');
			$(this).attr('href', hrefOriginal+'?idioma=en')
			// console.log(this);
		});
  }


	// DROPDOWN HOVER
	$( ".dropdown" )
		.mouseenter(function() {
			$('.dropdown').toggleClass('open');
			// onClick go to 'members'
			$('.dropdown-toggle').click(function( e ){
				e.preventDefault();
				if ($('.idioma-cambia').attr('idioma') === 'en') {
					window.location = "http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/miembros.html?idioma=en";
				} else {
					window.location = "http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/miembros.html";
				}
			});
  	})
		.mouseleave(function() {
			$('.dropdown').toggleClass('open');
  	});
	// END // DROPDOWN HOVER


	/* CUSTOMIZA GOOGLE Formn */
	// $('iframe .freebirdFormviewerViewFormContent').css('color','red');
	// console.log($('iframe'));

}); //END FUNCTION document.onload
