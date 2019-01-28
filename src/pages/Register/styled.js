import styled from 'styled-components';

export const BG = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Panel = styled.div`
  h1 {
    margin: 0 0 20px 0;
  }
`;

export const CTAButton = styled.button`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colours.unoBlue};
  color: white;
  font-weight: ${props => props.theme.fonts.weight.bold};
  padding: 20px;
  border: none;
  width: 100%;
  cursor: pointer;
  border-radius: 2px;
  outline: none;

  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.9;
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
