import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  validationMessage,
  checkIfPastDatesSelected,
  checkIfDatesFallOnWeekend,
  checkIfSelectedDatesOverlapExisting,
} from '../../utilities/dashboardEvents';
import {
  selectBooking,
  setEventBeingUpdated,
  updateEventDuration,
} from '../../actions/dashboard';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      events: PT.array,
      selectBooking: PT.func,
      updateEventDuration: PT.func,
      setEventBeingUpdated: PT.func,
      toggleBookingModal: PT.func.isRequired,
      onNavigate: PT.func,
      selectCalendarSlot: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
    }

    openModal = () => {
      this.props.toggleBookingModal(true);
    };

    bookingModalConfig = (event, isBeingUpdated) => {
      this.openModal();
      this.props.updateEventDuration(event);
      this.props.setEventBeingUpdated(isBeingUpdated);
    };

    handleCalendarValidation = (start, end) => {
      const { events, employeeId } = this.props;
      const pastDatesSelected = checkIfPastDatesSelected(start);
      const datesFallOnWeekend = checkIfDatesFallOnWeekend(start, end);
      if (pastDatesSelected) {
        return validationMessage.PAST_DATES_SELECTED;
      } else if (datesFallOnWeekend) {
        return validationMessage.WEEKEND_DATES_SELECTED;
      } else {
        const datesOverlapExisting = checkIfSelectedDatesOverlapExisting(
          events,
          employeeId,
          start,
          end
        );
        if (datesOverlapExisting) {
          return validationMessage.DATES_ALREADY_REQUESTED;
        } else {
          return validationMessage.DATES_APPROVED;
        }
      }
    };

    render() {
      const { onNavigate, selectCalendarSlot } = this.props;
      return (
        <Wrapped
          onNavigate={onNavigate}
          events={this.props.events}
          selectCalendarSlot={selectCalendarSlot}
        />
      );
    }
  };

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: booking => dispatch(selectBooking(booking)),
    updateEventDuration: event => dispatch(updateEventDuration(event)),
    setEventBeingUpdated: isUpdated =>
      dispatch(setEventBeingUpdated(isUpdated)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  BookingCalendarContainer
);
