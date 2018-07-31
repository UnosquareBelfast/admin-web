import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import {
  updateHoliday,
  requestHoliday,
  rejectHoliday,
} from '../../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number.isRequired,
      updateTakenHolidays: PT.func.isRequired,
      updateBookingAndDuration: PT.func.isRequired,
      closeModal: PT.func.isRequired,
      booking: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          end: props.booking.end,
          eventTypeId: props.booking.eventType.eventTypeId,
          isHalfday: props.booking.halfDay || false,
          start: props.booking.start,
        },
        formIsValid: true,
      };
    }

    handleMakeHolidayRequest = event => {
      event.preventDefault();
      const { start, end, isHalfday, eventTypeId } = this.state.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: start.format(dateFormat),
            endDate: end.format(dateFormat),
            halfDay: isHalfday,
          },
        ],
        eventTypeId: eventTypeId,
        employeeId: this.props.employeeId,
      };

      requestHoliday(request).then(() => {
        this.props.updateTakenHolidays();
        this.props.closeModal();
      });
    };

    handleUpdateHolidayRequest = (event, cancel) => {
      event.preventDefault();

      const { holidayId } = this.props.booking;
      const { updateTakenHolidays, closeModal } = this.props;
      if (cancel) {
        rejectHoliday(holidayId)
          .then(() => {
            updateTakenHolidays();
            closeModal();
          })
          .catch(error => {
            Swal({
              title: 'Sorry, not able to reject your holiday request.',
              text: error.message,
              type: 'error',
            });
            closeModal();
          });
      } else {
        const { start, end, isHalfday } = this.state.formData;
        const dateFormat = 'YYYY-MM-DD';
        const request = {
          endDate: end.format(dateFormat),
          halfDay: isHalfday,
          holidayId: holidayId,
          startDate: start.format(dateFormat),
        };

        updateHoliday(request)
          .then(() => {
            updateTakenHolidays();
            closeModal();
          })
          .catch(error => {
            Swal({
              title: 'Sorry, not able to update your holiday request.',
              text: error.message,
              type: 'error',
            });
            closeModal();
          });
      }
    };

    handleFormStatus(name, value, formIsValid) {
      const formData = { ...this.state.formData };
      formData[name] = value;

      if (name == 'start') {
        if (formData.isHalfday) {
          formData.end = formData.start;
        } else {
          if (formData.start.isAfter(formData.end)) {
            formData.end = formData.start;
          }
        }
      } else if (name == 'end') {
        if (formData.isHalfday) {
          formData.start = formData.end;
        } else {
          if (formData.end.isBefore(formData.start)) {
            formData.start = formData.end;
          }
        }
      } else if (name === 'isHalfday' && formData.isHalfday) {
        formData.end = formData.start;
        formData.eventTypeId = 1;
      }

      this.setState(
        {
          formData,
          formIsValid,
        },
        () => {
          this.updateBookingObj(formData);
        },
      );
    }

    updateBookingObj(formData) {
      const { isEventBeingUpdated } = this.props.booking;
      const updatedBooking = {
        ...this.props.booking,
        ...formData,
        isEventBeingUpdated: isEventBeingUpdated,
      };
      this.props.updateBookingAndDuration(updatedBooking);
    }

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          isEventBeingUpdated={this.props.booking.isEventBeingUpdated}
          daysRequested={this.props.booking.duration}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          updateBookingAndDuration={this.props.updateBookingAndDuration}
          submitHolidayRequest={event => this.handleMakeHolidayRequest(event)}
          updateHolidayRequest={event =>
            this.handleUpdateHolidayRequest(event, false)
          }
          deleteHolidayRequest={event =>
            this.handleUpdateHolidayRequest(event, true)
          }
        />
      );
    }
  };
