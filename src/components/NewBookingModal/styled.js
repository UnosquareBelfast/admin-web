import styled from 'styled-components';

export const FormContainer = styled.div`
  .chatIconWrap {
    position: absolute;
    top: -13px;
    display: flex;
    flex-direction: row-reverse;
    width: calc(100% - 10px);
    > svg {
      color: #999999;
      cursor: pointer;
      :hover {
        color: black;
      }
    }
  }

  padding: 0 15px 10px 15px;

  h2 {
    user-select: none;
    margin: 15px 0 20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  select,
  input,
  textarea {
    margin-bottom: 13px;
    margin-top: 5px;
    padding: 7px 8px;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: ${props => props.theme.colours.grey};
  }

  textarea {
    margin-bottom: 0;
    resize: vertical;
  }

  input {
    height: 23px;
  }

  button {
    padding: 11px;
    border-radius: 5px;
    border-style: none;
    background-color: ${props => props.theme.colours.unoBlue};
    color: ${props => props.theme.colours.white};
    font-weight: bold;
  }

  form > label {
    margin-bottom: 2px;
  }

  .half-day {
    margin-bottom: 8px;
  }

  .half-day label {
    padding: 0px 10px;
    position: relative;
    top: -3px;
  }

  .half-day input {
    width: 17px;
    height: 17px;
    margin-top: 10px;
  }

  .half-day input:disabled ~ label {
    opacity: 0.3;
  }

  ul {
    padding: 10px;
    background-color: ${props => props.theme.colours.red};
    color: white;
    border-radius: 3px;
    li {
      list-style: none;
      margin: 5px 0;
    }
  }
`;
