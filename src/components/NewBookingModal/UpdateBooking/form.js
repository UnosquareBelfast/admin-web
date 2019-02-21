import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { withFormik } from 'formik';
import DatePicker from 'react-datepicker';

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
    values: PT.object.isRequired,
    touched: PT.object.isRequired,
    errors: PT.object.isRequired,
    handleChange: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
    setFieldValue: PT.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  renderErrors = errors => {
    return Object.values(errors).map((error, index) => (
      <li key={Object.keys(errors)[index]}>{error}</li>
    ));
  };

  dateSelectionChanged = value => {
    const { values, setFieldValue } = this.props;
    if (values.endDate.isBefore(value)) {
      setFieldValue('startDate', value);
      setFieldValue('endDate', value);
    } else if (values.isHalfDay) {
      setFieldValue('endDate', value);
      setFieldValue('startDate', value);
    } else {
      setFieldValue('startDate', value);
    }
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      setFieldValue,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventTypeId">Booking Type</label>
        <select
          id="eventTypeId"
          onChange={handleChange}
          value={values.eventTypeId}
          className={errors.eventTypeId && touched.eventTypeId ? 'error' : ''}
        >
          <option value={1}>Annual Leave</option>
          <option value={2}>Working From Home</option>
        </select>
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          id="startDate"
          selected={values.startDate}
          onChange={value => this.dateSelectionChanged(value)}
          className={errors.startDate && touched.startDate ? 'error' : ''}
        />
        {values.isHalfDay === false && (
          <Fragment>
            <label htmlFor="endDate">End Date</label>
            <DatePicker
              id="endDate"
              selected={values.endDate}
              onChange={value => setFieldValue('endDate', value)}
              className={errors.endDate && touched.endDate ? 'error' : ''}
              minDate={values.startDate}
            />
          </Fragment>
        )}
        <div className="checkbox">
          <input
            type="checkbox"
            id="isHalfDay"
            name="isHalfDay"
            checked={values.isHalfDay}
            onChange={handleChange}
            className={errors.isHalfDay && touched.isHalfDay ? 'error' : ''}
            disabled={!isSameDay(values.startDate, values.endDate)}
          />
          <label htmlFor="isHalfDay">Half Day</label>
        </div>
        <label htmlFor="updateMessage">Reason for updating (optional)</label>
        <textarea
          id="updateMessage"
          name="updateMessage"
          onChange={handleChange}
          className={
            errors.updateMessage && touched.updateMessage
              ? 'multi error'
              : 'multi'
          }
          rows="2"
          style={{ marginBottom: '20px' }}
        />
        {Object.keys(errors).length ? this.renderErrors(errors) : null}
        <button type="update" disabled={Object.keys(errors).length > 0}>
          Update
        </button>
      </form>
    );
  }
}

export default FormikEnhancer(RawForm);
