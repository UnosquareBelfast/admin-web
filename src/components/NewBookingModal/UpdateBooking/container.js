import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { updateHoliday } from '../../../services/holidayService';
import { Toast } from '../../utilities/Notifications';

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
      this.state = {};
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

    render() {
      const { selectedBooking, toggleMessagingView } = this.props;
      return (
        <Wrapped
          handleFormSubmit={this.handleFormSubmit}
          selectedBooking={selectedBooking}
          toggleMessagingView={toggleMessagingView}
        />
      );
    }
  };

export default Container;
