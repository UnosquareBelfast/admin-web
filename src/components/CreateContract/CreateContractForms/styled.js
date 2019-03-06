import styled from 'styled-components';

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 40px;
  button {
    flex: 0 1 auto;
    width: 100%;
    max-width: 100%;

    @media (min-width: ${props => props.theme.mediaQueries.md}) {
      width: 200px;
    }
  }
`;

export const FormContainer = styled.div`
  form {
    width: 100%;
    @media (min-width: ${props => props.theme.mediaQueries.lg}) {
      width: 50%;
    }
  }
`;
