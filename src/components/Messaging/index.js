import React from 'react';
import { PropTypes as PT } from 'prop-types';
import eventTypes, { typeText } from '../../constants/eventTypes';

import container from './container';
import {
  StyleContainer,
  ChatBox,
  MessageItemLeft,
  MessageItemRight,
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
import { messageTypeColors } from '../../constants/messageTypes';
import moment from 'moment';

const MessageBlock = ({
  myMessage,
  message,
  author,
  lastModified,
  eventMessageId,
  eventMessageTypeId,
}) => {

  const MessageItem = myMessage ? MessageItemLeft : MessageItemRight;

  return (
    <MessageItem key={eventMessageId}>
      <Message msgColor={messageTypeColors[eventMessageTypeId]}>
        {message}
        <span>
          <FontAwesomeIcon icon={faClock} />
          {lastModified}
        </span>
      </Message>
      <MessageMetaWrap>
        <span>
          <FontAwesomeIcon icon={faUser} />
          {author}
        </span>
      </MessageMetaWrap>
    </MessageItem>
  );
};

MessageBlock.propTypes = {
  myMessage: PT.bool.isRequired,
  message: PT.string.isRequired,
  author: PT.string.isRequired,
  lastModified: PT.string.isRequired,
  eventMessageId: PT.number.isRequired,
  eventMessageTypeId: PT.number.isRequired,
};

const renderMessages = (userName, messages) => {
  return messages.map(message => {
    const {
      employee,
      lastModified,
      eventMessageId,
      eventMessageTypeId,
    } = message;

    const employeeName = `${employee.forename} ${employee.surname}`;

    return (
      <MessageBlock
        myMessage={employeeName === userName}
        message={message.message}
        author={employeeName}
        lastModified={moment(lastModified).format('dddd, Do MMMM YYYY, h:mma')}
        key={eventMessageId}
        eventMessageTypeId={eventMessageTypeId}
      />
    );
  });
};

const Messaging = (props) => {

  const {
    userName,
    messages,
    toggleMessagingView,
    sendMessage,
    updateMessage,
    currentMessage,
    hideNav,
    title,
  } = props;

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
        {!hideNav && <h2>{ `${title} Messages` }</h2>}
        <ChatBox>{renderMessages(userName, messages)}</ChatBox>
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
  userName: PT.string,
  title: PT.string,
  messages: PT.array.isRequired,
  toggleMessagingView: PT.func,
  sendMessage: PT.func.isRequired,
  updateMessage: PT.func.isRequired,
  currentMessage: PT.string.isRequired,
  hideNav: PT.bool,
};

Messaging.defaultProps = {
  title: typeText[eventTypes.PUBLIC_HOLIDAY],
};

export default container(Messaging);
