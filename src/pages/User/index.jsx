import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayList } from '../../components';
import { Container, Splitter } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faArrowLeft,
} from '@fortawesome/fontawesome-free-solid';
import { roleText } from '../../utilities/roles';

export const User = props => {
  if (!props.profileUser) return null;
  const { profileHolidays } = props;
  const { forename, surname, email, employeeRoleId } = props.profileUser;

  return (
    <Container>
      <div>
        <p className="return" onClick={props.history.goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />Return
        </p>
      </div>
      <div>
        <h1>
          {forename} {surname}
        </h1>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />
          {email}
        </p>
        <p>
          <FontAwesomeIcon icon={faIdCard} />
          {roleText[employeeRoleId]}
        </p>
      </div>
      <Splitter />
      <div>
        <h2>Holidays</h2>
        <HolidayList
          holidays={profileHolidays}
          columns={['status', 'startDate', 'endDate', 'requestedDate']}
          actions={['approve', 'reject']}
        />
      </div>
    </Container>
  );
};

User.propTypes = {
  localUser: PT.object,
  profileUser: PT.object,
  profileHolidays: PT.array,
  history: PT.object,
};

export default container(User);
