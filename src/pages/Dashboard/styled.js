import styled from 'styled-components';

export const ButtonToggle = styled.div`
  position: absolute;
  right: 575px;
  top: 30px;
  height: 40px;
  display: none;
  .btn-text {
    display: none;
  }

  @media (min-width: ${props => props.theme.mediaQueries.lg}) {
    display: flex;
    .btn-icon {
      margin-right: 0px;
    }
  }

  @media (min-width: ${props => props.theme.mediaQueries.xl}) {
    .btn-text {
      display: inline;
    }
    .btn-icon {
      margin-right: 6px;
    }
  }
`;

export const InnerLayout = styled.div`
  width: 100%;
  height: 100%;

  .rbc-calendar {
    height: 900px;
  }

  .rbc-show-more {
    background-color: ${props => props.theme.colours.grey};
    color: ${props => props.theme.colours.darkGrey};
    transition: 0.1s all ease-in-out;
    border-radius: 2px;
    padding: 4px 5px;
    margin: 1px 2px;
    text-decoration: none;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.6);
    }
  }

  .rbc-month-header {
    border-radius: 5px 5px 0 0;
    overflow: hidden;
  }

  .rbc-month-view {
    border: none;
  }

  .rbc-month-row {
    border-left: 1px solid ${props => props.theme.colours.borderGrey};
    border-right: 1px solid ${props => props.theme.colours.borderGrey};
    :last-of-type {
      border-bottom: 1px solid ${props => props.theme.colours.borderGrey};
    }
  }

  .rbc-header {
    padding: 10px 3px;
    background: ${props => props.theme.colours.unoBlue};
    color: white;
    border: none !important;
  }

  .rbc-off-range-bg {
    background: ${props => props.theme.colours.lightgrey} !important;
    cursor: not-allowed;
    position: relative;
    z-index: 5;
  }

  .rbc-off-range a {
    color: ${props => props.theme.colours.grey} !important;
  }

  .rbc-date-cell {
    padding: 4px 5px;
    a {
      color: ${props => props.theme.colours.unoBlue};
      font-weight: ${props => props.theme.fonts.weight.bold};
    }
  }

  .rbc-today {
    background-color: ${props => props.theme.colours.lightBlue};
  }

  .rbc-day-bg:not(.rbc-today):not(.rbc-off-range-bg) {
    cursor: pointer;
    position: relative;
    &:before {
      transition: all 500ms;
      position: absolute;
      content: 'Create a booking';
      font-size: ${props => props.theme.fonts.pixelSize.xsmall}px;
      color: ${props => props.theme.colours.white};
      top: calc(50% - 11px);
      left: calc(50% - 20px);
      width: 40px;
    }
    &:hover {
      &:before {
        color: ${props => props.theme.colours.grey};
        font-size: ${props => props.theme.fonts.pixelSize.small}px;
        top: calc(50% - 16px);
        left: calc(50% - 28px);
        width: 56px;
      }
    }
    &:nth-child(6),
    &:nth-child(7) {
      &:before {
        color: transparent;
        &:hover {
          &:before {
            color: transparent;
          }
        }
      }
    }
  }
`;

export const CalendarLayoutContainer = styled.div`
  display: flex;

  .calendar {
    flex-grow: 1;
    margin-right: 20px;
  }
`;
