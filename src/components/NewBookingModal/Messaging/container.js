import React from 'react';
import { PropTypes as PT } from 'prop-types';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {};

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return <Wrapped />;
    }
  };

export default Container;
