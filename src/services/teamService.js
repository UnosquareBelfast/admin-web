import axios from '../utilities/AxiosInstance';

export const getTeamsFromClient = clientId => {
  return axios.get(`/Team/getByClientId/${clientId}`);
};

export const createTeam = data => {
  return axios.post('/Team/', data);
};
