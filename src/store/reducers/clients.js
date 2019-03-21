
import initialState from './initialState';

import {
  FETCHING_CLIENTS,
  FETCHING_CLIENTS_SUCCESS,
  FETCHING_CLIENTS_FAILURE,
  CREATING_NEW_CLIENT,
  CREATING_NEW_CLIENT_SUCCESS,
  CREATING_NEW_CLIENT_FAILURE,
  UPDATE_SELECTED_CLIENT,
} from '../actions/actionTypes';

// Reducer
export default function clientsReducer(state = initialState.clients, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [FETCHING_CLIENTS]: state => ({
    ...state,
    isLoading: true,
    clients: [],
    hasError: false,
    error: null,
  }),
  [FETCHING_CLIENTS_SUCCESS]: (state, action) => ({
    ...state,
    resultCount: action.resultCount,
    clients: action.clients,
    isLoading: false,
    hasError: false,
    error: null,
  }),
  [FETCHING_CLIENTS_FAILURE]: (state, action) => ({
    ...state,
    resultCount: action.resultCount,
    isLoading: false,
    hasError: true,
    error: action.error,
  }),
  [CREATING_NEW_CLIENT]: state => ({
    ...state,
    isLoading: true,
    hasError: false,
    error: null,
  }),
  [CREATING_NEW_CLIENT_SUCCESS]: (state, action) => ({
    ...state,
    resultCount: state.resultCount + 1,
    clients: state.clients.concat([action.client]),
    isLoading: false,
  }),
  [CREATING_NEW_CLIENT_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    hasError: true,
    error: action.error,
  }),
  [UPDATE_SELECTED_CLIENT]: (state, action) => ({
    ...state,
    selectedClientId: action.selectedClientId,
  }),
};

// Private selectors
export const getClientsLoading = ({ isLoading, hasError, error, resultCount }) => {
  return {
    isLoading,
    hasError,
    error,
    resultCount,
  };
};
export const getAllClients = store => store.clients;
export const getClientCount = store => store.resultCount;
export const getSelectedClientId = store => store.selectedClientId;
export const getClientsLoadingStatus = store => store.isLoading;
export const getClientOptions = store => {
  const clientOptions = store.clients
    .reduce((acc, client) => {
      acc.push({
        value: client.clientId,
        displayValue: client.clientName,
      });
      return acc;
    }, []);
  clientOptions.unshift({
    value: -1,
    displayValue: 'Please select a client',
  });
  return clientOptions;
};

