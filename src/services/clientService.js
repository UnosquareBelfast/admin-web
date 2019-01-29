import axios from '../utilities/AxiosInstance';

export const createClient = client => {
  return axios.post('/Client/', client);
};

export const updateClient = client => {
  return axios.put('/Client/', client);
};

export const getAllClients = () => {
  return axios.get('/Client/');
};

export const getClientById = clientId => {
  return axios.get(`/Client/${clientId}`);
};
