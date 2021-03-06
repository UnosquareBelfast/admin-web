import * as actionTypes from './actionTypes';

import { getTeams, createTeam } from '../../services/teamService';

const _fetchAllTeams = () => {
  return {
    type: actionTypes.FETCHING_TEAMS,
  };
};

const _fetchAllTeamsFailed = error => {
  return {
    type: actionTypes.FETCHING_TEAMS_FAILURE,
    error,
    resultCount: 0,
  };
};

const _fetchAllTeamsSuccess = (teams, count) => {
  return {
    type: actionTypes.FETCHING_TEAMS_SUCCESS,
    teams,
    resultCount: count,
  };
};

const _postNewTeam = () => {
  return {
    type: actionTypes.CREATING_NEW_TEAM,
  };
};

const _postNewTeamFailed = error => {
  return {
    type: actionTypes.CREATING_NEW_TEAM_FAILURE,
    error,
  };
};

const _postNewTeamSuccess = team => {
  return {
    type: actionTypes.CREATING_NEW_TEAM_SUCCESS,
    team,
  };
};

export const updateSelectedTeamId = selectedTeamId => {
  return {
    type: actionTypes.UPDATE_SELECTED_TEAM,
    selectedTeamId,
  };
};

// Thunks

export const fetchAllTeams = () => dispatch => {
  dispatch(_fetchAllTeams());
  getTeams()
    .then(({ data: teams }) => {
      dispatch(_fetchAllTeamsSuccess(teams, teams.length));
    })
    .catch(error => {
      dispatch(_fetchAllTeamsFailed(error));
    });
};

export const postNewTeam = (data, onSuccess) => dispatch => {
  dispatch(_postNewTeam());
  createTeam(data)
    .then(({data: newTeam}) => {
      onSuccess();
      dispatch(_postNewTeamSuccess(newTeam));
    })
    .catch(error => {
      dispatch(_postNewTeamFailed(error));
    });
};
