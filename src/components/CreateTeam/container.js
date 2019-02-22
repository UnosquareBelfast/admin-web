import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { createTeam } from '../../services/teamService';
import { getAllClients } from '../../services/clientService';
import swal from 'sweetalert2';
import { Toast } from '../../config/Notifications';

export default Wrapped =>
  class extends Component {

    static propTypes = {
      history: PT.shape({
        replace: PT.func.isRequired,
      }),
    }

    state = {
      teamSubmitted: false,
      clients: [],
    }

    componentDidMount() {

      getAllClients()
        .then(response => {
          const clients = response.data;
          const formattedClients = clients.reduce((acc, client) => {
            acc.push({
              value: client.clientId,
              displayValue: client.clientName,
            });
            return acc;
          }, []);
          formattedClients.unshift({
            value: -1,
            displayValue: 'Please select a client',
          });
          this.setState({ clients: formattedClients });
        })
        .catch(error =>
          swal(
            'Error',
            `Could not retreive clients: ${error.message}`,
            'error',
          ),
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
      const teamSubmittedhasChanged = nextState.teamSubmitted !== this.state.teamSubmitted;
      const clientListhasChanged = nextState.clients.length !== this.state.clients.length;
      return teamSubmittedhasChanged || clientListhasChanged;
    }

    submitRequest = data => {
      const request = {
        clientId: data.selectedClient,
        teamName: data.teamName,
      };
      createTeam(request)
        .then(() => {
          this.setState({
            teamSubmitted: true,
          }, () => {
            Toast({
              type: 'success',
              title: 'Team created successfully! 👍',
            });
          });
        })
        .catch(error => {
          swal('Error', `Error creating team: ${error.message}`, 'error');
        });
    };

    resetTeamSubmitted = () => {
      this.setState({
        teamSubmitted: false,
      });
    };

    render() {

      const { clients, teamSubmitted } = this.state;
      const { history: { replace } } = this.props;

      return (
        <Wrapped 
          clients={clients}
          teamSubmitted={teamSubmitted}
          navigateTo={replace} 
          submitRequest={this.submitRequest} 
          resetTeamSubmitted={this.resetTeamSubmitted}
        />
      );
    }
  };
