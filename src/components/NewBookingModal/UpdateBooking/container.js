import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  updateHoliday,
  getHolidayStats,
  cancelHoliday,
} from '../../../services/holidayService';
import { Toast } from '../../../utilities/Notifications';
import Swal from 'sweetalert2';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
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
        isHalfDay: data.halfDay,
        message: data.updateMessage,
      };

      updateHoliday(request)
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
      getHolidayStats().then(response => {
        this.setState({ holidayStats: response.data });
      });
    };

    cancelEvent = () => {
      const {
        selectedBooking: { eventId },
      } = this.props;
      const { refreshCalendar, toggleModal } = this.props;
      cancelHoliday(eventId)
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
      const { selectedBooking, toggleMessagingView } = this.props;
      const { holidayStats } = this.state;
      return (
        <Wrapped
          handleFormSubmit={this.handleFormSubmit}
          selectedBooking={selectedBooking}
          toggleMessagingView={toggleMessagingView}
          holidayStats={holidayStats}
          cancelEvent={this.cancelEvent}
        />
      );
    }
  };

export default Container;
