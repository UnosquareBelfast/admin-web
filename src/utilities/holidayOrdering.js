import holidayStatus from '../constants/holidayStatus';

export const sortHolidayByStartDate = holidays => {
  return holidays.sort( (a, b) => {
    const dateOne = a.eventDates[0].startDate;
    const dateTwo = b.eventDates[0].startDate;
    return new Date(dateOne) - new Date(dateTwo);
  });
};

export const sortHolidayOrderByStatus = holidays => {

  // sort holidays by start date
  holidays = sortHolidayByStartDate(holidays);

  // split up pending holdays from all holidays 
  const pendingHolidays = [];
  const approvedHolidays = [];
  const rejectedHolidays = [];
  const cancelledHolidays = [];

  holidays.map((holiday) => {
    if ( holiday.eventStatus.eventStatusId === holidayStatus.PENDING ) {
      pendingHolidays.push(holiday);
    } else if ( holiday.eventStatus.eventStatusId === holidayStatus.REJECTED ) {
      rejectedHolidays.push(holiday);
    } else if ( holiday.eventStatus.eventStatusId === holidayStatus.CANCELLED ) {
      cancelledHolidays.push(holiday);
    } else {
      approvedHolidays.push(holiday);
    }
  });

  // return holidays in order of pending, approved, rejected, approved
  return  [...pendingHolidays, ...rejectedHolidays, ...approvedHolidays, ...cancelledHolidays];

};