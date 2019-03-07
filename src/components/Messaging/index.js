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


const renderMessages = (userName, messages) => {
  return messages.map( (message, index) => {
    const {
      employee,
      lastModified,
      eventMessageTypeId,
    } = message;

    const employeeName = `${employee.forename} ${employee.surname}`;
    const myMessage = message.message;
    const MessageItem = employeeName === userName ? MessageItemLeft : MessageItemRight;

    return (
      <MessageItem key={index}>
        <Message msgColor={messageTypeColors[eventMessageTypeId]}>
          {myMessage}
          <span>
            <FontAwesomeIcon icon={faClock} />
            {lastModified}
          </span>
        </Message>
        <MessageMetaWrap>
          <span>
            <FontAwesomeIcon icon={faUser} />
            {employeeName}
          </span>
        </MessageMetaWrap>
      </MessageItem>
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
