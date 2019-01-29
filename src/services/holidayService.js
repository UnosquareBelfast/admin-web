import axios from '../utilities/AxiosInstance';

export const getAllHolidays = () => {
  return axios.get('/Holiday/');
};

export const getHolidays = employeeId => {
  return axios.get(`/Holiday/findByEmployeeId/${employeeId}`);
};

export const getHolidaysByStatus = statusId => {
  return axios.get(`/Holiday/findByHolidayStatus/${statusId}`);
};

export const requestHoliday = holiday => {
  return axios.post('/Holiday/', holiday);
};

export const updateHoliday = holiday => {
  return axios.put('/Holiday/', holiday);
};

export const approveHoliday = eventId => {
  return axios.put('/Holiday/approveHoliday', { eventId });
};

export const rejectHoliday = (eventId, message) => {
  return axios.put('/Holiday/rejectHoliday', { eventId, message });
};

export const cancelHoliday = eventId => {
  return axios.put('/Holiday/cancelHoliday', { eventId });
};

export const sendMessage = (eventId, messageType, message) => {
  console.log(
    `Message ${message} sent with message type ${messageType} for event ${eventId}`
  );
};

export const getHolidayStats = () => {
  return axios.get('/Holiday/findEmployeeHolidayStats');
};
