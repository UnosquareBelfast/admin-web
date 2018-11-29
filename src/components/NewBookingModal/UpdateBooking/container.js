import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateHoliday } from '../../../services/holidayService';
import { getUserId } from '../../../reducers';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      selectedBooking: PT.object.isRequired,
      refreshCalendar: PT.func.isRequired,
      userId: PT.number.isRequired,
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
        startDate: data.startDate.format(dateFormat),
        endDate: data.endDate.format(dateFormat),
        halfDay: data.halfDay,
        eventId,
        message: '',
      };

      updateHoliday(request)
        .then(() => {
          refreshCalendar();
          toggleModal(false);
        })
        .catch(error => {
          console.log('oops', error);
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

const mapStateToProps = state => {
  return {
    userId: getUserId(state),
  };
};

export default compose(connect(mapStateToProps), Container);
