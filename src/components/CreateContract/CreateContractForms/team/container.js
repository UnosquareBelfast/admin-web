import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllClients } from '../../../../services/clientService';
import { getTeamsFromClient } from '../../../../services/teamService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onSuccess: PT.func,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          selectedClient: -1,
          selectedTeam: -1,
        },
        clients: [],
        teams: [],
      };
    }

    componentDidMount() {
      this.getClients();
    }

    getClients = () => {
      getAllClients().then(response => {
        const clients = response.data;
        const clientsFormatted = clients.reduce((acc, client) => {
          acc.push({
            value: client.clientId,
            displayValue: client.clientName,
          });
          return acc;
        }, []);
        clientsFormatted.unshift({
          value: '-1',
          displayValue: 'Please select a client',
        });
        this.setState({
          formData: {
            ...this.state.formData,
            selectedClient: clientsFormatted[0].value,
          },
          clients: clientsFormatted,
        });
      });
    };

    handleTeamSectionSubmit = ({selectedClientId, selectedTeamId}) => {

      let selectedClient = this.state.clients.filter(
        user => user.value == selectedClientId
      );
      selectedClient = selectedClient[0];

      let selectedTeam = this.state.teams.filter(
        user => user.value == selectedTeamId
      );
      selectedTeam = selectedTeam[0];

      const data = { selectedTeam, selectedClient };

      return this.props.onSuccess(data);
    };

    handleTeamSearch = selectedClientId => {

      getTeamsFromClient(selectedClientId)
        .then(response => {
          const teams = response.data;
          const teamsFormatted = teams.reduce((acc, team) => {
            acc.push({
              value: team.teamId,
              displayValue: team.teamName,
            });
            return acc;
          }, []);
          teamsFormatted.unshift({
            value: '-1',
            displayValue: 'Please select a team',
          });
          this.setState({
            formData: {
              ...this.state.formData,
              selectedTeam: teamsFormatted[0].value,
            },
            teams: teamsFormatted,
            error: false,
          });
        })
        .catch(() => {
          this.setState({
            error: true,
          });
        });
    };

    handleTeamFormReset = resetForm => {
      event.preventDefault();
      this.setState({
        teams: [],
      }, () => {
        resetForm();
      });
    };

    render() {
      return (
        <Wrapped
          teams={this.state.teams}
          clients={this.state.clients}
          handleTeamSectionSubmit={this.handleTeamSectionSubmit}
          searchTeam={this.handleTeamSearch}
          handleFormReset={this.handleTeamFormReset}
        />
      );
    }
  };
