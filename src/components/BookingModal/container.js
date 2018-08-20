import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Swal from 'sweetalert2';
import { toggleBookingModal } from '../../actions/dashboard';
import {
  getBooking,
  bookingModalOpen,
  getBookingDuration,
} from '../../reducers';
import {
  updateHoliday,
  requestHoliday,
  rejectHoliday,
} from '../../services/holidayService';
import { requestWFH } from '../../services/wfhService';
import eventTypes from '../../utilities/eventTypes';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      updateTakenHolidays: PT.func,
      isEventBeingUpdated: PT.bool,
      booking: PT.object,
      bookingModalOpen: PT.bool,
      toggleBookingModal: PT.func,
      bookingDuration: PT.number,
    };

    constructor(props) {
      super(props);
      this.dateFormat = 'YYYY-MM-DD';
    }

    closeBookingModal = () => {
      this.props.toggleBookingModal(false);
    };

    createEvent = (event, formData) => {
      event.preventDefault();
      const {
        employeeId,
        updateTakenHolidays,
        toggleBookingModal,
      } = this.props;
      const { start, end, isHalfday } = formData;
      const eventTypeId = parseInt(formData.eventTypeId);

      const endpoints = {
        [eventTypes.HOLIDAY]: requestHoliday,
        [eventTypes.WFH]: requestWFH,
      };

      const request = {
        dates: [
          {
            startDate: start.format(this.dateFormat),
            endDate: end.format(this.dateFormat),
            halfDay: isHalfday,
          },
        ],
        employeeId: employeeId,
      };

      endpoints[eventTypeId](request)
        .then(() => {
          updateTakenHolidays();
          toggleBookingModal(false);
        })
        .catch(error => Swal('Error', error.message, 'error'));
    };

    updateEvent = (event, formData) => {
      event.preventDefault();
      const { start, end, isHalfday } = formData;
      const eventTypeId = parseInt(formData.eventTypeId);
      const {
        updateTakenHolidays,
        toggleBookingModal,
        booking: { holidayId },
      } = this.props;

      const request = {
        endDate: end.format(this.dateFormat),
        halfDay: isHalfday,
        holidayId: holidayId,
        startDate: start.format(this.dateFormat),
      };

      if (eventTypeId) {
        updateHoliday(request)
          .then(() => {
            updateTakenHolidays();
            toggleBookingModal(false);
          })
          .catch(error => {
            Swal({
              title: 'Error',
              text: error.message,
              type: 'error',
            });
            toggleBookingModal(false);
          });
      }
    };

    cancelEvent = () => {
      const {
        updateTakenHolidays,
        toggleBookingModal,
        booking: { holidayId },
      } = this.props;
      rejectHoliday(holidayId)
        .then(() => {
          updateTakenHolidays();
          toggleBookingModal(false);
        })
        .catch(error => {
          Swal({
            title: 'Error',
            text: error.message,
            type: 'error',
          });
          toggleBookingModal(false);
        });
    };

    render() {
      return (
        this.props.employeeId && (
          <Wrapped
            booking={this.props.booking}
            employeeId={this.props.employeeId}
            bookingModalOpen={this.props.bookingModalOpen}
            closeBookingModal={this.closeBookingModal}
            updateTakenHolidays={this.props.updateTakenHolidays}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            bookingDuration={this.props.bookingDuration}
            createEvent={this.createEvent}
            updateEvent={this.updateEvent}
            cancelEvent={this.cancelEvent}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    booking: getBooking(state),
    bookingModalOpen: bookingModalOpen(state),
    bookingDuration: getBookingDuration(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleBookingModal: open => dispatch(toggleBookingModal(open)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), Container);