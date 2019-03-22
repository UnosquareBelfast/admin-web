import initialState from './initialState';
import {
  FETCHING_TEAMS,
  FETCHING_TEAMS_SUCCESS,
  FETCHING_TEAMS_FAILURE,
  CREATING_NEW_TEAM,
  CREATING_NEW_TEAM_SUCCESS,
  CREATING_NEW_TEAM_FAILURE,
  UPDATE_SELECTED_TEAM,
} from '../actions/actionTypes';

// Reducer
export default function teamsReducer(state = initialState.teams, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [FETCHING_TEAMS]: state => ({
    ...state,
    isLoading: true, 
    teams: [], 
    hasError: false, 
    error: null,
  }),
  [FETCHING_TEAMS_SUCCESS]: (state, action) => ({
    ...state, 
    resultCount: action.resultCount,
    teams: action.teams, 
    isLoading: false, 
    hasError: false, 
    error: null, 
  }),
  [FETCHING_TEAMS_FAILURE]: (state, action) => ({
    ...state, 
    resultCount: action.resultCount,
    isLoading: false, 
    hasError: true, 
    error: action.error,
  }),
  [CREATING_NEW_TEAM]: state => ({
    ...state,
    isLoading: true,
    hasError: false,
    error: null,
  }),
  [CREATING_NEW_TEAM_SUCCESS]: (state, action) => ({
    ...state,
    resultCount: state.resultCount + 1,
    teams: state.teams.concat([action.team]),
    isLoading: false,
  }),
  [CREATING_NEW_TEAM_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    hasError: true,
    error: action.error,
  }),
  [UPDATE_SELECTED_TEAM]: (state, action) => ({
    ...state, 
    selectedTeamId: action.selectedTeamId,
  }),
};

// Private selectors
export const getTeamsLoading = ({isLoading, hasError, error, resultCount}) => {
  return {
    isLoading,
    hasError,
    error,
    resultCount,
  };
};
export const getAllTeams = store => store;
export const getTeamCount = store => store.resultCount;
export const getTeamsOptions = (store, clientId) => {
  let teams = store.teams;
  if (clientId !== -1) {
    teams = store.teams.filter(team => team.clientId === parseInt(clientId));
  }
  const teamOptions = teams.reduce((acc, team) => {
    acc.push({
      value: team.teamId,
      displayValue: team.teamName,
    });
    return acc;
  }, []);
  teamOptions.unshift({
    value: -1,
    displayValue: 'Please select a team',
  });
  return { teams, teamOptions };
};
export const getSelectedTeamId = store => store.selectedTeamId;
