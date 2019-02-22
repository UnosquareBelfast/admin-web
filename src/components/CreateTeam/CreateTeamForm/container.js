import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllClients } from '../../../services/clientService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onSuccess: PT.func,
      teamSubmitted: PT.bool,
      resetTeamSubmitted: PT.func,
    };

    constructor(props) {
      super(props);
      this.state = {
        clients: [],
      };
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
      const teamSubmittedhasChanged = nextProps.teamSubmitted !== this.props.teamSubmitted;
      const clientListhasChanged = nextState.clients.length !== this.state.clients.length;
      return teamSubmittedhasChanged || clientListhasChanged;
    }

    handleFormSubmit = data => {
      this.props.onSuccess(data);
    };

    render() {
      return (
        <Wrapped
          clients={this.state.clients}
          handleFormSubmit={data => this.handleFormSubmit(data)}
          teamSubmitted={this.props.teamSubmitted}
          resetTeamSubmitted={this.props.resetTeamSubmitted}
        />
      );
    }
  };
