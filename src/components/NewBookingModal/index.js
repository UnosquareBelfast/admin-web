import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Modal from '../common/Modal';
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
    <Modal visible={modalVisible} onClose={() => toggleModal(false)}>
      {isBeingUpdated ? (
        <UpdateBooking 
          selectedBooking={selectedBooking}
          refreshCalendar={refreshCalendar}
          toggleModal={toggleModal}
        />
      ) : (
        <NewBooking
          toggleModal={toggleModal}
          refreshCalendar={refreshCalendar}
          start={selectedBooking.start}
          end={selectedBooking.end}
        />
      )}
    </Modal>
  );
};

BookingModal.propTypes = {
  modalVisible: PT.bool.isRequired,
  toggleModal: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
  refreshCalendar: PT.func.isRequired,
};

export default container(BookingModal);
