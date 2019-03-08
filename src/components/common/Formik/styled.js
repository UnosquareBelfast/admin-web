import styled from 'styled-components';

/*
  Label
*/
export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: ${props => props.theme.fonts.weight.bold};
  cursor: pointer;
`;

/*
  Error
*/
export const Error = styled.span`
  display: block;
  font-weight: ${props => props.theme.fonts.weight.bold};
  color: ${props => props.theme.colours.red}
`;

/*
  Input
*/
export const Input = styled.input`
  outline: none;
  border: 2px solid ${props => props.theme.colours.grey};
  background-color: ${props => props.theme.colours.white};
  font: inherit;
  padding: 0 10px;
  margin-bottom: 4px;
  display: block;
  width: 100%;
  line-height: 40px;
  height: 40px;
  &:focus {
    border: 2px solid ${props => props.theme.colours.unoBlue};
    background-color: ${props => props.theme.colours.lightBlue};
  }
`;

/*
  TextArea
*/
export const TextArea = styled.textarea`
  outline: none;
  border: 2px solid ${props => props.theme.colours.grey};
  background-color: ${props => props.theme.colours.white};
  font: inherit;
  padding: 8px 10px;
  margin-bottom: 4px;
  display: block;
  width: 100%;
  max-width: 100%;
  line-height: 22px;
  min-height: 40px;
  &:focus {
    border: 2px solid ${props => props.theme.colours.unoBlue};
    background-color: ${props => props.theme.colours.lightBlue};
  }
`;

/*
  Date Picker
*/
export const DatePickerContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 1;
    color: ${props => props.theme.colours.unoBlue};
  }

  .react-datepicker-wrapper {
    display: block;
    width: 100%;
    .react-datepicker__input-container {
      display: block;
      width: 100%;
    }
  }
  
  input {
    outline: none;
    border: 2px solid ${props => props.theme.colours.grey};
    background-color: ${props => props.theme.colours.white};
    font: inherit;
    padding: 0 10px;
    margin-bottom: 4px;
    display: block;
    width: 100%;
    line-height: 40px;
    height: 40px;
    &:focus {
      border: 2px solid ${props => props.theme.colours.unoBlue};
      background-color: ${props => props.theme.colours.lightBlue};
    }
  }

  &.invalid {
    svg {
      color: ${props => props.theme.colours.darkRed};
    }

    input {
      border: 2px solid ${props => props.theme.colours.darkRed} !important;
      background-color: ${props => props.theme.colours.lightRed} !important;
    }
  }
`;


/*
  SelectField
*/
export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  &:after {
    position: absolute;
    content: '';
    top: 16px;
    right: 8px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: ${props => props.theme.colours.unoBlue} transparent
      transparent transparent;
  }
`;

export const Select = styled.select`
  outline: none;
  border: 2px solid ${props => props.theme.colours.grey};
  background-color: ${props => props.theme.colours.white};
  font: inherit;
  padding: 0 10px;
  margin-bottom: 4px;
  display: block;
  width: 100%;
  line-height: 40px;
  height: 40px;
  -webkit-appearance: none;
  position: realative;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    border: 2px solid ${props => props.theme.colours.unoBlue};
    background-color: ${props => props.theme.colours.lightBlue};
  }
`;


/*
  Button
  1. Standard Button
  2. Ghost Button
*/
export const Button = styled.button`
  line-height: 30px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colours.unoBlue};
  width: 100%;
  background-color: ${props => props.theme.colours.unoBlue};
  color: ${props => props.theme.colours.white};

  &:disabled {
    opacity: 0.4;
    cursor: none;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const GhostButton = styled(Button)`
  background-color: ${props => props.theme.colours.white};
  color: ${props => props.theme.colours.unoBlue};
`;

/*
  Button group
*/

export const ButtonGroup = styled.div`
  display: flex;
  ${Button} {
    flex: 1 0 auto;
    margin-right: 4px;
    width: auto;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const ButtonGroupSubmitReset = styled(ButtonGroup)`
  ${Button}:first-child {
    flex: 2 0 auto;
  }
`;


/*
  FormGroup
*/
export const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
  
  &.invalid {
    ${Label} { 
      color: ${props => props.theme.colours.red}; 
    }
    ${SelectContainer}:after {
      border-color: ${props => props.theme.colours.red} transparent
      transparent transparent;
    }
    ${Input},
    ${TextArea},
    ${Select} {
      background-color: ${props => props.theme.colours.white};
      border-color: ${props => props.theme.colours.red};
      border-width: 1.5px;
    }
  }

  &.checkbox-layout {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 3px;
      width: 12px;
      height: 12px;
      box-shadow: 0px 0px 0px 2px ${props => props.theme.colours.unoBlue};
      background-color: ${props => props.theme.colours.white}
      border: 2px solid ${props => props.theme.colours.white}
      box-sizing: border-box;
    }

    &.is-checked {
      &:before{
        background-color: ${props => props.theme.colours.unoBlue};
      }
      
      &.invalid {
        min-height: 50px;
      }
    }

    ${Label} {
      padding-left: 20px;
      position: relative;
      font-weight: ${props => props.theme.fonts.weight.regular};
    }

    input[type='checkbox'] {
      display: none;
    }

    &.is-disabled {
      &:before {
        opacity: 0.4;
        cursor: not-allowed;
      }
      ${Label} {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
    
  }
`;

/*
  Form Validation Error Message
*/
export const FormValidationErrorMessage = styled.ul`
  padding: 10px;
  background-color: ${props => props.theme.colours.red};
  color: white;
  border-radius: 3px;
  li {
    list-style: none;
    margin: 5px 0;
  }
`;
