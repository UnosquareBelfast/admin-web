import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  getEventMessages,
  sendMessage,
} from '../../../services/holidayService';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      toggleMessagingView: PT.func.isRequired,
      eventId: PT.number.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        currentMessage: '',
        messages: [],
      };
    }

    componentDidMount() {
      this.getMessages();
    }

    getMessages = () => {
      getEventMessages(this.props.eventId).then(response => {
        this.setState({ messages: response.data });
      });
    };

    sendMessage = () => {
      const { eventId } = this.props;
      const { currentMessage } = this.state;
      sendMessage(eventId, currentMessage).then(this.getMessages);
      this.setState({ currentMessage: '' });
    };

    updateCurrentMessage = message => {
      this.setState({ currentMessage: message });
    };

    render() {
      const { toggleMessagingView } = this.props;
      return (
        <Wrapped
          messages={this.state.messages}
          toggleMessagingView={toggleMessagingView}
          sendMessage={this.sendMessage}
          currentMessage={this.state.currentMessage}
          updateMessage={this.updateCurrentMessage}
        />
      );
    }
  };

export default Container;
