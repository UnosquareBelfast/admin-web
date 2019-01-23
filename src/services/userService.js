import axios from '../utilities/AxiosInstance';

export const getSignedInUser = () => {
  return axios.get('/Employee/getSignedInUser');
};

export const getAllUsers = () => {
  return axios.get('/Employee/');
};

export const getUserProfile = id => {
  return axios.get(`/Employee/${id}`);
};

export const getUserByName = (forename, surname) => {
  return axios.get(`/Employee/findByForenameAndSurname/${forename}/${surname}`);
};

export const createUser = data => {
  return axios.post('Authentication/register/', data);
};

export const updateUser = data => {
  return axios.put('Employee/', data);
};
