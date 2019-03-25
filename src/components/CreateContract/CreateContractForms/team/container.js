import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { updateSelectedTeamId } from '../../../../store/actions/teams';
import { updateSelectedClientId } from '../../../../store/actions/clients';
import { getClientOptions, getSelectedClientId, getTeamsOptions } from '../../../../store/reducers';


const ContractTeamFormContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      updateSelectedClientId: PT.func,
      updateSelectedTeamId: PT.func,
      clientOptions: PT.array,
      teamOptions: PT.array,
      onSuccess: PT.func,
    };

    constructor(props) {
      super(props);
      this.state = {
        teamResults: '',
      };
    }

    handleTeamSectionSubmit = ({ selectedClientId, selectedTeamId }) => {

      let selectedClient = this.props.clientOptions.find(
        user => user.value == selectedClientId
      );

      let selectedTeam = this.props.teamOptions.find(
        user => user.value == selectedTeamId
      );

      const data = { selectedTeam, selectedClient };

      return this.props.onSuccess(data);
    };

    handleTeamSearch = clientId => {
      this.props.updateSelectedClientId(clientId);
    };

    handleTeamFormReset = resetForm => {
      event.preventDefault();
      const { updateSelectedTeamId, updateSelectedClientId } = this.props;
      this.setState({
        teamResults: '',
      }, () => {
        updateSelectedTeamId(-1);
        updateSelectedClientId(-1);
        resetForm();
      });
    };

    render() {
      const { 
        teamOptions, 
        clientOptions,
      } = this.props;
      return (
        <Wrapped
          teamOptions={teamOptions}
          teamResults={this.state.teamResults}
          clientOptions={clientOptions}
          handleTeamSectionSubmit={this.handleTeamSectionSubmit}
          searchTeam={this.handleTeamSearch}
          handleFormReset={this.handleTeamFormReset}
        />
      );
    }
  };

const mapStateToProps = state => {
  const clientOptions = getClientOptions(state);
  const selectedClientId = getSelectedClientId(state);
  let teamOptions = [];
  if (selectedClientId !== -1) {
    const teams = getTeamsOptions(state, selectedClientId);
    teamOptions = teams.teamOptions;
  }
  return {
    clientOptions,
    selectedClientId,
    teamOptions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedClientId: (selectedClientId) =>
      dispatch(updateSelectedClientId(selectedClientId)),
    updateSelectedTeamId: (selectedClientId) =>
      dispatch(updateSelectedTeamId(selectedClientId)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), ContractTeamFormContainer);
