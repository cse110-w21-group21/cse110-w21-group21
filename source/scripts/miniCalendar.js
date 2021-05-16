/*eslint-disable*/
let myEvents = [
  {
    start: "2021-04-15T06:00:00",
    end: "2021-04-15T20:30:00",
    name: "Event 1",
    url: "https://www.cssscript.com",
    desc: "Description 1",
    // more key value pairs here
  },
  {
    start: "2021-04-16T06:00:00",
    end: "2021-04-16T20:30:00",
    name: "Event 2",
    url: "https://www.cssscript.com",
  },
  {
    start: "2021-04-16T06:00:00",
    end: "2021-04-17T20:30:00",
    name: "Event 3",
    url: "https://www.cssscript.com",
  },
];
new Calendar({
  id: "#color-calendar",
  eventsData: myEvents,
  // small or large
  calendarSize: "small",

  // basic | glass
  theme: "glass",

  // custom colors
  primaryColor: "#1a237e",
  headerColor: "rgb(0, 102, 0)",
  headerBackgroundColor: "black",
  weekdaysColor: "based on theme",

  // short | long-lower | long-upper
  weekdayDisplayType: "short",

  // short | long
  monthDisplayType: "long",

  // 0 (Sun)
  startWeekday: 0,

  // font family
  fontFamilyHeader: "based on theme",
  fontFamilyWeekdays: "based on theme",
  fontFamilyBody: "based on theme",

  // shadow CSS
  dropShadow: "based on theme",

  // border CSS
  border: "based on theme",

  // border radius
  borderRadius: "0.5rem",

  // disable month year pickers
  disableMonthYearPickers: false,

  // disable click on dates
  disableDayClick: false,

  // disable the arrows to navigate between months
  disableMonthArrowClick: false,
});
