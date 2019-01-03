import axios from '../utilities/AxiosInstance';

export const getTeamsFromClient = clientId => {
  return axios.get(`/Team/${clientId}`);
};

export const createTeam = data => {
  return axios.post('/Team/', data);
};
