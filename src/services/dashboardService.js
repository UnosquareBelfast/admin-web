import axios from '../utilities/AxiosInstance';

export const getUsersEvents = date => {
  return axios.get(`/Dashboard/getEmployeeEvents/${date}`);
};

export const getTeamsEvents = date => {
  return axios.get(`/Dashboard/getTeamEvents/${date}`);
};

export const getEmployeesTeamsSnapshot = () => {
  return axios.get('/Dashboard/getEmployeeTeamSnapshot');
};

export const getTeamOverview = () => {
  return axios.get('/Dashboard/getDashboardSnapshot');
};

export const getMessagesByEventId = eventId => {
  return axios.get(`/Dashboard/getMessagesByEventId/${eventId}`);
};
