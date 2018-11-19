import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { requestHoliday } from '../../../services/holidayService';
import { requestWFH } from '../../../services/wfhService';
import eventTypes from '../../../utilities/eventTypes';
import { getUserId } from '../../../reducers';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      start: PT.object.isRequired,
      end: PT.object.isRequired,
      userId: PT.number.isRequired,
      refreshCalendar: PT.func.isRequired,
      toggleModal: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    handleFormSubmit = data => {
      console.log(data);

      const dateFormat = 'YYYY-MM-DD';
      const { userId, refreshCalendar, toggleModal } = this.props;

      // if (parseInt(data.bookingType) === eventTypes.ANNUAL_LEAVE) {
      console.log('attempting holiday booking', data);

      const endpoint = {
        [eventTypes.ANNUAL_LEAVE]: requestHoliday,
        [eventTypes.WFH]: requestWFH,
      };

      const request = {
        dates: [
          {
            startDate: data.startDate.format(dateFormat),
            endDate: data.endDate.format(dateFormat),
            halfDay: data.halfDay,
          },
        ],
        employeeId: userId,
      };
      console.log('+++REQUEST', request);
      endpoint[data.bookingType](request).then(() => {
        refreshCalendar();
        toggleModal(false);
      }).catch(error => {
        console.log('oops', error);
      });
      // }
    };

    render() {
      const { start, end } = this.props;
      return (
        <Wrapped
          handleFormSubmit={this.handleFormSubmit}
          start={start}
          end={end}
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
