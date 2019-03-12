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
        .then(({data: clients}) => {
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
        .then(({data}) => {
          const teams = data || [];
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
      const { clients, teams, selectedTeam } = this.state;
      return (
        <Wrapped
          navigateTo={this.props.history.push}
          clients={clients}
          teamSearch={this.teamSearch}
          teams={teams}
          selectedTeam={selectedTeam}
          selectTeam={this.selectTeam}
        />
      );
    }
  };
