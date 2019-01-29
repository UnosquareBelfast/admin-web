import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { getMessagesByEventId } from '../../../services/dashboardService';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      toggleMessagingView: PT.func.isRequired,
      eventId: PT.number.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        messages: [],
      };
    }

    componentDidMount() {
      getMessagesByEventId(this.props.eventId).then(response => {
        this.setState({ messages: response.data });
      });
    }

    render() {
      const { toggleMessagingView } = this.props;
      return (
        <Wrapped
          messages={this.state.messages}
          toggleMessagingView={toggleMessagingView}
        />
      );
    }
  };

export default Container;
