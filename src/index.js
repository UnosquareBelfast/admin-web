import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig';

const DO_NOT_LOGIN = false;

runWithAdal(
  authContext,
  () => {
    require('./indexApp.js');
  },
  DO_NOT_LOGIN
);
