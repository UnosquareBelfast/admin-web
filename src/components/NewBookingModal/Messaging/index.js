import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import {
  StyleContainer,
  ChatBox,
  Message,
  MessageMetaWrap,
  ReplyBox,
  SendButton,
} from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faUser,
  faPaperPlane,
} from '@fortawesome/fontawesome-free-solid';
import messageTypes from '../../../utilities/messageTypes';

const MessageBlock = ({
  message,
  author,
  lastModified,
  eventMessageId,
  messageTypeId,
}) => {
  return (
    <Fragment key={eventMessageId}>
      <MessageMetaWrap>
        <span>
          <FontAwesomeIcon icon={faUser} />
          {author}
        </span>
        <span>
          <FontAwesomeIcon icon={faClock} />
          {lastModified}
        </span>
      </MessageMetaWrap>
      <Message declined={messageTypeId === messageTypes.declined}>
        {message}
      </Message>
    </Fragment>
  );
};

const renderMessages = messages => {
  return messages.map(message => {
    const { author, lastModified, eventMessageId, messageTypeId } = message;
    return (
      <MessageBlock
        message={message.message}
        author={author}
        lastModified={lastModified}
        key={eventMessageId}
        messageTypeId={messageTypeId}
      />
    );
  });
};

const Messaging = ({ messages, toggleMessagingView }) => {
  console.log(messages);

  return (
    <StyleContainer>
      <div style={{ position: 'relative' }}>
        <div className="chatIconWrap">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            onClick={() => toggleMessagingView(false)}
          />
        </div>
        <h2>Holiday Messages</h2>
        <ChatBox>{renderMessages(messages)}</ChatBox>
        <div className="replyBox">
          <span>Send Reply: </span>
          <ReplyBox />
          <SendButton>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SendButton>
        </div>
      </div>
    </StyleContainer>
  );
};

Messaging.propTypes = {
  messages: PT.array.isRequired,
  toggleMessagingView: PT.func.isRequired,
};

export default container(Messaging);
