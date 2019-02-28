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

    submitRequest = (data, resetForm) => {
      createClient(data)
        .then(() => {
          resetForm();
          Toast({ 
            type: 'success', 
            title: `${data.clientName} created sucessfully! 👍`, 
          });
        })
        .catch(error =>
          swal('Error', `Error creating ${data.clientName}:${error.message}`, 'error')
        );
    };

    render() {

      return (
        <Wrapped
          navigateTo={this.props.history.push}
          submitRequest={this.submitRequest}
        />
      );
    }
  };
