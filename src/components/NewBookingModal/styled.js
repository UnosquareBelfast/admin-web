import styled from 'styled-components';

export const FormContainer = styled.div`
  padding: 0 10px 30px 10px;
  background: red;

  form {
    display: flex;
    flex-direction: column;
  }

  select, input {
    margin-bottom: 10px;
  }
`;
