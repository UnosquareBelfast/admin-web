import axios from '../config/AxiosInstance';

export const getHolidayStats = employeeId => {
  return axios.get(`/Event/findEmployeeHolidayStats/${employeeId}`);
};
