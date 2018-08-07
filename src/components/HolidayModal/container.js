import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { isEmpty } from 'lodash';
import { approveHoliday, rejectHoliday } from '../../services/holidayService';
import swal from 'sweetalert2';
import holidayStatus from '../../utilities/holidayStatus';
import { Toast } from '../../utilities/Notifications';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      holiday: PT.object.isRequired,
      closeModal: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        holiday: {},
      };
    }

    componentWillUpdate(nextProps) {
      if (nextProps.holiday !== this.props.holiday) {
        this.setState({ holiday: nextProps.holiday });
      }
    }

    approveHoliday = () => {
      const holidayId = this.state.holiday.holidayId;

      approveHoliday(holidayId)
        .then(() => {
          this.setState({
            holiday: {
              ...this.state.holiday,
              eventStatus: {
                ...this.state.holiday.eventStatus,
                eventStatusId: holidayStatus.APPROVED,
              },
            },
          });
          Toast({
            type: 'success',
            title: 'Holiday Approved',
            position: 'top-end',
          });
        })
        .catch(error => {
          swal('Error', `There was an error: ${error.message}. 'error`);
        });
    };

    rejectHoliday = () => {
      const holidayId = this.state.holiday.holidayId;

      rejectHoliday(holidayId)
        .then(() => {
          this.setState({
            holiday: {
              ...this.state.holiday,
              eventStatus: {
                ...this.state.holiday.eventStatus,
                eventStatusId: holidayStatus.REJECTED,
              },
            },
          });
          Toast({
            type: 'success',
            title: 'Holiday Rejected',
            position: 'top-end',
          });
        })
        .catch(error => {
          swal('Error', `There was an error: ${error.message}. 'error`);
        });
    };

    render() {
      const { closeModal } = this.props;
      const { holiday } = this.state;
      if (isEmpty(holiday)) return null;
      return (
        <Wrapped
          holiday={holiday}
          closeModal={closeModal}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
        />
      );
    }
  };