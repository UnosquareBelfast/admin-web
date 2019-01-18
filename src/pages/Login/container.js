import React from 'react';
import AzureInstance from '../../utilities/AzureInstance';

export default Wrapped =>
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    loginRedirect = () => {
      const graphScopes = ['user.read'];
      AzureInstance.loginRedirect(graphScopes);
    };

    render() {
      return <Wrapped login={this.loginRedirect} />;
    }
  };
