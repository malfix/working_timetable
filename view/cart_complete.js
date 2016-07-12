
days=$('.rowSep').next();
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
    
    if (dayTimeTable.validateClocking().length == 0)
        $(this).append( dayTimeTable.getMinutesWorked() );
    else 
    	$(this).append( dayTimeTable.validateClocking() );
});
