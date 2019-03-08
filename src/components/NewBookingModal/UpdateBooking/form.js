import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { withFormik, Form, Field } from 'formik';
import { SelectField, DateField, CheckBoxField, TextAreaField } from '../../common/Formik';
import { Button, FormValidationErrorMessage } from '../../common/Formik/styled';

import { isSameDay, getDurationBetweenDates } from '../../../utilities/dates';
import { checkOverlappingEvents } from '../../../utilities/dashboardEvents';
import eventTypes from '../../../constants/eventTypes';
import holidayStatus from '../../../constants/holidayStatus';

const FormikEnhancer = withFormik({
  displayName: 'Update Event Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn

  mapPropsToValues: ({ selectedBooking }) => ({
    eventTypeId: selectedBooking.eventType.eventTypeId,
    startDate: moment(selectedBooking.fullEvent.start),
    endDate: moment(selectedBooking.fullEvent.end),
    isHalfDay: selectedBooking.isHalfDay,
    updateMessage: '',
  }),

  // Custom sync validation
  validate: (values, props) => {
    const { startDate, endDate, isHalfDay, eventTypeId } = values;
    const {
      eventId,
      eventStatus: { eventStatusId },
    } = props.selectedBooking;
    const { holidayStats } = props;
    const initialStart = props.selectedBooking.fullEvent.start;
    const initialEnd = props.selectedBooking.fullEvent.end;
    const initialDuration = getDurationBetweenDates(initialStart, initialEnd);
    const isHoliday = parseInt(eventTypeId) === eventTypes.ANNUAL_LEAVE;

    const yesterday = moment()
      .subtract(1, 'day')
      .endOf();

    const overlappingEvents = checkOverlappingEvents(
      startDate,
      endDate,
      eventId
    );

    let errors = {};

    if (startDate.isBefore(yesterday)) {
      errors.startDate = 'Adjust your start date so it is not in the past.';
    }

    if (startDate.isoWeekday() > 5) {
      errors.startDate = 'Your booking cannot start on a weekend.';
    }

    if (overlappingEvents) {
      errors.endDate = 'You already have an event booked in this date range.';
    }

    if (!isHalfDay) {
      if (endDate.isBefore(yesterday)) {
        errors.endDate = 'Adjust your end date so it is not in the past.';
      }

      if (endDate.isBefore(startDate)) {
        errors.endDate =
          'Adjust your booking so the end date is after the start date.';
      }

      if (endDate.isoWeekday() > 5) {
        errors.endDate = 'Your booking cannot end on a weekend.';
      }
    }

    let hasEnoughDays = true;
    const newDuration = getDurationBetweenDates(startDate, endDate);

    const { availableHolidays } = holidayStats;

    if (isHoliday) {
      if (
        eventStatusId === holidayStatus.PENDING ||
        eventStatusId === holidayStatus.APPROVED
      ) {
        hasEnoughDays = newDuration <= availableHolidays + initialDuration;
      } else {
        hasEnoughDays = newDuration <= availableHolidays;
      }
    }

    if (!hasEnoughDays) {
      errors.endDate = 'You do not have enough remaining holidays.';
    }

    return errors;
  },

  handleSubmit: (payload, bag) => {
    bag.props.handleFormSubmit(payload);
  },
});

class RawForm extends Component {
  static propTypes = {
    eventTypes: PT.array.isRequired,
    values: PT.object.isRequired,
    errors: PT.object.isRequired,
    setFieldValue: PT.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  renderErrors = errors => {
    return (
      <FormValidationErrorMessage>
        {Object.values(errors).map((error, index) => (
          <li key={Object.keys(errors)[index]}>{error}</li>
        ))}
      </FormValidationErrorMessage>
    );
  };

  render() {
    const {
      eventTypes,
      values,
      errors,
    } = this.props;

    return (
      <Form>

        <Field
          component={SelectField}
          title="Booking Type"
          name="eventTypeId"
          options={eventTypes}
        />

        <Field
          component={DateField}
          title="Start Date"
          name="startDate"
          placeholder="Enter a start date"
        />

        {values.isHalfDay === false && (
          <Field
            component={DateField}
            title="End Date"
            name="endDate"
            placeholder="Enter an end date"
          />
        )}

        <Field
          component={CheckBoxField}
          title="Half Day"
          name="isHalfDay"
          disabled={!isSameDay(values.startDate, values.endDate)}
        />

        <Field
          title="Reason for updating (optional)"
          rows="4"
          component={TextAreaField}
          name="updateMessage"
          placeholder="Enter a reason for updating"
        />

        {Object.keys(errors).length ? this.renderErrors(errors) : null}
        <Button type="update" disabled={Object.keys(errors).length > 0}>
          Update
        </Button>
      </Form>
    );
  }
}

export default FormikEnhancer(RawForm);
