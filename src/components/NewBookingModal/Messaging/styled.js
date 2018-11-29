import styled from 'styled-components';

export const StyleContainer = styled.div`
  .chatIconWrap {
    position: absolute;
    top: -13px;
    display: flex;
    flex-direction: row-reverse;
    width: calc(100% - 10px);
    > svg {
      color: #999;
      cursor: pointer;
      :hover {
        color: black;
      }
    }
  }

  padding: 0 15px 10px 15px;

  h2 {
    margin: 15px 0 20px 0;
    user-select: none;
  }

  .replyBox {
    margin-top: 20px;
  }
`;

export const ChatBox = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
  background-color: ${props => props.theme.colours.lightgrey};
  border-radius: 3px;
`;

export const Message = styled.div`
  padding: 10px;
  background-color: ${({ theme, declined }) =>
    declined ? theme.colours.unoBlue : theme.colours.red};
  border-radius: 8px;
  color: white;
  line-height: 24px;
  margin-bottom: 10px;
`;

export const MessageMetaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colours.darkGrey};
  font-size: 13px;
  padding: 0 10px;
  margin-bottom: 5px;

  > span > svg {
    margin-right: 5px;
  }
`;

export const ReplyBox = styled.input`
  margin-top: 5px;
  padding: 7px 8px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.theme.colours.grey};
  width: calc(100% - 15px);
`;

export const SendButton = styled.button`
  height: 33px;
  border: 0;
  background-color: ${props => props.theme.colours.unoBlue};
  color: white;
  width: 70px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 8px;
`;
