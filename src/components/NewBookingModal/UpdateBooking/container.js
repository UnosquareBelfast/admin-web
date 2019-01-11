import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  updateHoliday,
  getHolidayStats,
} from '../../../services/holidayService';
import { Toast } from '../../../utilities/Notifications';

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

    render() {
      const { selectedBooking, toggleMessagingView } = this.props;
      const { holidayStats } = this.state;
      return (
        <Wrapped
          handleFormSubmit={this.handleFormSubmit}
          selectedBooking={selectedBooking}
          toggleMessagingView={toggleMessagingView}
          holidayStats={holidayStats}
        />
      );
    }
  };

export default Container;
