import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const MainContentContainer = styled.div`
  h2 {
    margin: 0;
  }
  .subheader {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .holidayinfo {
    margin-top: 20px;
    h3 {
      margin-bottom: 20px;
    }
    p {
      margin: 0 0 5px 0;
    }
  }

  .columns {
    display: flex;
    margin-bottom: 20px;

    > div {
      flex: 1;
      margin-right: 15px;
    }

    h1 {
      margin-bottom: 5px;
      color: ${props => props.theme.colours.unoBlue};
    }
    h4 {
      margin: 0;
      margin-bottom: 20px;
    }
  }
`;
