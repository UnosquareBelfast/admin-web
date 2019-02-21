import axios from '../config/AxiosInstance';

export const getAllEvents = () => {
  return axios.get('/Event/');
};

export const getEvents = (employeeId, eventTypeId) => {
  return axios.get(`/Event/findByEmployeeId/${employeeId}/${eventTypeId}`);
};

export const getEventsByStatus = (statusId, eventTypeId) => {
  return axios.get(`/Event/findByEventStatus/${statusId}/${eventTypeId}`);
};

export const requestEvent = event => {
  return axios.post('/Event/', event);
};

export const updateEvent = event => {
  return axios.put('/Event/', event);
};

export const approveEvent = eventId => {
  return axios.put('/Event/approveEvent', { eventId });
};

export const rejectEvent = (eventId, message) => {
  return axios.put('/Event/rejectEvent', { eventId, message });
};

export const cancelEvent = eventId => {
  return axios.put('/Event/cancelEvent', { eventId });
};

export const sendMessage = (eventId, message) => {
  return axios.put('/Event/addMessageToEvent', { eventId, message });
};

export const getEventMessages = eventId => {
  return axios.get(`/Event/findEventMessages/${eventId}`);
};
