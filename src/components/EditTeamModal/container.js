import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { updateTeam } from '../../services/teamService';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      closeModal: PT.func.isRequired,
    };

    handleFormSubmit = (original, data) => {
      updateTeam(original.clientId, original.teamId, data.teamName).then(() => {
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
