
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
  $('#ficha-proyecto').append('<div class="row '+rowDynamic+' featurette row-directora">');

  // Fill out ficha_proyecto HTML
  var y = 0;
  var foto;

  console.log(y);
  $('#ficha-proyecto .'+rowDynamic).prepend('<div class="" id="'+proyecto_title+proyecto_index+'"></div>');
  if (ficha_proyecto[proyecto_index].foto === "") {
  foto = "https://picsum.photos/4"+proyecto_index+proyecto_index+1+"/3"+proyecto_index+proyecto_index+2;
  } else {
  foto = "info-miembros/"+ficha_proyecto[proyecto_index].foto;
  }

  // TODO foto2 y foto3 osn temporales -> borrar tras implementar carga de varias fotos
  var foto2 = "https://picsum.photos/4"+proyecto_index+2+"/590";
  var foto3 = "https://picsum.photos/4"+proyecto_index+3+"/580";
  var foto4 = "https://picsum.photos/5"+proyecto_index+4+"/600";


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
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src="'+foto+'" alt="Generic placeholder image">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src="'+foto2+'" alt="Generic placeholder image">'+
    '\r   </div>'
  );
  $('#ficha-proyecto').append('<div class="row row2 featurette row-directora">');
  $('#ficha-proyecto .row2').append(
    '\r   <div id="vacio" class="col-md-1"></div>'+
    '\r   <div id="'+proyecto_title+proyecto_index+'-detalle" class="col-md-10">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src="'+foto3+'" alt="Generic placeholder image">'+
    '\r     <img class="featurette-image img-responsive img-ficha-proyecto center-block" src="'+foto4+'" alt="Generic placeholder image">'+
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
