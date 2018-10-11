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
  getUser,
  getAllEvents,
} from '../../reducers';
import {
  updateHoliday,
  requestHoliday,
  rejectionResponse,
  cancelHoliday,
} from '../../services/holidayService';
import { requestWFH } from '../../services/wfhService';
import eventTypes from '../../utilities/eventTypes';
import HolidayStatus from '../../utilities/holidayStatus';
import { getTotalDaysInEventArrayWithStatus } from '../../utilities/dates';
import { checkSameDate } from '../../utilities/dashboardEvents';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      updateTakenEvents: PT.func,
      isEventBeingUpdated: PT.bool,
      booking: PT.object,
      userDetails: PT.object.isRequired,
      bookingModalOpen: PT.bool,
      toggleBookingModal: PT.func,
      bookingDuration: PT.number,
      allEvents: PT.array.isRequired,
    };

    constructor(props) {
      super(props);
      this.dateFormat = 'YYYY-MM-DD';

      this.state = {
        toggleRejectionResponseView: false,
        rejectionResponseText: '',
        toggleRejectionMessageView: false,
        loading: false,
        formData: {},
      };
    }

    closeBookingModal = () => {
      this.setState({
        rejectionResponseText: '',
        toggleRejectionResponseView: false,
        toggleRejectionMessageView: false,
      });
      this.props.toggleBookingModal(false);
    };

    createEvent = (event, formData) => {
      event.preventDefault();
      const { employeeId, updateTakenEvents, toggleBookingModal } = this.props;
      const { start, end, isHalfday } = formData;
      const eventTypeId = parseInt(formData.eventTypeId);

      const endpoints = {
        [eventTypes.ANNUAL_LEAVE]: requestHoliday,
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
          updateTakenEvents();
          toggleBookingModal(false);
        })
        .catch(error => Swal('Error', error.message, 'error'));
    };

    toggleRejectionMessageInputView = toggle => {
      this.setState({ toggleRejectionResponseView: toggle });
    };

    toggleLegacyHolidayMessageView = () => {
      this.setState({ toggleRejectionMessageView: !this.state.toggleRejectionMessageView });
    }

    updateEvent = (event, formData) => {
      this.setState({ loading: true });
      event.preventDefault();
      const { start, end, isHalfday, employeeRejectionMessage, updateMessage } = formData;
      const eventTypeId = parseInt(formData.eventTypeId);
      const {
        updateTakenEvents,
        toggleBookingModal,
        booking: { eventId },
      } = this.props;
      const request = {
        endDate: end.format(this.dateFormat),
        halfDay: isHalfday,
        eventId: eventId,
        startDate: start.format(this.dateFormat),
        message: employeeRejectionMessage ? employeeRejectionMessage : updateMessage,
      };

      if (eventTypeId) {
        updateHoliday(request)
          .then(() => {
            updateTakenEvents();
            toggleBookingModal(false);
            this.setState({ loading: false });
          })
          .catch(error => {
            Swal({
              title: 'Error',
              text: error.message,
              type: 'error',
            });
            toggleBookingModal(false);
            this.setState({ loading: false });
          });
      }
    };
    assignRejectionResponseText = e => {
      this.setState({ rejectionResponseText: e.target.value });
    };

    submitRejectionResponse = () => {
      const rejectionResponseMessage = this.state.rejectionResponseText;
      const {
        booking: { eventId },
      } = this.props;

      rejectionResponse(eventId, rejectionResponseMessage)
        .then(() => this.closeBookingModal())
        .catch(error => {
          Swal({
            title: 'Error',
            text: error.message,
            type: 'error',
          });
        });
    };

    cancelEvent = () => {
      const {
        updateTakenEvents,
        toggleBookingModal,
        booking: { eventId },
      } = this.props;

      cancelHoliday(eventId)
        .then(() => {
          updateTakenEvents();
          this.setState({ toggleRejectionResponseView: false });
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

    getApprovedDays = () => {
      return getTotalDaysInEventArrayWithStatus(
        this.props.allEvents,
        HolidayStatus.APPROVED
      );
    };

    getPendingDays = () => {
      return getTotalDaysInEventArrayWithStatus(
        this.props.allEvents,
        HolidayStatus.PENDING
      );
    };

    onFormUpdate = formData => {
      this.setState({formData});
    }

    render() {
      const { toggleRejectionMessageView, toggleRejectionResponseView, loading } = this.state;
      const { booking: { start } } = this.props;
      return (
        this.props.employeeId && (
          <Wrapped
            workingFromHomeBooking={checkSameDate(start)}
            formData={this.state.formData}
            userDetails={this.props.userDetails}
            pendingDays={this.getPendingDays()}
            approvedDays={this.getApprovedDays()}
            legacyHolidayMessagelist={this.legacyHolidayMessagelist}
            submitRejectionResponse={this.submitRejectionResponse}
            toggleRejectionMessageView={toggleRejectionMessageView}
            rejectionResponseText={this.state.rejectionResponseText}
            assignRejectionResponseText={this.assignRejectionResponseText}
            booking={this.props.booking}
            toggleLegacyHolidayMessageView={this.toggleLegacyHolidayMessageView}
            toggleRejectionResponseView={toggleRejectionResponseView}
            toggleRejectionMessageInputView={this.toggleRejectionMessageInputView}
            employeeId={this.props.employeeId}
            bookingModalOpen={this.props.bookingModalOpen}
            closeBookingModal={this.closeBookingModal}
            updateTakenEvents={this.props.updateTakenEvents}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            bookingDuration={this.props.bookingDuration}
            createEvent={this.createEvent}
            updateEvent={this.updateEvent}
            cancelEvent={this.cancelEvent}
            loading={loading}
            onFormUpdate={this.onFormUpdate}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
    allEvents: getAllEvents(state),
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