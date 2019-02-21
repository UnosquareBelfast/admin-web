import moment from 'moment';
import { getDurationBetweenDates } from './dates';
import eventTypes from '../constants/roles';
import mandatoryEvents from './mandatoryEvents';
import { flow } from 'lodash/fp';
import store from '../store';
import { getAllEvents, getUserId } from '../reducers';
import holidayStatus from '../constants/holidayStatus';

export const transformEvents = allEvents => {
  return new Promise(resolve => {
    const transformedEvents = flow(
      _formatEventsForCalendar,
      _appendExistingEvents
    )(allEvents);
    resolve(transformedEvents);
  });
};

const _formatEventsForCalendar = events => {
  let formattedEvents = [];

  events.forEach(event => {
    const { eventId, employee, eventStatus, eventType } = event;
    const title = `${employee.forename} ${employee.surname}`;
    const fullEventStart = event.eventDates[0].startDate;
    const fullEventEnd = event.eventDates[event.eventDates.length - 1].endDate;
    const eventSegments = event.eventDates.map(segment => {
      return {
        eventId,
        title,
        employee,
        eventStatus,
        eventType,
        start: moment(segment.startDate),
        end: moment(segment.endDate),
        isHalfDay: segment.isHalfDay,
        fullEvent: {
          start: moment(fullEventStart),
          end: moment(fullEventEnd),
        },
      };
    });
    formattedEvents = [...formattedEvents, ...eventSegments];
  });
  return formattedEvents;
};

const _appendExistingEvents = events => {
  const prevEvents = getAllEvents(store.getState());
  let combinedEvents = [...prevEvents, ...events];
  // Remove mandatory
  combinedEvents = combinedEvents.filter(event => event.eventId !== -1);
  return combinedEvents;
};

const _appendMandatoryEvents = events => {
  return events.concat(mandatoryEvents);
};

export const requiresNewRequest = date => {
  let requireNewRequest = true;
  const month = new moment(date, 'YYYY-MM-DD').month();
  let events = getAllEvents(store.getState());

  // Remove mandatory
  events = events.filter(event => event.eventId !== -1);

  let eventDates = events.reduce((acc, event) => {
    acc.push(event.start);
    return acc;
  }, []);

  eventDates.forEach(date => {
    if (date.month() === month) {
      requireNewRequest = false;
    }
  });
  return requireNewRequest;
};

/*
 Utility
*/

export const getEventDuration = event => {
  const { start, end, isHalfday, eventType } = event;
  let duration = getDurationBetweenDates(start, end);
  const eventTypeId = eventType ? parseInt(eventType.eventTypeId) : 1;
  if (isHalfday) {
    if (duration != 0) {
      return 0.5;
    }
  } else if (eventTypeId !== 1) {
    return 0;
  } else {
    return duration;
  }
};

/*
  Booking Form Validation
*/

export const startDateValidation = formData => {
  if (formData.isHalfday) {
    formData.end = formData.start;
  } else {
    if (formData.start.isAfter(formData.end)) {
      formData.end = formData.start;
    }
  }
  return formData;
};

export const endDateValidation = formData => {
  if (formData.isHalfday) {
    formData.start = formData.end;
  } else {
    if (formData.end.isBefore(formData.start)) {
      formData.start = formData.end;
    }
  }
  return formData;
};

export const halfDayValidation = formData => {
  formData.end = formData.start;
  formData.eventTypeId = eventTypes.ANNUAL_LEAVE;
  return formData;
};

export const checkIfPastDatesSelected = start => {
  const today = new moment();
  return moment(start).isBefore(today, 'day');
};

export const checkSameDate = start => {
  const today = new moment();
  return moment(start).isSame(today, 'day');
};

export const checkIfDatesFallOnWeekend = (start, end) => {
  if (moment(start).isoWeekday() > 5 && moment(end).isoWeekday() > 5) {
    return true;
  } else {
    return false;
  }
};

export const checkIfSelectedDatesOverlapExisting = (
  events,
  employeeId,
  start,
  end,
  selectedEventId = null
) => {
  const overlappingEvents = events.filter(event => {
    const { employee, eventId } = event;
    if (
      employee &&
      employee.employeeId === employeeId &&
      selectedEventId !== eventId
    ) {
      const selectedDateRange = moment.range(
        moment(start),
        moment(end).endOf('day')
      );
      const existingEvent = moment.range(
        moment(event.start),
        moment(event.end)
      );
      if (selectedDateRange.overlaps(existingEvent)) {
        return true;
      }
    }
  });
  return overlappingEvents.length > 0;
};

export const checkOverlappingEvents = (start, end, eventId) => {
  const events = getAllEvents(store.getState());
  const employeeId = getUserId(store.getState());
  const thisEvent = eventId;

  const overlappingEvents = events.filter(event => {
    let isCurrentEvent = false;

    if (typeof thisEvent != 'undefined') {
      isCurrentEvent = thisEvent === event.eventId;
    }

    if (event.eventStatus.eventStatusId === holidayStatus.CANCELLED) {
      return false;
    }

    if (isCurrentEvent) {
      return false;
    }

    if (event.employee.employeeId !== employeeId) {
      return false;
    }
    const selectedDateRange = moment.range(
      moment(start),
      moment(end).endOf('day')
    );
    const existingEvent = moment.range(moment(event.start), moment(event.end));

    if (selectedDateRange.overlaps(existingEvent)) {
      return true;
    }
  });

  return overlappingEvents.length > 0;
};
