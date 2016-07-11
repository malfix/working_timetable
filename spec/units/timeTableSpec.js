describe("TimeTable", function(){
  var timetable;
  var TimeTable = require('../../lib/TimeTable');

  beforeEach(function() {
    timetable = new TimeTable();
  });

  it("Conversion to Minutes works", function() {
    expect(timetable.textToMinutes('00:00')).toEqual(0);
    expect(timetable.textToMinutes('00:59')).toEqual(59);
    expect(timetable.textToMinutes('01:00')).toEqual(60);
    expect(timetable.textToMinutes('10:59')).toEqual(659);
    expect(timetable.textToMinutes('23:59')).toEqual(1439);
  });

  it("Conversion to Text works", function() {
    expect(timetable.minutesToText(0)).toEqual('00:00');
    expect(timetable.minutesToText(59)).toEqual('00:59');
    expect(timetable.minutesToText(60)).toEqual('01:00');
    expect(timetable.minutesToText(659)).toEqual('10:59');
    expect(timetable.minutesToText(1439)).toEqual('23:59');
  });


  it("Empty timetable is not valid if empty", function() {
    expect(timetable.validateClocking()).toEqual([ 'must contain at least one element' ]);
  });

  describe("when there is an enter", function() {
    beforeEach(function() {
      timetable.addEnter("08:00");
    });

    it("Is not valid if size is different", function() {
      expect(timetable.validateClocking()).toEqual([ 'different size' ]);
    });

    it("Is valid if size is equal", function() {
      timetable.addExit("12:00");
      expect(timetable.validateClocking()).toEqual([  ]);
    });

    it("Inverted clocking is invalid", function() {
      timetable.addExit("07:00");
      expect(timetable.validateClocking()).toEqual([ 'clocking In must be before clocking out' ]);
    });

  });

  it("Afternoon inverted clocking is invalid", function() {
    timetable.addEnter("08:00");
    timetable.addExit("09:00");
    timetable.addEnter("12:00");
    timetable.addExit("09:00");
    expect(timetable.validateClocking()).toEqual([ 'clocking In must be before clocking out' ]);
  });

  it("Overlapped time is invalid", function() {
    timetable.addEnter("08:00");
    timetable.addExit("09:00");
    timetable.addEnter("08:30");
    timetable.addExit("09:30");
    expect(timetable.validateClocking()).toEqual([ 'clocking In must be after previous clocking out' ]);
  });

  // it("Minimum working time", function() {
  //   timetable.addEnter("08:00");
  //   timetable.addExit("09:00");
  //   timetable.addEnter("10:30");
  //   timetable.addExit("11:30");
  //   expect(timetable.validateClocking()).toEqual([ 'you must work at least 7 hours' ]);
  // });


  it("Sum is correct", function() {
    timetable.addEnter("08:00");
    timetable.addExit("09:00");
    timetable.addEnter("10:30");
    timetable.addExit("11:30");
    expect(timetable.getMinutesWorked()).toEqual(120);
  });
}); 
