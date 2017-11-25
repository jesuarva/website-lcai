console.log("hola, aquí estamos");

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
				console.log(this);
			});
			$('.members').each(function(index){
				var hrefOriginal = $(this).attr('href');
				$(this).attr('href', hrefOriginal+'?idioma=en')
				console.log(this);
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
	$( ".dropdown" )
		.mouseenter(function() {
			$('.dropdown').toggleClass('open');
			// onClick go to 'members'
			$('.dropdown-toggle').click(function( e ){
				e.preventDefault();
				if ($('.idioma-cambia').attr('idioma') === 'en') {
					window.location = "http://languagecreativityandidentity.digital-speck.com/miembros.html?idioma=en";
				} else {
					window.location = "http://languagecreativityandidentity.digital-speck.com/miembros.html";
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
