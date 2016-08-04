describe("MoltlyTimeTable", function(){
  var montlytimetable;
  var MontlyTimeTable = require('../../lib/MontlyTimeTable');
  var TimeTable = require('../../lib/TimeTable');

  beforeEach(function() {
    montlytimetable = new MontlyTimeTable();
  });

  it("with no days", function () {
  	expect(0).toEqual(montlytimetable.totalMinutesWorked());

  });

  it("with an invalid day", function () {
  	timetable = new TimeTable();
  	timetable.addEnter('08:00');
  	montlytimetable.add(timetable)

  	expect(0).toEqual(montlytimetable.totalMinutesWorked());
  });
  describe("with one valid day ", function(){
  	beforeEach(function() {
  	  timetable = new TimeTable();
  	  timetable.addEnter('08:00');
	    timetable.addExit('12:00');
	    montlytimetable.add(timetable)
    });
    it("with one day", function () {
  	  expect(240).toEqual(montlytimetable.totalMinutesWorked());
	  });
    it("with two day", function () {
  	  montlytimetable.add(timetable)
  	  expect(480).toEqual(montlytimetable.totalMinutesWorked());
    });
    it("toCsv works", function () {
      expect('??;240\n').toEqual(montlytimetable.toCsv());
    });
    it("toHtml works", function () {
      expect('??;240<br/>').toEqual(montlytimetable.toHtml());
    });
  });

}); 
