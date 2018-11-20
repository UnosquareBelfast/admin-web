import React from 'react';
import { PropTypes as PT } from 'prop-types';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {};

    constructor(props) {
      super(props);
      this.state = {};
    }

    handleFormSubmit = data => {
      console.log(data);
    };

    render() {
      return <Wrapped handleFormSubmit={this.handleFormSubmit} />;
    }
  };

export default Container;
