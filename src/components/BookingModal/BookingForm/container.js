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
import eventTypes from '../../../utilities/eventTypes';
import holidayStatus from '../../../utilities/holidayStatus';

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
          eventTypeId: workingFromHomeBooking
            ? eventTypes.WFH
            : eventTypes.ANNUAL_LEAVE,
          isHalfday: false,
          start: moment(),
          employeeRejectionMessage: '',
          updateMessage: '',
        },
        submitButtonDisabled: false,
        formIsValid: true,
        capturedRejectionReponseText: '',
        workingFromHomeBooking: this.isWFHBooking(),
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
              ? eventTypes.WFH
              : eventType.eventTypeId,
            isHalfday: halfDay,
            employeeRejectionMessage: '',
            updateMessage: '',
          },
        },
        () => {
          onFormUpdate(this.state.formData);
        }
      );
    };

    isWFHBooking() {
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
          submitButtonDisabled: !this.isValidBooking(formData),
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

    isValidBooking = formData => {
      const { booking, availableDays } = this.props;
      const isExistingBooking = booking.employee !== null;

      const originalBookingLength = getDurationBetweenDates(
        booking.start,
        booking.end
      );
      const formBookingLength = getDurationBetweenDates(
        formData.start,
        formData.end
      );
      const daysRemaining =
        availableDays + (isExistingBooking ? originalBookingLength : 0);
      const validBooking = formBookingLength <= daysRemaining;

      return validBooking;
    };

    getOptions = () => {
      const options = [
        { value: 1, displayValue: 'Annual Leave' },
        { value: 2, displayValue: 'Working from home' },
      ];
      this.state.workingFromHomeBooking ? options.shift() : '';
      return options;
    };

    buttonTextValue = () => {
      const { bookingDuration, isEventBeingUpdated, booking } = this.props;
      const {
        eventStatus: { eventStatusId },
      } = booking;
      let formData = { ...this.state.formData };
      const { eventTypeId } = formData;
      const isEventCancelled = eventStatusId === holidayStatus.CANCELLED;
      const durationText = bookingDuration === 0.5 ? 'Half' : bookingDuration;
      const rejectionMessages = booking.messages && !isEventCancelled;
      const dayText = bookingDuration > 1 ? 'Days' : 'Day';

      if (isEventBeingUpdated) {
        if (isEventCancelled) {
          return 'Cancelled';
        }
        if (rejectionMessages) {
          return 'Submit';
        }
        return `Update to ${durationText} ${dayText}`;
      } else {
        if (eventTypeId !== eventTypes.ANNUAL_LEAVE) {
          return 'Request WFH';
        }
        return `Request ${durationText} ${dayText}`;
      }
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
          getOptions={this.getOptions()}
          buttonTextValue={this.buttonTextValue()}
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
