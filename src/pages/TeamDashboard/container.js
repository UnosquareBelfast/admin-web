import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { getHolidaysByStatus } from '../../services/holidayService';
import holidayStatus from '../../utilities/holidayStatus';
import { getAllUsers } from '../../services/userService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        team: [],
        teamHolidays: [],
        selectedUser: null,
        userModalVisible: false,
        selectedHoliday: {},
      };
    }

    componentDidMount() {
      this.getHolidays();
      this.getTeam();
    }

    getHolidays = () => {
      getHolidaysByStatus(holidayStatus.PENDING).then(response => {
        this.setState({ teamHolidays: response.data });
      });
    };

    getTeam = () => {
      getAllUsers().then(response => {
        this.setState({ team: response.data });
      });
    };

    handleUserSelection = user => {
      this.setState({ selectedUser: user, userModalVisible: true });
    };

    handleHideUserModal = () => {
      this.setState({ userModalVisible: false });
    };

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    handleHideHolidayModal = () => {
      this.selectHoliday({});
      this.getHolidays();
    };

    render() {
      return (
        <Wrapped
          history={this.props.history}
          teamHolidays={this.state.teamHolidays}
          team={this.state.team}
          onUserSelect={this.handleUserSelection}
          selectedUser={this.state.selectedUser}
          userModalVisible={this.state.userModalVisible}
          hideUserModal={this.handleHideUserModal}
          hideHolidayModal={this.handleHideHolidayModal}
          selectHoliday={this.selectHoliday}
          selectedHoliday={this.state.selectedHoliday}
        />
      );
    }
  };
