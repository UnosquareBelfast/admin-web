import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { withFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { isSameDay, getDurationBetweenDates } from '../../../utilities/dates';
import { checkOverlappingEvents } from '../../../utilities/dashboardEvents';
import { getHolidayStats } from '../../../reducers';
import eventTypes from '../../../utilities/eventTypes';
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
    return (
      <ul>
        {Object.values(errors).map((error, index) => (
          <li key={Object.keys(errors)[index]}>{error}</li>
        ))}
      </ul>
    );
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
          onChange={value => setFieldValue('startDate', value)}
          className={errors.startDate && touched.startDate ? 'error' : ''}
        />
        {values.halfDay === false && (
          <Fragment>
            <label htmlFor="endDate">End Date</label>
            <DatePicker
              id="endDate"
              selected={values.endDate}
              onChange={value => setFieldValue('endDate', value)}
              className={errors.endDate && touched.endDate ? 'error' : ''}
            />
          </Fragment>
        )}
        <div className="half-day">
          <input
            type="checkbox"
            id="halfDay"
            name="halfDay"
            value={values.halfDay}
            onChange={handleChange}
            className={errors.halfDay && touched.halfDay ? 'error' : ''}
            disabled={!isSameDay(values.startDate, values.endDate)}
          />
          <label htmlFor="halfDay">Half Day</label>
        </div>
        {Object.keys(errors).length ? this.renderErrors(errors) : null}
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    );
  }
}

export default FormikEnhancer(RawForm);
