describe("TimeTable", function(){
  var timetable;
  var TimeTable = require('../../lib/TimeTable');

  beforeEach(function() {
    timetable = new TimeTable(09, 08, 2016);
  });

  it("Conversion to Minutes works", function() {
    expect(0).toEqual(timetable.textToMinutes('00:00'));
    expect(59).toEqual(timetable.textToMinutes('00:59'));
    expect(60).toEqual(timetable.textToMinutes('01:00'));
    expect(659).toEqual(timetable.textToMinutes('10:59'));
    expect(1439).toEqual(timetable.textToMinutes('23:59'));
  });

  it("Conversion to Text works", function() {
    expect('00:00').toEqual(timetable.minutesToText(0));
    expect('00:59').toEqual(timetable.minutesToText(59));
    expect('01:00').toEqual(timetable.minutesToText(60));
    expect('10:59').toEqual(timetable.minutesToText(659));
    expect('23:59').toEqual(timetable.minutesToText(1439));
  });

   it("Conversion to Minutes works with dots", function() {
    expect(0).toEqual(timetable.textToMinutes('00.00'));
    expect(59).toEqual(timetable.textToMinutes('&nbsp;00.59&nbsp;'));
    expect(59).toEqual(timetable.textToMinutes('00.59'));
    expect(60).toEqual(timetable.textToMinutes('01.00'));
    expect(659).toEqual(timetable.textToMinutes('10.59'));
    expect(1439).toEqual(timetable.textToMinutes('23.59'));
  });

  it("Export cvs works for empty value", function() {
    expect('9;0;').toEqual(timetable.toCsv());
  });

  it("Export cvs works for valid value", function() {
    timetable.addEnter('00:01');
    timetable.addExit('08:01');
    expect('9;480;').toEqual(timetable.toCsv());
  });

  it("Empty timetable is not valid if empty", function() {
    expect([ ]).toEqual(timetable.validateClocking());
  });

  describe("when there is an enter", function() {
    beforeEach(function() {
      timetable.addEnter("08:00");
    });

    it("Is not valid if size is different", function() {
      expect([ 'different size' ]).toEqual(timetable.validateClocking());
    });

    it("Is valid if size is equal", function() {
      timetable.addExit("12:00");
      expect([  ]).toEqual(timetable.validateClocking());
    });

    it("Inverted clocking is invalid", function() {
      timetable.addExit("07:00");
      expect([ 'clocking In must be before clocking out' ]).toEqual(timetable.validateClocking());
    });

  });

  it("Afternoon inverted clocking is invalid", function() {
    timetable.addEnter("08:00");
    timetable.addExit("09:00");
    timetable.addEnter("12:00");
    timetable.addExit("09:00");
    expect([ 'clocking In must be before clocking out' ]).toEqual(timetable.validateClocking());
  });

  it("Overlapped time is invalid", function() {
    timetable.addEnter("08:00");
    timetable.addExit("09:00");
    timetable.addEnter("08:30");
    timetable.addExit("09:30");
    expect([ 'clocking In must be after previous clocking out' ]).toEqual(timetable.validateClocking());
  });

  // it("Minimum working time", function() {
  //   timetable.addEnter("08:00");
  //   timetable.addExit("09:00");
  //   timetable.addEnter("10:30");
  //   timetable.addExit("11:30");
  //   expect([ 'you must work at least 7 hours' ]).toEqual(timetable.validateClocking());
  // });


  it("Sum is correct", function() {
    timetable.addEnter("08:00");
    timetable.addExit("09:00");
    timetable.addEnter("10:30");
    timetable.addExit("11:30");
    expect(120).toEqual(timetable.getMinutesWorked());
  });
}); 
