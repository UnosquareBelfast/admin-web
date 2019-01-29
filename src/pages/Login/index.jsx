import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { LoginBG, LoginPanel, LoginButton } from './styled';
import container from './container';

export const Login = ({ login }) => {
  return (
    <LoginBG>
      <LoginPanel>
        <h1>Unosquare Holiday System</h1>
        <LoginButton onClick={login}>Sign in with Unosquare ID</LoginButton>
      </LoginPanel>
    </LoginBG>
  );
};

Login.propTypes = {
  login: PT.func.isRequired,
};

export default container(Login);
