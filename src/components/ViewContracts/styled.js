import styled from 'styled-components';

export const FormContainer = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: space-between;
    align-items: flex-end;
  }
`;

export const Column = styled.div`
  flex: 1 1 auto;
  margin-left: 20px;
  align-self: auto;
  width: 50%;
  &:first-child {
    margin-left: 0;
  }
`;     
