import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { createTeam } from '../../services/teamService';
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
      return (
        <Wrapped 
          navigateTo={this.props.history.replace} 
          submitRequest={this.submitRequest} 
          teamSubmitted={this.state.teamSubmitted}
          resetTeamSubmitted={this.resetTeamSubmitted}
        />
      );
    }
  };
