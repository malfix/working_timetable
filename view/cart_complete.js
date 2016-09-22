$('body').append("<table id='fixedContainer'></table>");
$('body').append("<div id='navbar'><span id='show'>Apri e ricarica le presenze </span><span id='hide'>Chiudi pannello presenze</span></div>");;
	


$('#show').click(function() {
	console.log('show');
	invert();
	reload(); 
	}
);
$('#hide').click(function() {
	console.log('hide');
	invert();
	}
);

$(function() {
	$('#fixedContainer').hide()
	$('#hide').hide();
	$('#show').show();

});

function invert(){
	$('#fixedContainer').toggle();
	$('#hide').toggle();
	$('#show').toggle();
}

function reload() {
	$('#fixedContainer').text("")	;
	$('#fixedContainer').append("<tr><th>Giorno</th><th>&Delta; giorno</th><th>&Delta; settimana</th><th>Note</th></tr>")	;
	montlyTimeTable = new MontlyTimeTable(); 
	var year =  $('[id$="_TxtAnno"]').find('option:selected').val();
	var month =  $('[id$="_TxtMese"]').find('option:selected').val();

	for (var i = 0; i < 31; i++){
		dayTimeTable = new TimeTable(i+1, month, year);
	    dayIn =  $('[id$="_Grid1_' + i + '_3_viewDiv"]').find( "a" ).find("span[title='Entrata']");
		dayIn.each(function( ) {
			var entrata=$(this).text();
			if (entrata != "") {
				dayTimeTable.addEnter(entrata);
			} 
			var uscita=$(this).parent().next().text();
			if (uscita != "") {
				dayTimeTable.addExit(uscita);
			} 
	    })
	    montlyTimeTable.add(dayTimeTable);
	}
	$('#fixedContainer').append(montlyTimeTable.toHtml());
}
