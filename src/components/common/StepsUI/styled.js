import styled from 'styled-components';

export const Steps = styled.div`

	text-align: center;

	.steps{
		list-style-type: none;
		padding: 0;
		margin: 0 0 12px 0;
	}

	.steps__item {
		position: relative;
		display: inline-block;
		border: 2px solid ${props => props.theme.colours.unoBlue};
		border-radius: 26px;
		line-height: 22px;
		height: 26px;
		width: 26px;
		font-size: ${props => props.theme.fonts.pixelSize.small}px;
		color: var(--grey);
		margin-right: 10px;
		text-align: center;
	}
	
	.steps__item::after {
		content: '';
		position: absolute;
		width: 15px;
		height: 10px;
		right: -15px;
		top: 6px;
		border-top: 2px solid ${props => props.theme.colours.unoBlue};
		border-bottom: 2px solid ${props => props.theme.colours.unoBlue};
		background-color: ${props => props.theme.colours.white};
	}
	
	.steps__item:last-child::after {
		display: none;
	}
	
	.steps__item--active {
		color: ${props => props.theme.colours.white};
		background-color: ${props => props.theme.colours.unoBlue};
	}
	.steps__item--visited {
		background-color: ${props => props.theme.colours.unoBlue};
	}
	.steps__item--visited::after {
		background-color: ${props => props.theme.colours.unoBlue};
	}
`;