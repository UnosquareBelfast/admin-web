import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getTeamsFromClient } from '../../services/teamService';
import { getAllClients } from '../../services/clientService';

import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      history: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        clients: [],
        teams: [],
        selectedTeam: null,
      };
    }

    componentDidMount() {

      getAllClients()
        .then(response => {
          const clients = response.data;
          if (clients.length > 0) {
            const formattedClients = clients.reduce((acc, client) => {
              acc.push({
                value: client.clientId,
                displayValue: client.clientName,
              });
              return acc;
            }, []);
            formattedClients.unshift({
              value: '-1',
              displayValue: 'Please select a client',
            });
            this.setState(
              {
                clients: formattedClients,
              });
          }
        })
        .catch(error =>
          swal('Error', `Could not retreive clients: ${error.message}`, 'error')
        );
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
          navigateTo={this.props.history.push}
          clients={this.state.clients}
          teamSearch={this.teamSearch}
          teams={this.state.teams}
          selectedTeam={this.state.selectedTeam}
          selectTeam={this.selectTeam}
        />
      );
    }
  };
