import axios from '../utilities/AxiosInstance';

export const createClient = client => {
  return axios.post('/Client/', client);
};

export const updateClient = (clientId, clientName) => {
  return axios.put('/Client/', { clientId, clientName });
};

export const getAllClients = () => {
  return axios.get('/Client/');
};

export const getClientById = clientId => {
  return axios.get(`/Client/${clientId}`);
};
