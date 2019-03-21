import styled from 'styled-components';

export const Tabs = styled.div`
  border-bottom: 2px solid ${props => props.theme.colours.unoBlue};
  margin: 20px 0;

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    list-style-type: none;
  }

  li {
    transition: all 300ms;
    border: 2px solid ${props => props.theme.colours.unoBlue};
    border-bottom: none;
    margin-right: 10px;
    line-height: 40px;
    padding: 0 12px;
    cursor: pointer;
    font-size: ${props => props.theme.fonts.pixelSize.h4}px !important;
		font-weight: ${props => props.theme.fonts.weight.bold};
  }

  li:not(.active):hover{
    background-color: ${props => props.theme.colours.lightBlue};
  }

  li.active {
    background-color: ${props => props.theme.colours.unoBlue};
    color: ${props => props.theme.colours.white};
		cursor: default;
  }
`;