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
		outline: none;
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
			outline: none;
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
  outline: none;
  position: realative;
  &::-ms-expand {
    display: none;
	}
	&:focus {
		outline: none;
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
	line-height: 40px;
	border-radius: 5px;
	border: 2px solid ${props => props.theme.colours.unoBlue};
	width: 100%;
	background-color: ${props => props.theme.colours.unoBlue};
	color: ${props => props.theme.colours.white};
	font-weight: bold;

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
		${Select} {
			border-color: ${props => props.theme.colours.red};
			border-width: 1.5px;
			outline: none;
		}
	}

  &.disabled {
    display: none;
    visibility: hidden !important;
    ${Label} {
      cursor: none;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &.contains-checkbox {
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
		
  }
`;
