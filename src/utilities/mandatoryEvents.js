import moment from 'moment';
import holidayStatus from './holidayStatus';
import eventType from './eventTypes';

const currYear = new Date().getFullYear();

// Add mandatory events here. The only fields that need change are title and the dates.
const mandatoryEvents = [
  {
    title: 'Christmas Day',
    mandatoryDate: `${currYear}-12-25`,
  },
  {
    title: 'New Years Day',
    mandatoryDate: `${currYear}-12-31`,
  },
  {
    title: 'Memorial Day',
    mandatoryDate: `${currYear}-05-28`,
  },
  {
    title: 'Christmas Day',
    mandatoryDate: `${currYear + 1}-12-25`,
  },
  {
    title: 'New Years Day',
    mandatoryDate: `${currYear + 1}-12-31`,
  },
  {
    title: 'Memorial Day',
    mandatoryDate: `${currYear + 1}-05-28`,
  },
];

export default mandatoryEvents.map(event => {
  return {
    // Format the events
    title: event.title,
    start: new moment([event.mandatoryDate], 'YYYY-MM-DD'),
    end: new moment([event.mandatoryDate], 'YYYY-MM-DD'),

    //Add the event boilerplate
    eventId: -1,
    allDay: true,
    halfDay: false,
    employee: null,
    eventStatus: {
      eventStatusId: holidayStatus.APPROVED,
      description: 'Approved',
    },
    eventType: {
      eventTypeId: eventType.PUBLIC_HOLIDAY,
      description: 'Public Holiday',
    },
  };
});
