import styled from 'styled-components';

export const FormStyleContainer = styled.div`
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
		height: 40px;
		background-color: ${props => props.theme.colours.white};
    border-color: ${props => props.theme.colours.grey};
  }

  textarea {
    margin-bottom: 0;
    resize: vertical;
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

  .checkbox {
    margin-bottom: 8px;
  }

  .checkbox label {
    padding: 0px 10px;
    position: relative;
    top: -3px;
  }

  .checkbox input {
    width: 17px;
    height: 17px;
    margin-top: 10px;
  }

  .checkbox input:disabled ~ label {
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

  .error {
    border-color: ${props => props.theme.colours.red};
    border-width: 1.5px;
    outline: none;
	}
	

	.formgroup {

		margin: 0 0 20px 0;
		width: 100%;
		max-width: 100%;

		label,
		input,
		textarea,
		select {
			margin: 0 0 2px 0;
			display: block;
			width: 100%;
		}
		span{
			display: none;
		}
		&--invalid {
			label { 
				color: ${props => props.theme.colours.red}; 
			}
			input,
			textarea,
			select {
				border-color: ${props => props.theme.colours.red};
				border-width: 1.5px;
    		outline: none;
			}
			span {
				display: block;
				color: ${props => props.theme.colours.red};
			}
		}
	}
`;
