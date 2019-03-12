import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../store/reducers';
import { getHolidayStats } from '../../services/holidayService';
import swal from 'sweetalert2';
import { isEmpty } from 'lodash';
import roles from '../../constants/roles';
import { getTotalDaysInEventArrayWithStatus } from '../../utilities/dates';
import HolidayStatus from '../../constants/holidayStatus';

const UserModalContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      user: PT.object,
      closeModal: PT.func,
      history: PT.object,
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        userDetails: null,
        userHolidays: [],
        totalHolidays: 0,
      };
      this.hasPermission = props.userDetails.employeeRoleId !== roles.STANDARD;
    }

    componentDidMount() {
      const { user } = this.props;
      if (isEmpty(user)) return null;

      getHolidayStats(user.employeeId)
        .then(({ data }) => {
          this.setState(data);
        })
        .catch(error => {
          swal(
            'Error',
            `Error getting user holiday details: ${error.message}`,
            'error'
          );
        });
    }

    getTotalPendingDays = () => {
      return getTotalDaysInEventArrayWithStatus(
        this.state.userHolidays,
        HolidayStatus.PENDING
      );
    };

    getTotalApprovedDays = () => {
      return getTotalDaysInEventArrayWithStatus(
        this.state.userHolidays,
        HolidayStatus.APPROVED
      );
    };

    render() {
      const { closeModal, userDetails, user, history } = this.props;
      const {
        approvedHolidays,
        pendingHolidays,
        availableHolidays,
      } = this.state;
      if (isEmpty(user)) return null;

      return (
        <Wrapped
          userDetails={userDetails}
          closeModal={closeModal}
          user={user}
          hasPermission={this.hasPermission}
          history={history}
          approvedDays={approvedHolidays}
          pendingDays={pendingHolidays}
          availableDays={availableHolidays}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), UserModalContainer);
