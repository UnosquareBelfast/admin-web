import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCalendar, faHome, faSun} from '@fortawesome/fontawesome-free-solid';

export default {
  PUBLIC_HOLIDAY: 0,
  ANNUAL_LEAVE: 1,
  WFH: 2,
};

export const typeText = ['Public Holiday', 'Annual leave', 'Working remotely'];

export const typeIcons = [
  <FontAwesomeIcon icon={faSun} />,
  <FontAwesomeIcon icon={faCalendar} />,
  <FontAwesomeIcon icon={faHome} />,
];
