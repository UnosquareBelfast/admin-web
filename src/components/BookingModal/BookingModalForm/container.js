import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  toggleBookingModal,
  selectBooking,
  updateEventDuration,
} from '../../../actions/dashboard';
import Swal from 'sweetalert2';
import moment from 'moment';
import {
  updateHoliday,
  requestHoliday,
  rejectHoliday,
} from '../../../services/holidayService';
import { eventBeingUpdated } from '../../../reducers';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number.isRequired,
      updateTakenHolidays: PT.func.isRequired,
      selectBooking: PT.func.isRequired,
      toggleModal: PT.func.isRequired,
      booking: PT.object.isRequired,
      isEventBeingUpdated: PT.bool,
      updateEventDuration: PT.func,
      bookingDuration: PT.number,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          end: moment(),
          eventTypeId: 1,
          isHalfday: false,
          start: moment(),
        },
        formIsValid: true,
      };
    }

    componentDidMount = () => {
      const {
        booking: { start, end, eventType, halfDay },
      } = this.props;
      this.setState({
        formData: {
          start: start,
          end: end,
          eventTypeId: eventType.eventTypeId,
          isHalfday: halfDay || false,
        },
      });
    };

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
        this.props.toggleModal(false);
      });
    };

    handleUpdateHolidayRequest = (event, cancel) => {
      event.preventDefault();

      const { holidayId } = this.props.booking;
      const { updateTakenHolidays, toggleModal } = this.props;
      if (cancel) {
        rejectHoliday(holidayId)
          .then(() => {
            updateTakenHolidays();
            toggleModal(false);
          })
          .catch(error => {
            Swal({
              title: 'Sorry, not able to reject your holiday request.',
              text: error.message,
              type: 'error',
            });
            toggleModal(false);
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
            toggleModal(false);
          })
          .catch(error => {
            Swal({
              title: 'Sorry, not able to update your holiday request.',
              text: error.message,
              type: 'error',
            });
            toggleModal(false);
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

      const updatedFormData = {
        ...formData,
        eventType: {
          eventTypeId: formData.eventTypeId,
        },
      };
      this.props.updateEventDuration(updatedFormData);

      this.setState({
        formData,
        formIsValid,
      });
    }

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          isEventBeingUpdated={this.props.isEventBeingUpdated}
          bookingDuration={this.props.bookingDuration}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
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

const mapStateToProps = state => {
  return {
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: updatedBooking => dispatch(selectBooking(updatedBooking)),
    updateEventDuration: event => dispatch(updateEventDuration(event)),
    toggleModal: open => dispatch(toggleBookingModal(open)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), Container);
