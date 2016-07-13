function TimeTable(date){
  this.date = date;
  this.ingressi = [];
  this.count_ingressi = 0;
  this.uscite = [];
  this.count_uscite = 0;
};

TimeTable.prototype.addEnter = function (value) {
  this.ingressi[this.count_ingressi++] = this.textToMinutes(value);
};

TimeTable.prototype.addExit = function (value) {
  this.uscite[this.count_uscite++] = this.textToMinutes(value);
};

TimeTable.prototype.validateClocking = function (){
  valid = [];
  i = 0;
  if (this.count_ingressi != this.count_uscite)
    valid[i++] = "different size";
  if (this.count_ingressi == 0)
    valid[i++] = "must contain at least one element";
  
  last_exit = 0;
  for (var i_clocking = 0; i_clocking < this.count_ingressi; i_clocking++) {
    if (this.ingressi[i_clocking] >= this.uscite[i_clocking])
  	  valid[i++] = "clocking In must be before clocking out";
    if (last_exit >= this.ingressi[i_clocking])
      valid[i++] = "clocking In must be after previous clocking out";
  	last_exit = this.uscite[i_clocking];
  }
  // if (valid.length == 0 && this.getMinutesWorked() < 420) valid[i++] = "you must work at least 7 hours";
  return valid;
};

TimeTable.prototype.getMinutesWorked = function (){
  minutes = 0;
  for (var i = 0; i < this.count_ingressi; i++) {
  	minutes += this.uscite[i] - this.ingressi[i];
  }
  return minutes;
};

// utils
TimeTable.prototype.textToMinutes = function (value) {
  splitted = value.split(':');
  return parseInt(splitted[0]) * 60 + parseInt(splitted[1]);
};

TimeTable.prototype.minutesToText = function (value) {
  minutes = value % 60;
  hours = parseInt(parseInt(value) / 60);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ":" + minutes;   
};

TimeTable.prototype.toCvs = function () {
  return  this.date + ";" + this.getMinutesWorked();   
};


module.exports = TimeTable;