console.log("hola, desde dynamic-home.js");

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1gEUBe5hfbiyNBsG2MXaR4fvnFPpUEzP8bIAYPMB-3uI/edit?usp=sharing';
var tabletop;
var home;

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
	renderhome();
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


window.addEventListener('DOMContentLoaded', init);
