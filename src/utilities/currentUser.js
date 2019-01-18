import decode from 'jwt-decode';
import store from '../store';
import { resetUser } from '../actions/user';
import AzureInstance from '../utilities/AzureInstance';

export const getProfile = () => {
  return decode(localStorage.getItem('id_token'));
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('msal.idtoken');
};

export const userLogout = () => {
  store.dispatch(resetUser());
  AzureInstance.logout();
};
