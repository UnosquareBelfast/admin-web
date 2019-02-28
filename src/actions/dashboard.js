import * as actionTypes from '../actionTypes';
import { getUsersEvents, getTeamsEvents } from '../services/dashboardService';
import eventsView from '../constants/eventsView';
import { setLoadingAsync } from './loading';

import {
  getEventDuration,
  requiresNewRequest,
  transformEvents,
} from '../utilities/dashboardEvents';

/*
  Action Creators
*/

export const selectBooking = booking => {
  return {
    type: actionTypes.SELECT_EVENT,
    payload: booking,
  };
};

export const updateEventDuration = event => {
  return {
    type: actionTypes.UPDATE_EVENT_DURATION,
    payload: getEventDuration(event),
  };
};

export const toggleBookingModal = open => {
  return {
    type: actionTypes.TOGGLE_BOOKING_MODAL,
    payload: open,
  };
};

export const setEventBeingUpdated = isBeingUpdated => {
  return {
    type: actionTypes.SET_IS_BEING_UPDATED,
    payload: isBeingUpdated,
  };
};

export const setCalendarEvents = events => {
  return {
    type: actionTypes.SET_CALENDAR_EVENTS,
    payload: events,
  };
};

export const setCalendarTeamEvents = events => {
  return {
    type: actionTypes.SET_CALENDAR_TEAM_EVENTS,
    payload: events,
  };
};

export const clearCalendarEvents = () => {
  return {
    type: actionTypes.CLEAR_CALENDAR_EVENTS,
    payload: [],
  };
};

export const setError = error => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
};

export const setEventView = eventView => {
  return {
    type: actionTypes.SET_EVENT_VIEW,
    payload: eventView,
  };
};

// Thunks

export const fetchEvents = (date, eventView, force = false) => dispatch => {
  // Check if we need to make a request (is there existing state?)
  if (requiresNewRequest(date) || force) {
    // Setup for loading indicator. Only show indicator if been loading for more
    // than a second.
    let shouldBeLoading = true;

    setTimeout(() => {
      if (shouldBeLoading) {
        dispatch(setLoadingAsync(true));
      }
    }, 500);

    // If force is true, we need a clean slate. Wipe all events.
    if (force) {
      dispatch(clearCalendarEvents());
    }

    // Set up a function that will run on success.
    const onSuccess = (data, isUserEvents) => {
      shouldBeLoading = false;
      dispatch(setLoadingAsync(false));
      transformEvents(data).then(transformedEvents => {
        if (isUserEvents) {
          dispatch(setCalendarEvents(transformedEvents));
        } else {
          dispatch(setCalendarTeamEvents(transformedEvents));
        }
      });
    };

    // Set up a function that will run on fail.

    const onError = error => {
      shouldBeLoading = false;
      dispatch(setLoadingAsync(false));
      dispatch(setError(error));
    };

    // Fetch personal events only.
    const isUserEvents = eventView === eventsView.PERSONAL_EVENTS;
    if (isUserEvents) {
      getUsersEvents(date)
        .then(({ data }) => onSuccess(data, isUserEvents))
        .catch(error => onError(error));
      // Fetch team's events as well as your own.
    } else if (eventView === eventsView.TEAM_EVENTS) {
      getTeamsEvents(date)
        .then(({ data }) => onSuccess(data, isUserEvents))
        .catch(error => onError(error));
    }
  }
};
