import axios from '../utilities/AxiosInstance';

export const getTeamsFromClient = clientId => {
  return axios.get(`/Team/getByClientId/${clientId}`);
};

export const createTeam = data => {
  return axios.post('/Team/', data);
};

export const updateTeam = (clientId, teamId, teamName) => {
  return axios.put('/Team/', {
    clientId,
    teamId,
    teamName,
  });
};
