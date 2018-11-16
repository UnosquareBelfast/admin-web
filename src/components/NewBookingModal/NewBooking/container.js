import React from 'react';
import { PropTypes as PT } from 'prop-types';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      start: PT.object.isRequired,
      end: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    handleFormSubmit = data => {
      console.log(data);
    };

    render() {
      const { start, end } = this.props;
      return (
        <Wrapped
          handleFormSubmit={this.handleFormSubmit}
          start={start}
          end={end}
        />
      );
    }
  };

export default Container;
