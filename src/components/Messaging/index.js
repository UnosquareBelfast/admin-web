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
import messageTypes from '../../utilities/messageTypes';
import moment from 'moment';

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
        lastModified={moment(lastModified).format('DD-MM-YYYY')}
        key={eventMessageId}
        messageTypeId={messageTypeId}
      />
    );
  });
};

const Messaging = ({
  messages,
  toggleMessagingView,
  sendMessage,
  updateMessage,
  currentMessage,
  hideNav,
}) => {
  return (
    <StyleContainer>
      <div style={{ position: 'relative' }}>
        {!hideNav && (
          <div className="chatIconWrap">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              onClick={() => toggleMessagingView(false)}
            />
          </div>
        )}
        {!hideNav && <h2>Holiday Messages</h2>}
        <ChatBox>{renderMessages(messages)}</ChatBox>
        <div className="replyBox">
          <span>Send Reply: </span>
          <div>
            <ReplyBox
              value={currentMessage}
              onChange={event => updateMessage(event.target.value)}
            />
            <SendButton onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </SendButton>
          </div>
        </div>
      </div>
    </StyleContainer>
  );
};

Messaging.propTypes = {
  messages: PT.array.isRequired,
  toggleMessagingView: PT.func,
  sendMessage: PT.func.isRequired,
  updateMessage: PT.func.isRequired,
  currentMessage: PT.string.isRequired,
  hideNav: PT.bool,
};

export default container(Messaging);
