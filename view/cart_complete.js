
days=$('.rowSep').next();
montlyTimeTable = new MontlyTimeTable(); 
days.each(function( ) {
    dayTimeTable = new TimeTable();

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

$('#fixedContainer').append(montlyTimeTable.toCsv());
