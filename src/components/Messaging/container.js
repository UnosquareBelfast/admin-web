import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { getEventMessages, sendMessage } from '../../services/eventService';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';

const MessageContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userName: PT.string.isRequired,
      toggleMessagingView: PT.func,
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
      this.sendGetMessageRequest();
    }

    sendGetMessageRequest = () => {
      getEventMessages(this.props.eventId).then(response => {
        this.setState({ messages: response.data });
      });
    };

    sendMessage = () => {
      const { eventId } = this.props;
      const { currentMessage } = this.state;
      sendMessage(eventId, currentMessage).then(this.sendGetMessageRequest);
      this.setState({ currentMessage: '' });
    };

    updateCurrentMessage = message => {
      this.setState({ currentMessage: message });
    };

    render() {
      const { toggleMessagingView, userName } = this.props;
      const { messages, currentMessage } = this.state;
      return (
        <Wrapped
          userName={userName}
          messages={messages}
          toggleMessagingView={toggleMessagingView}
          sendMessage={this.sendMessage}
          currentMessage={currentMessage}
          updateMessage={this.updateCurrentMessage}
          {...this.props}
        />
      );
    }
  };

const mapStateToProps = state => {
  const user = getUser(state);
  const userName = `${user.forename} ${user.surname}`;
  return {
    userName,
  };
};

export default compose(connect(mapStateToProps), MessageContainer);
