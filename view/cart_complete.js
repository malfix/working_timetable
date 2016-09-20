$('body').append("<table id='fixedContainer'></table>");
$('#fixedContainer').click(function() {
	reload(); 
	}
);

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
