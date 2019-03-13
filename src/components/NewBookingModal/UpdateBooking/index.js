import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import Form from './form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCommentAlt, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const UpdateBooking = ({
  handleFormSubmit,
  selectedBooking,
  toggleMessagingView,
  holidayStats,
  cancelEvent,
  eventTypes,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <div className="chatIconWrap">
        <FontAwesomeIcon
          icon={faCommentAlt}
          onClick={() => toggleMessagingView(true)}
        />
        <FontAwesomeIcon icon={faTrashAlt} onClick={() => cancelEvent()} />
      </div>
      <h2>Update Booking</h2>
      <Form
        eventTypes={eventTypes}
        handleFormSubmit={handleFormSubmit}
        selectedBooking={selectedBooking}
        holidayStats={holidayStats}
      />
    </div>
  );
};

UpdateBooking.propTypes = {
  eventTypes: PT.array.isRequired,
  handleFormSubmit: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
  toggleMessagingView: PT.func.isRequired,
  holidayStats: PT.object.isRequired,
  cancelEvent: PT.func.isRequired,
};

export default container(UpdateBooking);
