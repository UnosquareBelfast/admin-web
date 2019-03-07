import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Modal from '../common/Modal';
import container from './container';
import NewBooking from './NewBooking';
import UpdateBooking from './UpdateBooking';
import Messaging from '../Messaging';
import { BookingModalStyleContainer } from './styled';

const BookingModal = props => {
  const {
    modalVisible,
    toggleModal,
    selectedBooking,
    refreshCalendar,
    toggleMessagingView,
    messagingViewVisible,
  } = props;

  const isBeingUpdated = selectedBooking.hasOwnProperty('eventId');

  const renderBookingForm = () => {
    if (isBeingUpdated) {
      return (
        <UpdateBooking
          selectedBooking={selectedBooking}
          refreshCalendar={refreshCalendar}
          toggleModal={toggleModal}
          toggleMessagingView={toggleMessagingView}
        />
      );
    } else {
      return (
        <NewBooking
          toggleModal={toggleModal}
          refreshCalendar={refreshCalendar}
          start={selectedBooking.start}
          end={selectedBooking.end}
        />
      );
    }
  };

  return (
    <Modal 
      minWidth="50%"
      visible={modalVisible} 
      onClose={() => toggleModal(false)}
    >
      <BookingModalStyleContainer>
        {messagingViewVisible ? (
          <Messaging
            toggleMessagingView={toggleMessagingView}
            eventId={selectedBooking.eventId}
            title={selectedBooking.eventType.description}
          />
        ) : (
          renderBookingForm()
        )}
      </BookingModalStyleContainer>
    </Modal>
  );
};

BookingModal.propTypes = {
  modalVisible: PT.bool.isRequired,
  toggleModal: PT.func.isRequired,
  selectedBooking: PT.object.isRequired,
  refreshCalendar: PT.func.isRequired,
  toggleMessagingView: PT.func.isRequired,
  messagingViewVisible: PT.bool.isRequired,
};

export default container(BookingModal);
