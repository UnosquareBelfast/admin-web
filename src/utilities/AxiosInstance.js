import axios from 'axios';
import moment from 'moment';
import store from '../store';

const baseURL = process.env.DOMAIN;
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(function(config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'msal.idtoken'
  )}`;
  return config;
});

instance.interceptors.response.use(function(response) {
  // If unauthorized status gets returned from a call, log the user out.
  // The token has likely expired.

  if (response.status === 401) {
    localStorage.clear();
    localStorage.setItem('ac-prev-expired', true);
    location.reload();
  }

  return response;
});

export default instance;
