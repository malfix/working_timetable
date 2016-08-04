
days=$('.rowSep').next();
montlyTimeTable = new MontlyTimeTable(); 
days.each(function( ) {
	dataFormatoTesto = $(this).prev().text().split(" ");
	dataFormatoTestoGiorno = dataFormatoTesto[1].substr(0,3) + " " + dataFormatoTesto[2].split("/")[0];
    dayTimeTable = new TimeTable(dataFormatoTestoGiorno);

    dayIn = $(this).find( ".entrata.curPointer" );
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
$('body').append("<div id='fixedContainer'></div>");

$('#fixedContainer').append(montlyTimeTable.toHtml());
