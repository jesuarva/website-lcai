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
	$('#idioma-cambia').on('click', function(){
		$('.español').toggleClass('noVisible');
		$('.ingles').toggleClass('noVisible');
		console.log("hurra and yihaaa");
	});

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
			window.location = "http://localhost/~jesuarva/lcai%20-%20Cristina%20Palmese/miembros.html";
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

});

// $(document).ready(function(){
//   $('.dropdown-submenu a.test').on("click", function(e){
//     $(this).next('ul').toggle();
//     e.stopPropagation();
//     e.preventDefault();
//   });
// });
