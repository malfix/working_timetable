function TimeTable(){
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

TimeTable.prototype.isClockingValid = function (){
  valid = true;
  valid &= this.count_ingressi == this.count_uscite;
  valid &= this.count_ingressi > 0;
  last_exit = 0;
  for (var i = 0; i < this.count_ingressi; i++) {
  	valid &= this.ingressi[i] < this.uscite[i];
  	valid &= last_exit < this.ingressi[i];
  	last_exit = this.uscite[i];
  }
  return  valid == 1;
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

module.exports = TimeTable;