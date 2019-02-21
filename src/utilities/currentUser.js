import store from '../store';
import { resetUser } from '../actions/user';
import AzureInstance from '../config/AzureInstance';

export const userLogout = () => {
  store.dispatch(resetUser());
  AzureInstance.logout();
};
