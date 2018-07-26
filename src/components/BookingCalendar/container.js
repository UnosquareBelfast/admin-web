import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      takenHolidays: PT.array,
      updateBookingAndDuration: PT.func,
    };

    constructor(props) {
      super(props);
    }

    onSelectSlot = ({ start, end }) => {
      const today = new moment();
      if (moment(start).isAfter(today.add(-1, 'days'))) {
        let booking = {
          end: moment(end),
          eventStatusId: 1,
          isEventBeingUpdated: false,
          isHalfday: false,
          isWFH: false,
          start: moment(start),
        };
        this.props.updateBookingAndDuration(booking);
      } else {
        Swal({
          text: 'Unable to select past dates',
          title: 'Sorry',
        });
      }
    };

    onSelectEvent = booking => {
      if (booking.employeeId == this.props.userDetails.employeeId) {
        const updatedBooking = {
          ...booking,
          isEventBeingUpdated: true,
        };
        this.props.updateBookingAndDuration(updatedBooking);
      } else {
        Swal({
          text: `Unable to update ${booking.employee.forename}'s events`,
          title: 'Sorry',
        });
      }
    };

    render() {
      return (
        this.props.userDetails &&
        this.props.takenHolidays && (
          <Wrapped
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            takenHolidays={this.props.takenHolidays}
            updateTakenHolidays={this.getTakenHolidays}
            userDetails={this.props.userDetails}
          />
        )
      );
    }
  };

export default BookingCalendarContainer;
