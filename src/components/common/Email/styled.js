import styled from 'styled-components';

export const StyledLink = styled.div`
	color: ${props => props.theme.colours.unoBlue};
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
	:active {
		color: ${props => props.theme.colours.darkBlue};
	}
`;