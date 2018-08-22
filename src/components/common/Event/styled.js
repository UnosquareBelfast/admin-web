import styled from 'styled-components';

export const Container = styled.div`
  letter-spacing: 0.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  padding: 7px 5px;
  color: white;
  font-size: 14px;
  border-radius: 2px;
  background: ${props => props.theme.holidayStatus[props.status]};
  opacity: ${({ fade }) => (fade ? 0.4 : 1)};
  transition: 0.1s all ease-in-out;

  :hover {
    transform: scale(1.05);
    opacity: 1;
    box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.6);
  }

  span {
    padding: 0 10px 0 2px;
  }

  &.ishalfday {
    background: linear-gradient(
      to top,
      ${props => props.theme.holidayStatus[props.status]} 0%,
      ${props => props.theme.holidayStatus[props.status]} 50%,
      ${props => props.theme.holidayStatus[props.status]}CC 51%,
      ${props => props.theme.holidayStatus[props.status]}CC 100%
    );
  }
`;
