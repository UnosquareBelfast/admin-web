import decode from 'jwt-decode';
import store from '../store';
import { resetUser } from '../actions/user';

export const getProfile = () => {
  return decode(localStorage.getItem('id_token'));
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('msal.idtoken');
};

export const userLogout = () => {
  store.dispatch(resetUser());
  localStorage.removeItem('id_token');
  localStorage.removeItem('user_id');
};
