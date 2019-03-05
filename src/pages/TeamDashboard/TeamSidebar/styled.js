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
    margin: 0 0 5px 0;
    color: ${props => props.theme.colours.unoBlue};
    background-color: transparent;
    border: 2px solid ${props => props.theme.colours.unoBlue};
    padding: 0 12px;
    line-height: 30px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: background-color 500ms;

    &:first-of-type {
      margin-top: 32px;
    }

    &:hover {
      background-color: ${props => props.theme.colours.white};
    }

    &.active {
      background-color: ${props => props.theme.colours.unoBlue};
      color: ${props => props.theme.colours.white};
    }

  }
`;
