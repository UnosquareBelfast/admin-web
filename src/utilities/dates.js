import moment from 'moment';

export const isSameDay = (predicateDate, subjectDate) =>
  moment(predicateDate).isSame(moment(subjectDate), 'day');

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const getEventDayAmount = event => {
  if (!event) return;
  if (event.isHalfDay) return 0.5;
  const startDate = moment(event.eventDates[0].startDate).startOf('day');
  const endDate = moment(
    event.eventDates[event.eventDates.length - 1].endDate
  ).endOf('day');

  let numWorkDays = 0;
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    // Skips Sunday and Saturday
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      numWorkDays++;
    }
    currentDate = currentDate.addDays(1);
  }
  return numWorkDays;
};

export const getTotalDaysInEventArray = events => {
  if (!events) return;
  let totalDays = 0;
  events.forEach(event => {
    totalDays += getEventDayAmount(event);
  });
  return totalDays;
};

export const getTotalDaysInEventArrayWithStatus = (events, status) => {
  if (!events) return;
  let totalDays = 0;
  events.filter(event => event.eventType.eventTypeId === 1).forEach(event => {
    const startDate = moment(event.eventDates[0].startDate);
    const endDate = moment(
      event.eventDates[event.eventDates.length - 1].endDate
    );
    totalDays +=
      event.eventStatus.eventStatusId === status
        ? getDurationBetweenDates(startDate, endDate)
        : 0;
  });
  return totalDays;
};

export const getDuration = (startDate, endDate) => {
  return Math.floor(moment.duration(endDate.diff(startDate)).asDays() + 1);
};

export const getDurationBetweenDates = (startDate, endDate) => {
  let days = getDuration(startDate, endDate);
  let businessDays = 0;
  let date = new moment(startDate);
  while (days > 0) {
    if (date.isoWeekday() < 6) {
      businessDays += 1;
    }
    days -= 1;
    date = date.add(1, 'days');
  }
  return businessDays;
};

export const calculateDaysNotice = daysRequested => {
  if (daysRequested <= 4) {
    return 10;
  } else if (daysRequested > 4 && daysRequested < 10) {
    return 20;
  } else if (daysRequested > 10) {
    return 40;
  } else {
    return 0;
  }
};