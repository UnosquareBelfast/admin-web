import axios from '../config/AxiosInstance';

export const getUsersEvents = date => {
  return axios.get(`/Dashboard/getEmployeeEvents/${date}`);
};

export const getTeamsEvents = date => {
  return axios.get(`/Dashboard/getTeamEvents/${date}`);
};

export const getEmployeesTeamsSnapshot = () => {
  return axios.get('/Dashboard/getEmployeeTeamSnapshot');
};