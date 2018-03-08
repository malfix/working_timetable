$('body').append("<table id='fixedContainer'></table>")
$('body').append("<div id='navbar'><span id='show'><img id='icon1' class='icoopen' src=''/></span><span id='hide'><span id='show'><img id='icon2' class='icoclose' src=''/></span></div>")

$('#show').click(function() {
	console.log('show')
	invert()
	reload()
	}
)
$('#hide').click(function() {
	console.log('hide')
	invert()
	}
)

$(function() {
	$('#fixedContainer').hide()
	$('#hide').hide()
	$('#show').show()
	var imgURL = chrome.extension.getURL("img/list.png")
	document.getElementById("icon1").src = imgURL
	document.getElementById("icon2").src = imgURL
	})

function invert(){
	$('#fixedContainer').toggle()
	$('#hide').toggle()
	$('#show').toggle()
}

function reload() {
	$('#fixedContainer').text("")
	$('#fixedContainer').append("<tr><th>Giorno</th><th>&Delta giorno</th><th>&Delta settimana</th><th>Note</th></tr>")
	montlyTimeTable = new MontlyTimeTable()
	var year =  $('[id$="_TxtAnno"]').find('option:selected').val()
	var month =  $('[id$="_TxtMese"]').find('option:selected').val()

	for (var i = 0; i < 31; i++){
		dayTimeTable = new TimeTable(i+1, month, year)
	    dayIn =  $('[id$="_Grid1_' + i + '_3_viewDiv"]').find( "a" )
		dayIn.each(function( ) {
			var clocking=$(this).text()
			if (clocking != "") {
				dayTimeTable.addClocking(clocking)
			}
	    })
	    montlyTimeTable.add(dayTimeTable)
	}
	$('#fixedContainer').append(montlyTimeTable.toHtml())
}
