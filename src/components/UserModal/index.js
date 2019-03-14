import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Modal, Email } from '../../components/common';
import { StyleContainer, Stat, StatWrap } from './styled';

const UserModal = ({
  user,
  closeModal,
  approvedDays,
  pendingDays,
  availableDays,
}) => {
  return (
    <Modal closeModal={closeModal}>
      <StyleContainer>
        <div>
          <h2>{user.name ? user.name : `${user.forename} ${user.surname}`}</h2>
          <Email>{user.email}</Email>
        </div>
        <StatWrap>
          <Stat>
            <h2>{approvedDays} Days</h2>
            <h4>Holidays Booked</h4>
          </Stat>
          <Stat>
            <h2>{pendingDays} Days</h2>
            <h4>Holidays Pending</h4>
          </Stat>
          <Stat>
            <h2>{availableDays} Days</h2>
            <h4>Holidays Remaining</h4>
          </Stat>
        </StatWrap>
      </StyleContainer>
    </Modal>
  );
};

UserModal.propTypes = {
  closeModal: PT.func,
  userDetails: PT.object.isRequired,
  user: PT.object,
  userHolidays: PT.array,
  hasPermission: PT.bool,
  approvedDays: PT.number,
  pendingDays: PT.number,
  totalHolidays: PT.number,
  availableDays: PT.number,
};

UserModal.defaultProps = {
  userHolidays: [],
};

export default container(UserModal);
