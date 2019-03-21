import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchAllClients } from '../../store/actions/clients';
import { fetchAllTeams } from '../../store/actions/teams';
import { fetchAllEmployees } from '../../store/actions/employees';
import { getClientsLoading, getTeamsLoading, getEmployeesLoading } from '../../store/reducers';

const AdminDashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      clientsLoading: PT.object,
      teamsLoading: PT.object,
      employeesLoading: PT.object,
      fetchAllClients: PT.func.isRequired,
      fetchAllTeams: PT.func.isRequired,
      fetchAllEmployees: PT.func.isRequired,
    };

    componentDidMount() {
      this.getDashBoardInformation();
    }
    
    getDashBoardInformation = async () => {
      await this.props.fetchAllEmployees();
      await this.props.fetchAllTeams();
      await this.props.fetchAllClients();
    }

    render() {
      return (
        <Wrapped 
          clients={this.props.clientsLoading} 
          teams={this.props.teamsLoading} 
          employees={this.props.employeesLoading} 
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    clientsLoading: getClientsLoading(state),
    teamsLoading: getTeamsLoading(state),
    employeesLoading: getEmployeesLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllClients: () =>
      dispatch(fetchAllClients()),
    fetchAllTeams: () =>
      dispatch(fetchAllTeams()),
    fetchAllEmployees: () =>
      dispatch(fetchAllEmployees()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), AdminDashboardContainer);
