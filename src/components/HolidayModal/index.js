import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Modal, Button } from '../../components/common';
import { StyleContainer, Stat, StatWrap, ButtonWrap, StatusH2 } from './styled';
import { getEventDayAmount } from '../../utilities/dates';
import { statusText } from '../../utilities/holidayStatus';

const HolidayModal = ({
  closeModal,
  holiday,
  approveHoliday,
  rejectHoliday,
}) => {
  const { start, end, employee, eventStatus, holidayId } = holiday;
  const { forename, surname, email } = employee;

  const duration = getEventDayAmount(holiday);
  return (
    <Modal closeModal={closeModal}>
      <StyleContainer>
        <div>
          <h2>Manage Holiday</h2>
          <p>
            {forename} {surname} - {email}
          </p>
        </div>
        <StatWrap>
          <Stat>
            <StatusH2 status={eventStatus.eventStatusId}>
              {statusText[eventStatus.eventStatusId]}
            </StatusH2>
            <h4>Status</h4>
          </Stat>
        </StatWrap>
        <StatWrap>
          <Stat>
            <h2>{start.format('DD/MM/YYYY')}</h2>
            <h4>Holiday Start</h4>
          </Stat>
          <Stat>
            <h2>{end.format('DD/MM/YYYY')}</h2>
            <h4>Holiday End</h4>
          </Stat>
          <Stat>
            <h2>
              {duration} {duration > 1 ? 'Days' : 'Day'}
            </h2>
            <h4>Duration</h4>
          </Stat>
        </StatWrap>
        <ButtonWrap>
          <Button
            label={['Approve', 'Are you sure?']}
            onClick={() => approveHoliday(holidayId)}
          />
          <Button
            label={['Reject', 'Are you sure?']}
            onClick={() => rejectHoliday(holidayId)}
          />
        </ButtonWrap>
      </StyleContainer>
    </Modal>
  );
};

HolidayModal.propTypes = {
  user: PT.object,
  closeModal: PT.func.isRequired,
  holiday: PT.object.isRequired,
};

export default container(HolidayModal);
