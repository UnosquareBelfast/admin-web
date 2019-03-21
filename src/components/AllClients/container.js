import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { updateSelectedClientId, fetchAllClients } from '../../store/actions/clients';
import { getAllClients, getSelectedClientId, getClientsLoadingStatus } from '../../store/reducers';

const AllClientsContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      fetchAllClients: PT.func,
      isUpdating: PT.bool,
      selectedClientId: PT.oneOfType([
        PT.string,
        PT.number,
      ]),
      updateSelectedClientId: PT.func,
      clients: PT.array,
    };

    selectClientHandler = (updatedClientID, shouldRefresh) => {
      this.props.updateSelectedClientId(updatedClientID);
      if (shouldRefresh) {
        this.props.fetchAllClients();
      }
    };

    render() {

      const { clients, isUpdating, selectedClientId } = this.props;
      let selectedClient = clients.filter(({clientId}) => clientId === selectedClientId)[0];
    
      return (
        <Wrapped
          {...this.props}
          clients={clients}
          isUpdating={isUpdating}
          selectedClient={selectedClient}
          selectClient={this.selectClientHandler}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    clients: getAllClients(state),
    isUpdating: getClientsLoadingStatus(state),
    selectedClientId: getSelectedClientId(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllClients: () =>
      dispatch(fetchAllClients()),
    updateSelectedClientId: selectedClient =>
      dispatch(updateSelectedClientId(selectedClient)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), AllClientsContainer);
