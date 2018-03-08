function TimeTable(day, month, year){
  this.date = new Date(year, month - 1, day, 0, 0, 0, 0)
  this.ingressi = []
  this.count_ingressi = 0
  this.uscite = []
  this.count_uscite = 0
  this.clocking = []
  this.count_clocking = 0
}

TimeTable.prototype.addClocking = function (value) {
  this.clocking[this.count_clocking++] = this.textToMinutes(value)
}

TimeTable.prototype.validateClocking = function (){
  valid = []
  i = 0
  if (this.count_clocking % 2 != 0)
    valid[i++] = "different size"

  last_exit = 0
  for (var i_clocking = 0 i_clocking < this.count_clocking -1 i_clocking = i_clocking + 2) {
    if (this.clocking[i_clocking] >= this.clocking[i_clocking+1])
  	  valid[i++] = "clocking In must be before clocking out"
    if (last_exit >= this.clocking[i_clocking])
      valid[i++] = "clocking In must be after previous clocking out"
  	last_exit = this.clocking[i_clocking+1]
  }
  // if (valid.length == 0 && this.getMinutesWorked() < 420) valid[i++] = "you must work at least 7 hours"
  return valid
}

TimeTable.prototype.getMinutesWorked = function (){
  minutes = 0
  for (var i = 0 i < this.count_clocking-1 i=i+2) {
  	minutes += this.clocking[i+1] - this.clocking[i]
  }
  return minutes
}

// utils
TimeTable.prototype.textToMinutes = function (value) {
  splitted = value.replace(/&nbsp/g, "").split(/[:\.]/)
  return parseInt(splitted[0]) * 60 + parseInt(splitted[1])
}

TimeTable.prototype.minutesToText = function (value) {
  minutes = value % 60
  hours = parseInt(parseInt(value) / 60)
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  return hours + ":" + minutes
}

TimeTable.prototype.getDate = function () {
  return this.date
}

TimeTable.prototype.toCsv = function () {
  var validateClocking = this.validateClocking()
  return  this.getDate().getDate() + "" + this.getMinutesWorked() + "" + validateClocking
}

module.exports = TimeTable
