import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getTeamsFromClient } from '../../services/teamService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      history: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        teams: [],
        selectedTeam: null,
      };
    }

    teamSearch = clientId => {
      getTeamsFromClient(clientId)
        .then(response => {
          const teams = response.data || [];
          this.setState({ teams });
        })
        .catch(error =>
          swal('Error', `Could not get teams: ${error.message}`, 'error')
        );
    };

    selectTeam = (selectedTeam, clientToRefresh) => {
      this.setState({ selectedTeam });
      if (clientToRefresh) {
        this.teamSearch(clientToRefresh);
      }
    };

    render() {
      return (
        <Wrapped
          history={this.props.history}
          teamSearch={this.teamSearch}
          teams={this.state.teams}
          selectedTeam={this.state.selectedTeam}
          selectTeam={this.selectTeam}
        />
      );
    }
  };
