import React from 'react';
import { PropTypes as PT } from 'prop-types';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      toggleMessagingView: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};

      this.messages = [
        {
          author: 'Admin',
          eventMessageId: 0,
          lastModified: '2018-11-29',
          message: 'Sorry, I\'ve had to decline your holiday request.',
          messageTypeDescription: 'Request Declined',
          messageTypeId: 1,
        },
        {
          author: 'William',
          eventMessageId: 1,
          lastModified: '2018-11-29',
          message: 'Ok, not a problem.',
          messageTypeDescription: 'General',
          messageTypeId: 1,
        },
      ];
    }

    render() {
      const { toggleMessagingView } = this.props;
      return (
        <Wrapped
          messages={this.messages}
          toggleMessagingView={toggleMessagingView}
        />
      );
    }
  };

export default Container;
