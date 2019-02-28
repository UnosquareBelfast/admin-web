import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { createClient } from '../../services/clientService';
import { Toast } from '../../config/Notifications';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      history: PT.object,
      match: PT.object,
    };
    constructor(props) {
      super(props);
      this.state = {
        success: null,
        error: null,
      };
    }

    submitRequest = data => {
      createClient(data)
        .then(() =>
          Toast({ type: 'success', title: 'Client created sucessfully!' })
        )
        .catch(error =>
          swal('Error', `Error creating client:${error.message}`, 'error')
        );
    };

    clientsFailedToCreated = error => {
      this.setState({ error });
    };

    render() {
      const { params } = this.props.match;
      let clientId = 0;
      if (Object.keys(params).length > 0 && params.constructor === Object) {
        clientId = params.clientId;
      }

      return (
        <Wrapped
          history={this.props.history}
          goToAllClients={this.goToAllClients}
          clientId={parseInt(clientId)}
          success={this.state.success}
          error={this.state.error}
          submitRequest={this.submitRequest}
        />
      );
    }
  };
