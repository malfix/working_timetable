describe("MoltlyTimeTable", function(){
  var montlytimetable;
  var MontlyTimeTable = require('../../lib/MontlyTimeTable');
  var TimeTable = require('../../lib/TimeTable');

  beforeEach(function() {
    montlytimetable = new MontlyTimeTable();
  });

  it("with no days", function () {
  	expect(montlytimetable.totalMinutesWorked()).toEqual(0);

  });

  it("with an invalid day", function () {
  	timetable = new TimeTable();
  	timetable.addEnter('08:00');
  	montlytimetable.add(timetable)

  	expect(montlytimetable.totalMinutesWorked()).toEqual(0);
  });
  describe("with one valid day ", function(){
  	beforeEach(function() {
  	  timetable = new TimeTable();
  	  timetable.addEnter('08:00');
	  timetable.addExit('12:00');
	  montlytimetable.add(timetable)
    });
    it("with one day", function () {
  	  expect(montlytimetable.totalMinutesWorked()).toEqual(240);
	});
    it("with two day", function () {
  	  montlytimetable.add(timetable)
  	  expect(montlytimetable.totalMinutesWorked()).toEqual(480);
    });
  });

}); 
