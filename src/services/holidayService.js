import axios from '../utilities/AxiosInstance';

export const getAllHolidays = () => {
  return axios.get('/holidays/');
};

export const getHolidays = employeeId => {
  return axios.get(`/holidays/findByEmployeeId/${employeeId}`);
};

export const getHolidaysByStatus = statusId => {
  return axios.get(`/holidays/findByHolidayStatus/${statusId}`);
};

export const requestHoliday = holiday => {
  return axios.post('/Holiday/', holiday);
};

export const updateHoliday = holiday => {
  return axios.put('/Holiday/', holiday);
};

export const approveHoliday = eventId => {
  return axios.put('/holidays/approveHoliday', { eventId });
};

export const rejectHoliday = (eventId, message) => {
  return axios.put('/holidays/rejectHoliday', { eventId, message });
};

export const cancelHoliday = eventId => {
  return axios.put('/holidays/cancelHoliday', { eventId });
};

export const sendMessage = (eventId, messageType, message) => {
  console.log(
    `Message ${message} sent with message type ${messageType} for event ${eventId}`
  );
};
