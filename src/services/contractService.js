import axios from '../config/AxiosInstance';

export const getContractsByEmployeeId = employeeId => {
  return axios.get(`/Contract/getByEmployeeId/${employeeId}`);
};

export const getContractsByTeamId = teamId => {
  return axios.get(`/Contract/getByTeamId/${teamId}`);
};

export const getContractByEmployeeIdAndTeamId = (employeeId, teamId) => {
  return axios.get(`/Contract/getByEmployeeIdAndTeamId/${employeeId}/${teamId}`);
};

export const createContract = contract => {
  return axios.post('/Contract/', contract);
};
