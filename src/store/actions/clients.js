import { Toast } from '../../config/Notifications';
import * as actionTypes from './actionTypes';

import { getAllClients, createClient } from '../../services/clientService';

const _fetchAllClients = () => {
  return {
    type: actionTypes.FETCHING_CLIENTS,
  };
};

const _fetchAllClientsFailed = error => {
  return {
    type: actionTypes.FETCHING_CLIENTS_FAILURE,
    error,
    resultCount: 0,
  };
};

const _receiveAllClients = (clients, count) => {
  return {
    type: actionTypes.FETCHING_CLIENTS_SUCCESS,
    clients,
    resultCount: count,
  };
};

const _postNewClient = () => {
  return {
    type: actionTypes.CREATING_NEW_CLIENT,
  };
};

const _postNewClientFailed = error => {
  return {
    type: actionTypes.CREATING_NEW_CLIENT_FAILURE,
    error,
  };
};

const _postNewClientSuccess = client => {
  return {
    type: actionTypes.CREATING_NEW_CLIENT_SUCCESS,
    client,
  };
};

export const updateSelectedClientId = selectedClientId => {
  return {
    type: actionTypes.UPDATE_SELECTED_CLIENT,
    selectedClientId,
  };
};

// Thunks

export const fetchAllClients = () => dispatch => {
  dispatch(_fetchAllClients());

  getAllClients()
    .then(({ data: clients }) => {
      dispatch(_receiveAllClients(clients, clients.length));
    })
    .catch(error => {
      dispatch(_fetchAllClientsFailed(error));
    });
};

export const postNewClient = (data, resetForm) => dispatch => {
  dispatch(_postNewClient());
  createClient(data)
    .then(({data: newClient}) => {
      resetForm();
      Toast({
        type: 'success',
        title: `${newClient.clientName} created sucessfully! 👍`,
      });
      dispatch(_postNewClientSuccess(newClient));
    })
    .catch(error => {
      dispatch(_postNewClientFailed(error));
    });
};
