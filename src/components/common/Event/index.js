import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import eventCategory from '../../../constants/eventCategory';
import eventTypes, { typeIcons } from '../../../constants/eventTypes';
import { statusIcons } from '../../../constants/holidayStatus';
import moment from 'moment';

const Event = ({ children, event }) => {
  const { eventStatusId } = event.eventStatus;
  const { eventTypeId } = event.eventType;
  let id;
  let icon;
  let category;

  if (eventTypeId === eventTypes.ANNUAL_LEAVE) {
    icon = statusIcons[eventStatusId];
    category = eventCategory.HOLIDAY_STATUS;
    id = eventStatusId;
  } else {
    icon = typeIcons[eventTypeId];
    category = eventCategory.EVENT_TYPE;
    id = eventTypeId;
  }

  const today = new moment();
  const eventPast = event.end.endOf().isBefore(today);

  return (
    <Container
      fade={eventPast}
      className={
        event.isHalfDay ? category + ' small ishalfday' : category + ' small'
      }
      status={id}
      onClick={children.props.onClick}
    >
      {icon} <span>{event.title}</span>
    </Container>
  );
};

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
