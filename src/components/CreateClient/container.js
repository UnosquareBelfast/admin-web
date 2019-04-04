import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { Toast } from '../../config/Notifications';
import { postNewClient } from '../../store/actions/clients';

const CreateClientContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      postNewClient: PT.func.isRequired,
      history: PT.object,
      match: PT.object,
    };

    onSuccess = (clientName, resetForm) => {
      resetForm();
      Toast({
        type: 'success',
        title: `${clientName} created sucessfully! 👍`,
      });
    }

    submitRequest = (data, resetForm) => {
      this.props.postNewClient(data, () => this.onSuccess(data.clientName, resetForm));
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

const mapDispatchToProps = dispatch => {
  return {
    postNewClient: (data, onSuccess) =>
      dispatch(postNewClient(data, onSuccess)),
  };
};

export default compose(connect(null, mapDispatchToProps), CreateClientContainer);
