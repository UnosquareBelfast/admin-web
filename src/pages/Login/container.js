import React from 'react';
import { PropTypes as PT } from 'prop-types';
import AzureInstance from '../../utilities/AzureInstance';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const graphScopes = ['user.read'];
      AzureInstance.loginRedirect(graphScopes);
    }

    render() {
      return <Wrapped history={this.props.history} />;
    }
  };
