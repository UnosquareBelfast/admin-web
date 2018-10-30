import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/fontawesome-free-solid';

const AlertMessage = ({ title, children }) => {
  return (
    <StyleContainer>
      <p>
        <FontAwesomeIcon icon={faExclamationCircle} />
        <span>{title}</span>
      </p>
      <p>{children}</p>
    </StyleContainer>
  );
};

AlertMessage.propTypes = {
  children: PT.string.isRequired,
  title: PT.string.isRequired,
};

export default AlertMessage;
