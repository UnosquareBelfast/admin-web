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
  height: 100%;

  h2 {
    margin: 15px 0 20px 0;
    user-select: none;
  }

  .replyBox {
    margin-top: 20px;

    > div {
      display: flex;
    }
  }
`;

export const ChatBox = styled.div`
  padding: 10px;
  height: calc(100% - 140px);
  overflow-y: scroll;
  background-color: ${props => props.theme.colours.lightgrey};
  border-radius: 3px;
`;

export const Message = styled.div`
  padding: 10px;
  margin-bottom: 16px;
  background-color: ${({ msgColor }) => msgColor};
  border-radius: 8px;
  color: white;
  line-height: 18px;
  position: relative;
  font-size: ${props => props.theme.fonts.pixelSize.small}px;

  &:before {
    display: block;
    content: '';
    position: absolute;
    bottom: -8px
    left: 20px
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 7px 0 7px;
    border-color: ${({ msgColor }) => msgColor} transparent transparent transparent;
  }

  span{
    display: block;
    margin-top: 4px;
    font-size: ${(props) => props.theme.fonts.pixelSize.xsmall}px;
  }

  > span > svg {
    margin-right: 5px;
  }
`;

export const MessageMetaWrap = styled.div`
  color: ${props => props.theme.colours.darkGrey};
  font-size: ${(props) => props.theme.fonts.pixelSize.small}px;
  padding: 0 0 0 20px;
  margin-bottom: 20px;

  > span > svg {
    margin-right: 5px;
  }
`;

export const MessageItemLeft = styled.div`
  margin: 0 40% 0 10px;
`;

export const MessageItemRight = styled.div`
  margin: 0 10px 0 40%;
  position: relative;
  top: -10px;
`;

export const ReplyBox = styled.input`
  margin-top: 6px;
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
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 8px;
  margin-left: 10px;
`;
