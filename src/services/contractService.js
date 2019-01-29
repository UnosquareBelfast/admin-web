import axios from '../utilities/AxiosInstance';

export const getContractsByEmployeeId = employeeId => {
  return axios.get(`/Contract/getByEmployeeId/${employeeId}`);
};

export const createContract = contract => {
  return axios.post('/Contract/', contract);
};
