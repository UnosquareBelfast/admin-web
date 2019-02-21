import axios from '../utilities/AxiosInstance';

export const getHolidayStats = employeeId => {
  return axios.get(`/Event/findEmployeeHolidayStats/${employeeId}`);
};
