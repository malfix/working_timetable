function MontlyTimeTable(){
  this.list = []
  this.total = 0
}

MontlyTimeTable.prototype.totalMinutesWorked = function (){
	totalMinutes = 0
	for (var i = 0; i < this.total; i++){
		totalMinutes += (this.list[i].validateClocking().length == 0) ? this.list[i].getMinutesWorked() : 0
	}
	return totalMinutes
}

MontlyTimeTable.prototype.add = function (timetable){
	this.list[this.total++] = timetable
}

MontlyTimeTable.prototype.toCsv = function (timetable){
	var csv = ''
	for (var i = 0; i < this.total; i++){
		csv += this.list[i].toCsv() + '\n'
	}
	return csv
}

MontlyTimeTable.prototype.toHtml = function (timetable){
	var html = ''
	var deltaMinWeek = 0
	var today = new Date()
	today.setMilliseconds(0)
	today.setSeconds(0)
	today.setMinutes(0)
	today.setHours(0)
	for (var i = 0; i < this.total; i++){
		if (this.list[i].getDate().getDay() == 1) {
			deltaMinWeek = 0
		}
	    var deltaMinDay = (this.list[i].getMinutesWorked() == 0 ) ? 0 : this.list[i].getMinutesWorked() - 480
	    deltaMinWeek += deltaMinDay
	    var classToday = ""
	    if (this.list[i].getDate().getTime() == today.getTime()) {
	    	classToday = " class='highlight' "
	    }
	    if (this.list[i].getDate().getDay() == 6 || this.list[i].getDate().getDay() == 0) {
			deltaMinWeek = 0

			html += "<tr" + classToday + "><td>" + this.list[i].getDate().getDate() + "</td><td></td><td><td/><td></td><tr>"

		} else {
			html += "<tr" + classToday + "><td>" + this.list[i].getDate().getDate() + "</td>" + this.h_td_colorize(deltaMinDay)  + this.h_td_colorize(deltaMinWeek) + '<td>' + this.list[i].validateClocking() + "</td><tr>"
		}
	}
	return html
}


MontlyTimeTable.prototype.h_td_colorize = function (value){
	if (value > 0) return "<td class='ok'>"+value+"</td>"
	if (value < 0) return "<td class='ko'>"+Math.abs(value)+"</td>"
	return "<td class='zero'>"+value+"</td>"
}


module.exports = MontlyTimeTable
