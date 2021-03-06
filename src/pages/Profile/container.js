import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../store/reducers';
import { getEvents } from '../../services/eventService';
import { getHolidayStats } from '../../services/holidayService';
import { isEmpty } from 'lodash';
import { getContractsByEmployeeId } from '../../services/contractService';
import eventTypes from '../../constants/eventTypes';
import swal from 'sweetalert2';
import { sortHolidaysByStatus } from '../../utilities/holidayOrdering';

const ProfileContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        holidays: null,
        selectedHoliday: {},
        contracts: [],
        holidaysLoading: false,
        contractsLoading: false,
        holidayStats: {},
        selectedTab: 'My Holidays',
      };
    }

    componentDidMount() {
      // Required in case the user navigates away from the page, then back.
      this.setState({ holidays: null, contracts: [], contractsLoading: true });
      this.getStats();
      this.getContracts();
    }

    componentDidUpdate(prevProps, prevState) {
      let selectedHolidayCleared = false;
      if (
        !isEmpty(prevState.selectedHoliday) &&
        isEmpty(this.state.selectedHoliday)
      ) {
        selectedHolidayCleared = true;
      }
      if (
        this.props.userDetails.forename !== null &&
        (this.state.holidays === null || selectedHolidayCleared) &&
        !this.state.holidaysLoading
      ) {
        this.getHolidays();
      }
    }

    getStats() {
      getHolidayStats(this.props.userDetails.employeeId)
        .then(response => {
          const stats = response.data;
          this.setState({ holidayStats: stats });
        })
        .catch(error => {
          swal(
            'Error',
            `Error getting holiday stats: ${error.message}`,
            'error'
          );
        });
    }

    getHolidays() {
      this.setState({ holidaysLoading: true });
      getEvents(this.props.userDetails.employeeId, eventTypes.ANNUAL_LEAVE)
        .then(({ data }) => {

          // add holidays in order of pending, approved, rejected, approved
          const holidays = sortHolidaysByStatus(data);

          this.setState({ holidays }, () => {
            this.setState({
              holidaysLoading: false,
            });
          });
        })
        .catch(error => {
          this.setState({ contractsLoading: false });
          swal('Error', `Error finding holidays: ${error.message}`, 'error');
        });
    }

    getContracts() {
      getContractsByEmployeeId(this.props.userDetails.employeeId)
        .then(response => {
          const contracts = response.status === 200 ? response.data : [];
          this.setState({ contracts, contractsLoading: false });
        })
        .catch(error => {
          this.setState({ contractsLoading: false });
          swal('Error', `Error finding contracts: ${error.message}`, 'error');
        });
    }

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    closeModal = () => {
      this.selectHoliday({});
    };

    updateSelectedTab = (selectedTab) => {
      this.setState({selectedTab});
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          selectedTab={this.state.selectedTab}
          updateSelectedTab={this.updateSelectedTab}
          userHolidays={this.state.holidays || []}
          selectHoliday={this.selectHoliday}
          selectedHoliday={this.state.selectedHoliday}
          closeModal={this.closeModal}
          contracts={this.state.contracts}
          holidayStats={this.state.holidayStats}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), ProfileContainer);
