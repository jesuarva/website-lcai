console.log("hola, aquí estamos");
// let cambiaIdioma = $('#idioma-cambia')
// $(document).ready(function(){
// 	$('#idioma-cambia').click( function (){
// 	    $('#español').toggleClass('noVisible');
//     	console.log("funciona");
// 	}());
// });
// function cambiaIdioma () {
// 	$('#idioma-cambia').on('click', function(){
// 		$('.español').toggleClass('noVisible');
// 		console.log("hurra and yihaaa");
// 	});
// }
$(function () {
  // CHANGE LANGUAGE
  // LANGUAGE-CHANGE.ON CLICK - Event handler: toggle content among Spanish and English
	$('#idioma-cambia').on('click', function(){
		$('.español').toggleClass('noVisible');
		$('.ingles').toggleClass('noVisible');
		console.log($('#idioma-cambia').attr('idioma'));
		// ALLOW ALL CONTENT IN ENGLISH WHEN THIS LANGUAGE IS SELECTED AT NAVIGATING WHITIN THE WENSITE
    // on language change add a parameter, ?idioma=en, to the navbar>a.href attribute so on click in new LP we read this attribute and if is there we toggle default-original-content-which-is-in-Spanish to English.
		if ($('#idioma-cambia').attr('idioma') === 'es') {
			$('#idioma-cambia').attr('idioma', 'en');
			// console.log($('.seccion'));
			$('.seccion').each(function(index){
				var hrefOriginal = $(this).attr('href');
				$(this).attr('href', hrefOriginal+'?idioma=en')
				console.log(this);
			});
			$('.members').each(function(index){
				var hrefOriginal = $(this).attr('href');
				$(this).attr('href', hrefOriginal+'?idioma=en')
				console.log(this);
			});
		} else { // if language change back to Spanish again -> then remove the navbar>a.href parameter
			$('#idioma-cambia').attr('idioma', 'es');
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
		console.log('Cambiado idioma a: '+$('#idioma-cambia').attr('idioma'));
		console.log("hurrah and yihaaah - idioma cambiado");
	});
	// LANGUAGE: RENDER CONTENT IN SELECTED LANGUAGE
  // READ navbar>a.href attribute and if is in the URL toggle content into English.
	if(window.location.href.indexOf('idioma=en') >= 0){
		console.log('true');
		$('.español').toggleClass('noVisible');
		$('.ingles').toggleClass('noVisible');
		$('#idioma-cambia').attr('idioma', 'en');
		$('.seccion').each(function(index){
			var hrefOriginal = $(this).attr('href');
			$(this).attr('href', hrefOriginal+'?idioma=en')
			console.log(this);
		});
		$('.members').each(function(index){
			var hrefOriginal = $(this).attr('href');
			$(this).attr('href', hrefOriginal+'?idioma=en')
			console.log(this);
		});
  };


	// DROPDOWN HOVER
	$( "#header-dropdown" )
		.mouseenter(function() {
			// console.log('hover in : '+this.target.nodeName);
			// e.preventDefault();
			// $('.dropdown-toggle').trigger('click');
			$('#header-dropdown').toggleClass('open');
			// onClick go to 'members'
			$('.dropdown-toggle').click(function( e ){
				e.preventDefault();
				// window.location = "http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/miembros.html";
				if ($('#idioma-cambia').attr('idioma') === 'en') {
					window.location = "http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/miembros.html?idioma=en";
				} else {
					window.location = "http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/miembros.html";
				}
			});
  	})
		.mouseleave(function() {
	    // console.log('hover out');
			// $('.dropdown-toggle').trigger('click');
			$('#header-dropdown').toggleClass('open');
  	});
	// END // DROPDOWN HOVER

	// // MEMBERS ON HOVER AD POSITION
	// $('#header-dropdown a.members')
	// .mouseenter(function(){
	// 	console.log('Members ad title '+$(this).html());
	// 	$(this).append("<span class='memberTitle'> : "+$(this).attr('titulo')+"</span>");
	// })
	// .mouseleave(function(){
	// 	console.log('Members remove title'+$(this).html());
	// 	$(this).find('span:last').remove();
	// });

}); //END FUNCTION document.onload

// $(document).ready(function(){
//   $('.dropdown-submenu a.test').on("click", function(e){
//     $(this).next('ul').toggle();
//     e.stopPropagation();
//     e.preventDefault();
//   });
// });
