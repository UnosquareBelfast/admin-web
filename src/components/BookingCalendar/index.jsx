import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BigCalendarToolbar } from '../../components';
import { Event } from '../../components/common';

moment.locale('en-gb');
Calendar.momentLocalizer(moment);

export const BookingCalendar = props => {
  const { selectCalendarSlot, onSelectEvent, events, onNavigate } = props;

  return (
    <Calendar
      components={{ eventWrapper: Event, toolbar: BigCalendarToolbar }}
      defaultDate={new Date()}
      events={events}
      endAccessor={({ end }) => end.endOf('day')}
      messages={{ agenda: 'team', personal: 'personal' }}
      onSelectSlot={slot => selectCalendarSlot(slot)}
      onSelectEvent={event => selectCalendarSlot(event)}
      popup
      showMultiDayTimes
      selectable
      views={{ month: true }}
      formats={{
        weekdayFormat: 'dddd',
      }}
      onNavigate={onNavigate}
    />
  );
};

BookingCalendar.propTypes = {
  onSelectEvent: PT.func.isRequired,
  onNavigate: PT.func.isRequired,
  events: PT.array.isRequired,
  selectCalendarSlot: PT.func.isRequired,
};

export default container(BookingCalendar);
