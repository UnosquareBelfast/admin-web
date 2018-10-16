import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import moment from 'moment';
import { isEmpty } from 'lodash';
import ModalStatusBanner from './ModalStatusBanner';
import BookingModalForm from './BookingModalForm';
import { Modal } from '../common';
import AlertMessage from './AlertMessage';
import { StyleContainer, FormContainer } from './styled';
import { Spinner } from '../common';
import { SpinnerContainer } from '../../hoc/AuthUserAndStore/styled';
import LegacyMessageList from './LegacyMessageList';
import {
  calculateDaysNotice,
  getDurationBetweenDates,
} from '../../utilities/dates';
import eventTypes from '../../utilities/eventTypes';

const rejectionReason = booking => {
  if (booking.messages) {
    return booking.messages.message;
  }
  return undefined;
};
const BookingModal = props => {
  const {
    userDetails,
    booking,
    employeeId,
    closeBookingModal,
    bookingModalOpen,
    updateTakenEvents,
    isEventBeingUpdated,
    bookingDuration,
    createEvent,
    updateEvent,
    cancelEvent,
    toggleLegacyHolidayMessageView,
    toggleRejectionMessageView,
    loading,
    pendingDays,
    approvedDays,
    onFormUpdate,
    formData,
    workingFromHomeBooking,
  } = props;

  const renderSpinner = () => {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  };
  const renderLegacyMessage = () => {
    if (toggleRejectionMessageView) {
      return <LegacyMessageList eventId={booking.eventId} />;
    }
    return null;
  };

  const renderBookingModalForm = () => {
    const { totalHolidays } = userDetails;
    const availableDays = totalHolidays - approvedDays - pendingDays;
    const hasAvailableDays = bookingDuration <= availableDays;

    if (!toggleRejectionMessageView) {
      return (
        <div>
          <FormContainer>
            <BookingModalForm
              workingFromHomeBooking={workingFromHomeBooking}
              totalHolidays={totalHolidays}
              hasAvailableDays={hasAvailableDays}
              availableDays={availableDays}
              onFormUpdate={onFormUpdate}
              userDetails={userDetails}
              toggleRejectionMessageView={toggleRejectionMessageView}
              updateTakenEvents={updateTakenEvents}
              employeeId={employeeId}
              booking={booking}
              bookingDuration={bookingDuration}
              createEvent={createEvent}
              updateEvent={updateEvent}
            />
          </FormContainer>
        </div>
      );
    }
    return null;
  };
  const renderModalContent = () => {
    const daysNotice = calculateDaysNotice(bookingDuration);
    const { totalHolidays } = userDetails;
    const availableDays = totalHolidays - approvedDays - pendingDays;
    const hasAvailableDays = bookingDuration <= availableDays;
    const alert = {};
    const today = new moment();
    let isWorkingFromHome = false;
    if (!isEmpty(formData)) {
      const fromTodayToStartDateRequested = getDurationBetweenDates(
        today,
        formData.start
      );
      isWorkingFromHome = formData.eventTypeId === eventTypes.WFH;

      if (!hasAvailableDays) {
        alert.title = `${availableDays} Holidays Remaining`;
        alert.body =
          'You\'re unable to book this holiday due to not having enough available hoildays. Please contact HR.';
      } else if (fromTodayToStartDateRequested < daysNotice) {
        alert.title = 'This booking could be declined.';
        alert.body = `You should give ${daysNotice} working/business days notice to request
        ${' ' + bookingDuration} ${bookingDuration > 1 ? 'days' : 'day'} off.`;
      }
    }
    return (
      <StyleContainer>
        <h1>{isEventBeingUpdated ? 'Update Booking' : 'Request a Booking'}</h1>
        {!isEventBeingUpdated &&
          !isEmpty(alert) &&
          !isWorkingFromHome && (
          <AlertMessage title={alert.title}>{alert.body}</AlertMessage>
        )}
        {isEventBeingUpdated && (
          <ModalStatusBanner
            toggleRejectionMessageView={toggleRejectionMessageView}
            toggleLegacyHolidayMessageView={toggleLegacyHolidayMessageView}
            userName={booking.title}
            eventStatus={booking.eventStatus}
            eventType={booking.eventType}
            cancelEvent={cancelEvent}
            rejectionReason={rejectionReason(booking)}
          />
        )}
        {renderLegacyMessage()}
        {renderBookingModalForm()}
      </StyleContainer>
    );
  };
  return (
    bookingModalOpen && (
      <Modal closeModal={closeBookingModal}>
        {!loading ? renderModalContent() : renderSpinner()}
      </Modal>
    )
  );
};
BookingModal.propTypes = {
  booking: PT.object.isRequired,
  employeeId: PT.number,
  closeBookingModal: PT.func.isRequired,
  bookingModalOpen: PT.bool,
  updateTakenEvents: PT.func.isRequired,
  bookingDuration: PT.number,
  createEvent: PT.func.isRequired,
  updateEvent: PT.func.isRequired,
  cancelEvent: PT.func.isRequired,
};
export default container(BookingModal);
