import axios from 'axios';
import store from '../store';
import { resetUser } from '../actions/user';

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

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;

    // If unauthorized status gets returned from a call, log the user out.
    // The token has likely expired.
    if (response.status === 401) {
      localStorage.clear();
      store.dispatch(resetUser);
      localStorage.setItem('ac-prev-expired', true);
      location.reload();
    }
  }
);

export default instance;
