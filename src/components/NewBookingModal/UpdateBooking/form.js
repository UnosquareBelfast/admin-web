import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { withFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { isSameDay, getDurationBetweenDates } from '../../../utilities/dates';
import { checkOverlappingEvents } from '../../../utilities/dashboardEvents';
import { getHolidayStats } from '../../../reducers';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import eventTypes from '../../../utilities/eventTypes';
import store from '../../../store';
import { RedButton, BlueButton } from '../styled';

const FormikEnhancer = withFormik({
  displayName: 'Update Event Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn

  mapPropsToValues: ({ selectedBooking }) => ({
    eventTypeId: selectedBooking.eventType.eventTypeId,
    startDate: moment(selectedBooking.start),
    endDate: moment(selectedBooking.end),
    halfDay: selectedBooking.halfDay,
  }),

  // Custom sync validation
  validate: values => {
    const { startDate, endDate, halfDay, eventTypeId } = values;

    const yesterday = moment()
      .subtract(1, 'day')
      .endOf();

    const holidayStats = getHolidayStats(store.getState());
    const overlappingEvents = checkOverlappingEvents(startDate, endDate, eventTypeId);


    let errors = {};

    if (startDate.isBefore(yesterday)) {
      errors.startDate = 'Start date cannot be in the past';
    }

    if (startDate.isoWeekday() > 5) {
      errors.startDate = 'Start date cannot be a weekend';
    }

    if (overlappingEvents) {
      errors.endDate = 'Your booking is overlapping another';
    }

    if (
      getDurationBetweenDates(startDate, endDate) > holidayStats.available &&
      parseInt(eventTypeId) === eventTypes.ANNUAL_LEAVE
    ) {
      errors.endDate = 'You do not have enough remaining holidays';
    }

    if (!halfDay) {
      if (endDate.isBefore(yesterday)) {
        errors.endDate = 'End date cannot be in the past';
      }

      if (endDate.isBefore(startDate)) {
        errors.endDate = 'End date cannot be before start date';
      }

      if (endDate.isoWeekday() > 5) {
        errors.endDate = 'End date cannot be a weekend';
      }
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
    cancelHolidayRequest: PT.func.isRequired,
    modalVisible: PT.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cancelConfirm: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.modalVisible) {
      return { cancelConfirm: false };
    }
    else return null;
  }

  renderErrors = errors => {
    return Object.values(errors).map((error, index) => (
      <li key={Object.keys(errors)[index]}>{error}</li>
    ));
  };

  handleCancel = (values) => {
    if (!this.state.cancelConfirm) {
      this.setState({ cancelConfirm: true });
    } else {
      this.props.cancelHolidayRequest(values.eventTypeId);
    }
  }
  
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      setFieldValue,
      modalVisible,
    } = this.props;
    
    const { cancelConfirm } = this.state;

    const cancelButtons = cancelConfirm
      ?
      <RedButton type="button" onClick={this.handleCancel}>
        Confirm &nbsp;
        <FontAwesomeIcon icon={faTrash} color="white"/>
      </RedButton>
      :
      <BlueButton type="button" onClick={this.handleCancel}>
        Cancel Booking
      </BlueButton>;

    return (
      <form
        onSubmit={handleSubmit}
      > 
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
            checked={values.halfDay}
            onChange={handleChange}
            className={errors.halfDay && touched.halfDay ? 'error' : ''}
            disabled={!isSameDay(values.startDate, values.endDate)}
          />
          <label htmlFor="halfDay">Half Day</label>
        </div>
        <ul>{this.renderErrors(errors)}</ul>
        <div className="submitOrCancel">
          <BlueButton type="update" className="update" disabled={Object.keys(errors).length > 0}>
            Update
          </BlueButton>

          {modalVisible
            ? cancelButtons
            : <BlueButton type="button" onClick={this.handleCancel}>
              Cancel Booking
            </BlueButton>}
        </div>
      </form>
    );
  }
}

export default FormikEnhancer(RawForm);
