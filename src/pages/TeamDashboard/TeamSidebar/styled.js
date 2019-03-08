import styled from 'styled-components';

export const ContainerStyle = styled.div`
  min-width: 250px;
  height: 100vh;
  padding: 20px 20px 10px 20px;
  background-color: ${props => props.theme.colours.lightgrey};

  .title {
    margin: 0;
  }

  .client {
    margin: 10px 0;
  }

  .team-link {
    position: relative;
    margin: 0 0 5px 0;
    color: ${props => props.theme.colours.unoBlue};
    background-color: ${props => props.theme.colours.white};
    border: 2px solid ${props => props.theme.colours.unoBlue};
    padding: 0 12px;
    line-height: 30px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: background-color 500ms;

    &::after {
      transition: all 0s ease 0s;
      display: block;
      content: '';
      position: absolute;
      right: -20px;
      top: -2px;
      height: 0;
      width: 0;
      background-color: transparent;
      border-style: solid;
      border-width: 17px 0 17px 20px;
      border-color: transparent transparent transparent transparent;
    }

    &:hover {
      background-color: ${props => props.theme.colours.unoBlue};
      color: ${props => props.theme.colours.white};
      opacity: 0.6;
    }

    &.active {
      background-color: ${props => props.theme.colours.unoBlue};
      color: ${props => props.theme.colours.white};
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      opacity: 1;

      ::after {
        transition: all 200ms linear 200ms;
        right: -22px;
        border-color: transparent transparent transparent ${props => props.theme.colours.unoBlue};
      }
    }

  }
`;
