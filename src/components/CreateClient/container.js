import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { postNewClient } from '../../store/actions/clients';

const CreateClientContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      postNewClient: PT.func.isRequired,
      history: PT.object,
      match: PT.object,
    };

    submitRequest = (data, resetForm) => {
      this.props.postNewClient(data, resetForm);
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
    postNewClient: (data, resetForm) =>
      dispatch(postNewClient(data, resetForm)),
  };
};

export default compose(connect(null, mapDispatchToProps), CreateClientContainer);
