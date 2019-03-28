import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateSelectedTeamId, fetchAllTeams } from '../../store/actions/teams';
import { updateSelectedClientId } from '../../store/actions/clients';
import { getClientOptions, getSelectedClientId, getTeamsOptions, getSelectedTeamId } from '../../store/reducers';

const ViewteamsContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      fetchAllTeams: PT.func,
      clientOptions: PT.array,
      updateSelectedTeamId: PT.func,
      updateSelectedClientId: PT.func,
      teams: PT.array,
      selectedTeam: PT.object,
      history: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedTeam: null,
      };
    }

    teamSearch = clientId => {
      this.props.updateSelectedClientId(clientId);
    };

    selectTeam = (updatedTeamId, clientToRefresh) => {
      this.props.updateSelectedTeamId(updatedTeamId);
      if (clientToRefresh) {
        this.props.fetchAllTeams();
      }
    };

    render() {
      const { clientOptions, teams, selectedTeam, history } = this.props;
      return (
        <Wrapped
          navigateTo={history.push}
          clientOptions={clientOptions}
          teamSearch={this.teamSearch}
          teams={teams}
          selectedTeam={selectedTeam}
          selectTeam={this.selectTeam}
        />
      );
    }
  };

const mapStateToProps = state => {

  const clientOptions = getClientOptions(state);
  const selectedClientId = getSelectedClientId(state);
  const { teams } = getTeamsOptions(state, selectedClientId);
  const selectedTeamId = getSelectedTeamId(state); 
  const selectedTeam = teams.find(({teamId}) => teamId === selectedTeamId);

  return {
    clientOptions,
    teams,
    selectedTeamId,
    selectedTeam,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTeams: () => dispatch(fetchAllTeams()),
    updateSelectedClientId: (selectedClientId) => dispatch(updateSelectedClientId(selectedClientId)),
    updateSelectedTeamId: (selectedClientId) => dispatch(updateSelectedTeamId(selectedClientId)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), ViewteamsContainer);
