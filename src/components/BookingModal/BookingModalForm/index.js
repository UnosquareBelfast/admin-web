import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import eventTypes from '../../../utilities/eventTypes';
import holidayStatus from '../../../utilities/holidayStatus';

const BookingModalForm = props => {
  const {
    isEventBeingUpdated,
    createEvent,
    updateEvent,
    formData,
    formStatus,
    formIsValid,
    bookingDuration,
    booking,
    workingFromHomeBooking,
    submitButtonDisabled,
    availableDays,
  } = props;

  const { eventStatus: {eventStatusId} } = booking;
  const isEventCancelled = eventStatusId === holidayStatus.CANCELLED;
  const rejectionMessages = booking.messages && !isEventCancelled;
  const { eventTypeId } = formData;

  const createCtas = () => {
    const buttonTextValue =
      `${eventTypeId !== eventTypes.ANNUAL_LEAVE ? '' : bookingDuration === 0.5 ? 'Half' : bookingDuration}
       ${eventTypeId !== eventTypes.ANNUAL_LEAVE ? 'WFH' : bookingDuration > 1 ? 'Days' : 'Day'}`;

    let isDisabled = false;
    if (!isEventBeingUpdated) {
      isDisabled = bookingDuration > availableDays;
    }

    if (isEventBeingUpdated) {
      return [
        {
          label: isEventCancelled ? 'Cancelled' : rejectionMessages ? 'Submit' : `Update to ${
            bookingDuration === 0.5 ? 'Half' : bookingDuration
          } ${bookingDuration > 1 ? 'Days' : 'Day'}`,
          event: updateEvent,
          disabled: isEventCancelled ? isEventCancelled : submitButtonDisabled,
        },
      ];
    } else {
      return [
        {
          label: rejectionMessages ? 'Submit' : `Request ${buttonTextValue} `,
          event: createEvent,
          disabled: isDisabled,
        },
      ];
    }
  };

  const renderWFH = () => {
    const options = [
      { value: 1, displayValue: 'Annual Leave' },
      { value: 2, displayValue: 'Working from home' },
    ];
    workingFromHomeBooking ? options.shift() : '';
    return options;
  };

  return (
    <Fragment>
      <Form formData={formData} formStatus={formStatus} actions={createCtas()}>
        {!rejectionMessages && <Input
          type="select"
          htmlAttrs={{
            name: 'eventTypeId',
            options: renderWFH(),
            
          }}
          disabled={isEventCancelled}
          value={formData.eventTypeId}
          label="Reason:"
        /> }
        {!rejectionMessages && <Input
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
        /> }
        {!rejectionMessages && <Input
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
        /> }
        {rejectionMessages && <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'employeeRejectionMessage',
            disabled: !rejectionMessages,
          }}
          value={formData.employeeRejectionMessage}
          label="Rejection Response:"
        /> }
        {!rejectionMessages && !isEventCancelled && <Input
          type="checkbox"
          htmlAttrs={{
            type: 'checkbox',
            name: 'isHalfday',
          }}
          value={formData.isHalfday}
          label="Request a halfday"
        /> }
        {!rejectionMessages && !isEventCancelled && <Input
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
        /> }
      </Form>
    </Fragment>
  );
};

BookingModalForm.propTypes = {
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
};

BookingModalForm.defaultProps = {
  formIsValid: true,
};

export default container(BookingModalForm);