
days=$('.rowSep').next();
montlyTimeTable = new MontlyTimeTable(); 
days.each(function( ) {
	dataFormatoTesto = $(this).prev().text().split(" ");
	dataFormatoTestoGiorno = dataFormatoTesto[2].split("/");
    dayTimeTable = new TimeTable(dataFormatoTestoGiorno[0], dataFormatoTestoGiorno[1], dataFormatoTestoGiorno[2]);

    dayIn = $(this).find( ".entrata" );
    dayIn.each(function( ) {

		var entrata=$(this).text();
		if (entrata != "") {
			dayTimeTable.addEnter(entrata.substr(1,10));
		} 
		var uscita=$(this).next().text();
		if (uscita != "") {
			dayTimeTable.addExit(uscita.substr(1,10));
		} 
    })
    montlyTimeTable.add(dayTimeTable);
});
$('body').append("<table id='fixedContainer'><tr><th>Giorno</th><th>&Delta; giorno</th><th>&Delta; settimana</th><th>Note</th></tr></table>");

$('#fixedContainer').append(montlyTimeTable.toHtml());
