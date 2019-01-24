import React from 'react';
import { Spinner } from '../common';

const LoginLoader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </div>
  );
};

export default LoginLoader;
