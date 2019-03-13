import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { updateEvent, cancelEvent } from '../../../services/eventService';
import { getHolidayStats } from '../../../services/holidayService';
import { Toast } from '../../../config/Notifications';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserId } from '../../../store/reducers';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      eventTypes: PT.array.isRequired,
      userId: PT.number.isRequired,
      selectedBooking: PT.object.isRequired,
      refreshCalendar: PT.func.isRequired,
      toggleModal: PT.func.isRequired,
      toggleMessagingView: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        holidayStats: {
          availableHolidays: 0,
          pendingHolidays: 0,
          approvedHolidays: 0,
          totalHolidays: 0,
        },
      };
    }

    componentDidMount() {
      this.fetchHolidayStats();
    }

    handleFormSubmit = data => {
      const {
        selectedBooking: { eventId },
      } = this.props;
      const dateFormat = 'YYYY-MM-DD';
      const { refreshCalendar, toggleModal } = this.props;

      const request = {
        eventId,
        startDate: data.startDate.format(dateFormat),
        endDate: data.endDate.format(dateFormat),
        isHalfDay: data.isHalfDay,
        message: data.updateMessage,
      };

      updateEvent(request)
        .then(() => {
          refreshCalendar();
          toggleModal(false);
        })
        .catch(() => {
          Toast({
            type: 'error',
            title: 'Error updating holiday',
          });
        });
    };

    fetchHolidayStats = () => {
      const { userId } = this.props;
      getHolidayStats(userId).then(response => {
        this.setState({ holidayStats: response.data });
      });
    };

    cancelEvent = () => {
      const {
        selectedBooking: { eventId },
      } = this.props;
      const { refreshCalendar, toggleModal } = this.props;
      cancelEvent(eventId)
        .then(() => {
          refreshCalendar();
          toggleModal(false);
        })
        .catch(error =>
          Swal({
            title: 'Could not cancel holiday',
            text: error.message,
            type: 'error',
          })
        );
    };

    render() {
      const { selectedBooking, toggleMessagingView, eventTypes } = this.props;
      const { holidayStats } = this.state;
      return (
        <Wrapped
          eventTypes={eventTypes}
          handleFormSubmit={this.handleFormSubmit}
          selectedBooking={selectedBooking}
          toggleMessagingView={toggleMessagingView}
          holidayStats={holidayStats}
          cancelEvent={this.cancelEvent}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userId: getUserId(state),
  };
};

export default compose(connect(mapStateToProps), Container);
