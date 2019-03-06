import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { withFormik, Form, Field } from 'formik';
import { SelectField, DateField, CheckBoxField } from '../../common/Formik';
import { Button, FormValidationErrorMessage } from '../../common/Formik/styled';

import { isSameDay, getDurationBetweenDates } from '../../../utilities/dates';
import { checkOverlappingEvents } from '../../../utilities/dashboardEvents';
import { getHolidayStats } from '../../../reducers';
import eventTypes from '../../../constants/eventTypes';
import store from '../../../store';

const FormikEnhancer = withFormik({
  displayName: 'New Event Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn

  mapPropsToValues: ({ start, end }) => ({
    eventTypeId: '1',
    startDate: moment(start),
    endDate: moment(end),
    halfDay: false,
  }),

  // Custom sync validation
  validate: values => {
    const { startDate, endDate, halfDay, eventTypeId } = values;

    const yesterday = moment()
      .subtract(1, 'day')
      .endOf();

    const holidayStats = getHolidayStats(store.getState());
    const overlappingEvents = checkOverlappingEvents(startDate, endDate);

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

    if (
      getDurationBetweenDates(startDate, endDate) > holidayStats.available &&
      parseInt(eventTypeId) === eventTypes.ANNUAL_LEAVE
    ) {
      errors.endDate = 'You do not have enough remaining holidays';
    }

    if (!halfDay) {
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

    return errors;
  },

  handleSubmit: (payload, bag) => {
    bag.props.handleSubmit(payload);
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

        {values.halfDay === false && (
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
          name="halfDay"
          disabled={!isSameDay(values.startDate, values.endDate)}
        />

        {Object.keys(errors).length ? this.renderErrors(errors) : null}
        <Button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default FormikEnhancer(RawForm);
