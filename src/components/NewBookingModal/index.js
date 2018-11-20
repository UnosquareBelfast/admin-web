import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Rodal from 'rodal';
import container from './container';
import NewBooking from './NewBooking';
import UpdateBooking from './UpdateBooking';

const BookingModal = props => {
  const {
    modalVisible,
    toggleModal,
    selectedBooking,
    refreshCalendar,
  } = props;
  const isBeingUpdated = selectedBooking.hasOwnProperty('eventId');

  return (
    <Rodal visible={modalVisible} onClose={() => toggleModal(false)}>
      {isBeingUpdated ? (
        <UpdateBooking />
      ) : (
        <NewBooking
          toggleModal={toggleModal}
          refreshCalendar={refreshCalendar}
          start={selectedBooking.start}
          end={selectedBooking.end}
        />
      )}
    </Rodal>
  );
};

BookingModal.propTypes = {
  modalVisible: PT.bool.isRequired,
  toggleModal: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
  refreshCalendar: PT.func.isRequired,
};

export default container(BookingModal);
