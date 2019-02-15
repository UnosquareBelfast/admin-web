import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { updateClient } from '../../services/clientService';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      closeModal: PT.func.isRequired,
    };

    handleFormSubmit = (original, data) => {
      updateClient(original.clientId, data.clientName).then(() => {
        this.props.closeModal(null, original.clientId);
      });
    };

    render() {
      return (
        <Wrapped handleFormSubmit={this.handleFormSubmit} {...this.props} />
      );
    }
  };

export default Container;
