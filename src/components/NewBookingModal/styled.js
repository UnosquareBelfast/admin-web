import styled from 'styled-components';

export const BookingModalStyleContainer = styled.div`
  .chatIconWrap {
    position: absolute;
    top: -13px;
    right: 25px;
    display: flex;
    flex-direction: row-reverse;
    width: calc(100% - 10px);
    > svg {
      color: #999999;
      cursor: pointer;
      margin-left: 10px;
      :hover {
        color: black;
      }
    }
  }
`;
