import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectBooking, updateEventDuration } from '../../../actions/dashboard';
import {
  validationMessage,
  checkIfPastDatesSelected,
  checkIfDatesFallOnWeekend,
  checkIfSelectedDatesOverlapExisting,
  startDateValidation,
  endDateValidation,
  halfDayValidation,
} from '../../../utilities/dashboardEvents';
import { Toast } from '../../../utilities/Notifications';
import moment from 'moment';
import { getAllEvents, eventBeingUpdated } from '../../../reducers';
import { getDurationBetweenDates } from '../../../utilities/dates';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object.isRequired,
      allEvents: PT.array.isRequired,
      selectBooking: PT.func.isRequired,
      booking: PT.object.isRequired,
      isEventBeingUpdated: PT.bool,
      updateEventDuration: PT.func,
      bookingDuration: PT.number,
      createEvent: PT.func.isRequired,
      updateEvent: PT.func.isRequired,
      toggleRejectionMessageView: PT.bool.isRequired,
      onFormUpdate: PT.func.isRequired,
      hasAvailableDays: PT.bool.isRequired,
      totalHolidays: PT.number.isRequired,
      availableDays: PT.number.isRequired,
      workingFromHomeBooking: PT.bool.isRequired,
    };
    static defaultProps = {
      isEventBeingUpdated: false,
      bookingDuration: 1,
    };
    constructor(props) {
      super(props);
      const { workingFromHomeBooking } = this.props;

      this.state = {
        formData: {
          end: moment(),
          eventTypeId: workingFromHomeBooking ? 2 : 1,
          isHalfday: false,
          start: moment(),
          employeeRejectionMessage: '',
          updateMessage: '',
        },
        submitButtonDisabled: false,
        formIsValid: true,
        capturedRejectionReponseText: '',
        workingFromHomeBooking: this.wFhBooking(),
      };
    }
    componentDidMount = () => {
      const {
        booking: { start, end, eventType, halfDay },
        onFormUpdate,
      } = this.props;
      this.setState(
        {
          formData: {
            start: start,
            end: end,
            eventTypeId: this.state.workingFromHomeBooking
              ? 2
              : eventType.eventTypeId,
            isHalfday: halfDay || false,
            employeeRejectionMessage: '',
            updateMessage: '',
          },
        },
        () => {
          onFormUpdate(this.state.formData);
        }
      );
    };

    wFhBooking() {
      const {
        workingFromHomeBooking,
        booking: { start, end },
      } = this.props;
      const holidayBookingDuration = end.diff(start, 'days') + 1;
      return workingFromHomeBooking && holidayBookingDuration === 1;
    }

    assignRejectionResponseText = e => {
      this.setState({ capturedRejectionReponseText: e.target.value });
    };

    handleCalendarValidation({ start, end }) {
      const pastDatesSelected = checkIfPastDatesSelected(start);
      const datesFallOnWeekend = checkIfDatesFallOnWeekend(start, end);
      if (pastDatesSelected) {
        return validationMessage.PAST_DATES_SELECTED;
      } else if (datesFallOnWeekend) {
        return validationMessage.WEEKEND_DATES_SELECTED;
      } else {
        const {
          userDetails: { employeeId },
          allEvents,
          booking: { eventId },
        } = this.props;
        const datesOverlapExisting = checkIfSelectedDatesOverlapExisting(
          allEvents,
          employeeId,
          start,
          end,
          eventId
        );
        if (datesOverlapExisting) {
          return validationMessage.DATES_ALREADY_REQUESTED;
        } else {
          return validationMessage.DATES_APPROVED;
        }
      }
    }

    handleFormStatus = (name, value, formIsValid) => {
      const { onFormUpdate, isEventBeingUpdated } = this.props;
      let formData = { ...this.state.formData };
      onFormUpdate(formData);
      formData[name] = value;
      if (name === 'start') {
        formData = startDateValidation(formData);
      } else if (name === 'end') {
        formData = endDateValidation(formData);
      } else if (name === 'isHalfday' && formData.isHalfday) {
        formData = halfDayValidation(formData);
      } else if (name === 'eventTypeId') {
        formData[name] = parseInt(value);
      }

      if (name === 'start' || name === 'end') {
        const calendarValidationResults = this.handleCalendarValidation(
          formData
        );
        formIsValid =
          calendarValidationResults === validationMessage.DATES_APPROVED;
        if (!formIsValid) {
          Toast({
            type: 'warning',
            title: calendarValidationResults,
          });
        }
      }

      if (isEventBeingUpdated) {
        this.setState({
          submitButtonDisabled: this.shouldDisableUpdateButton(formData),
        });
      }

      this.setState({
        formData,
        formIsValid,
      });

      const { updateEventDuration } = this.props;
      updateEventDuration({
        ...formData,
        eventType: {
          eventTypeId: formData.eventTypeId,
        },
      });
    };

    shouldDisableUpdateButton = formData => {
      const { booking, availableDays } = this.props;
      const originalBookingLength = getDurationBetweenDates(
        booking.start,
        booking.end
      );
      const formBookingLength = getDurationBetweenDates(
        formData.start,
        formData.end
      );
      const daysRemaining = availableDays + originalBookingLength;
      const validBooking = formBookingLength <= daysRemaining;
      return !validBooking;
    };

    render() {
      const {
        formData,
        formIsValid,
        workingFromHomeBooking,
        submitButtonDisabled,
      } = this.state;
      const {
        bookingDuration,
        createEvent,
        updateEvent,
        isEventBeingUpdated,
        booking,
        totalHolidays,
        hasAvailableDays,
        availableDays,
      } = this.props;
      return (
        <Wrapped
          submitButtonDisabled={submitButtonDisabled}
          hasAvailableDays={hasAvailableDays}
          totalHolidays={totalHolidays}
          availableDays={availableDays}
          workingFromHomeBooking={workingFromHomeBooking}
          formData={formData}
          booking={booking}
          isEventBeingUpdated={isEventBeingUpdated}
          bookingDuration={bookingDuration}
          formIsValid={formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          createEvent={event => createEvent(event, formData)}
          updateEvent={event => updateEvent(event, formData)}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    allEvents: getAllEvents(state),
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: updatedBooking => dispatch(selectBooking(updatedBooking)),
    updateEventDuration: event => dispatch(updateEventDuration(event)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), Container);
