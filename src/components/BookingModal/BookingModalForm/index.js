import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import eventTypes from '../../../utilities/eventTypes';

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
          label: booking.messages ? 'Submit' : `Update to ${
            bookingDuration === 0.5 ? 'Half' : bookingDuration
          } ${bookingDuration > 1 ? 'Days' : 'Day'}`,
          event: updateEvent,
          disabled: submitButtonDisabled,
        },
      ];
    } else {
      return [
        {
          label: booking.messages ? 'Submit' : `Request ${buttonTextValue} `,
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
        <Input
          type="select"
          htmlAttrs={{
            name: 'eventTypeId',
            options: renderWFH(),
          }}

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
          value={formData.end}
          rules={{
            dateNotInPast: true,
          }}
          label="End Date:"
        /> 
        <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'employeeRejectionMessage',
            disabled: !booking.messages,
          }}
          value={formData.employeeRejectionMessage}
          label="Rejection Response:"
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