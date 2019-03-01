import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onSuccess: PT.func,
    };

    constructor(props) {
      super(props);
    }

    handleDateSectionSubmit = ({startDate, endDate, isOpenEnded }) => {

      const data = {
        startDate: startDate.startOf(),
        endDate: endDate.endOf(),
        isOpenEnded,
      };

      return this.props.onSuccess(data);
    };

    render() {
      return (
        <Wrapped
          handleDateSectionSubmit={this.handleDateSectionSubmit}
        />
      );
    }
  };
