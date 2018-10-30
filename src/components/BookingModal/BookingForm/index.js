import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import holidayStatus from '../../../utilities/holidayStatus';

const BookingForm = props => {
  const {
    isEventBeingUpdated,
    createEvent,
    updateEvent,
    formData,
    formStatus,
    formIsValid,
    bookingDuration,
    booking,
    getOptions,
    submitButtonDisabled,
    availableDays,
    buttonTextValue,
  } = props;

  const {
    eventStatus: { eventStatusId },
  } = booking;
  const isEventCancelled = eventStatusId === holidayStatus.CANCELLED;
  const isEventApproved = eventStatusId === holidayStatus.APPROVED;

  const createCtas = () => {
    let isDisabled = false;

    if (isEventBeingUpdated) {
      return [
        {
          label: buttonTextValue,
          event: updateEvent,
          disabled: isEventCancelled || submitButtonDisabled || isEventApproved,
        },
      ];
    } else {
      isDisabled = bookingDuration > availableDays;
      return [
        {
          label: buttonTextValue,
          event: createEvent,
          disabled: isDisabled,
        },
      ];
    }
  };

  return (
    <Form formData={formData} formStatus={formStatus} actions={createCtas()}>
      <Input
        type="select"
        htmlAttrs={{
          name: 'eventTypeId',
          options: getOptions,
        }}
        disabled={isEventCancelled}
        value={formData.eventTypeId}
        label="Reason:"
      />
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'start',
          placeholder: 'Enter a start date',
        }}
        value={formData.start}
        disabled={isEventCancelled}
        rules={{
          dateNotInPast: true,
        }}
        label={formData.isHalfday ? 'Date' : 'Start Date:'}
      />
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'end',
          placeholder: 'Enter an end date',
          disabled: formData.isHalfday,
        }}
        disabled={isEventCancelled}
        value={formData.end}
        rules={{
          dateNotInPast: true,
        }}
        label="End Date:"
      />
      <Input
        type="checkbox"
        htmlAttrs={{
          type: 'checkbox',
          name: 'isHalfday',
        }}
        value={formData.isHalfday}
        label="Request a halfday"
      />
      <Input
        type="input"
        className={isEventBeingUpdated ? null : 'hide'}
        htmlAttrs={{
          type: 'input',
          name: 'updateMessage',
          placeholder: 'optional',
        }}
        value={formData.updateMessage}
        label="Reason for updating holiday:"
        labelClass={isEventBeingUpdated ? null : 'hide'}
        disabled={!formIsValid}
      />
    </Form>
  );
};

BookingForm.propTypes = {
  bookingDuration: PT.number.isRequired,
  formData: PT.object.isRequired,
  isEventBeingUpdated: PT.bool,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
  createEvent: PT.func.isRequired,
  updateEvent: PT.func.isRequired,
  booking: PT.object,
  workingFromHomeBooking: PT.bool.isRequired,
  availableDays: PT.number.isRequired,
  submitButtonDisabled: PT.bool.isRequired,
  getOptions: PT.array.isRequired,
  buttonTextValue: PT.string.isRequired,
};

BookingForm.defaultProps = {
  formIsValid: true,
};

export default container(BookingForm);
