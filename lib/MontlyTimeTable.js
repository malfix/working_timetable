function MontlyTimeTable(){
  this.list = [];
  this.total = 0;
};

MontlyTimeTable.prototype.totalMinutesWorked = function (){
	totalMinutes = 0;
	for (var i = 0; i < this.total; i++){
		totalMinutes += (this.list[i].validateClocking().length == 0) ? this.list[i].getMinutesWorked() : 0;
	}
	return totalMinutes;
}

MontlyTimeTable.prototype.add = function (timetable){
	this.list[this.total++] = timetable;
}

module.exports = MontlyTimeTable;