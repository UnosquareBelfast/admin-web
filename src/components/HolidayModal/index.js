import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import container from './container';
import { Modal, Button, Email } from '../../components/common';
import { StyleContainer, Stat, FlexWrap, ButtonWrap, StatusH2 } from './styled';
import { getEventDayAmount } from '../../utilities/dates';
import { statusText } from '../../constants/holidayStatus';
import roles from '../../constants/roles';
import { Input } from '../common/Formik/styled';
import holidayStatus from '../../constants/holidayStatus';
import { Messaging } from '../';

const HolidayModal = ({
  closeModal,
  holiday,
  approveHoliday,
  rejectHoliday,
  userDetails,
  showAdminControls,
  toggleHolidayModalExpansion,
  toggled,
  assignRejectionReasonText,
  capturedRejectionReasonText,
}) => {
  const { employee, eventStatus, eventId } = holiday;
  const { forename, surname, email, employeeId } = employee;
  const isAdmin = userDetails.employeeRoleId === roles.ADMIN;

  const start = moment(holiday.eventDates[0].startDate);
  const end = moment(holiday.eventDates[holiday.eventDates.length - 1].endDate);

  const shouldShowAdminControls = () => {
    if (!isAdmin) return false;
    if (userDetails.employeeId === employeeId) return false;
    if (!showAdminControls) return false;
    if (eventStatus.eventStatusId === holidayStatus.CANCELLED) return false;
    return true;
  };

  const duration = getEventDayAmount(holiday);
  const disableRejectionReasonButton = !capturedRejectionReasonText.length > 0;
  const displayMessages = userDetails.employeeId !== employeeId;
  
  return (
    <Modal 
      closeModal={closeModal} 
      width={ shouldShowAdminControls() ? '60%' : '40%' }
      height={ displayMessages ? '80vh' : 'auto' }
    >
      <StyleContainer>
        <div>
          <h2>Manage Holiday</h2>
          <p>
            {forename} {surname} - <Email>{email}</Email>
          </p>
        </div>
        <FlexWrap>
          <Stat>
            <StatusH2 status={eventStatus.eventStatusId}>
              {statusText[eventStatus.eventStatusId]}
            </StatusH2>
            <h4>Status</h4>
          </Stat>
        </FlexWrap>

        <FlexWrap>
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
        </FlexWrap>
        {shouldShowAdminControls() &&
          (!toggled && (
            <Fragment>
              { 
                displayMessages &&
                <Messaging hideNav eventId={eventId} />
              }
              <Stat>
                <ButtonWrap>
                  <Button label="Approve" onClick={approveHoliday} />
                  <Button
                    label="Reject"
                    onClick={() => toggleHolidayModalExpansion(true)}
                  />
                </ButtonWrap>
              </Stat>
            </Fragment>
          ))}
        {toggled && (
          <div>
            <FlexWrap>
              <Stat>
                <h2>{'Rejection Reason'}</h2>
                <Input onChange={assignRejectionReasonText} placeholder="Enter a reason" />
              </Stat>
            </FlexWrap>
            <FlexWrap>
              <ButtonWrap>
                <Button
                  title={
                    disableRejectionReasonButton ? 'Enter Message First' : ''
                  }
                  disabled={disableRejectionReasonButton}
                  label="Confirm Rejection"
                  onClick={() => rejectHoliday()}
                />
              </ButtonWrap>
            </FlexWrap>
          </div>
        )}
      </StyleContainer>
    </Modal>
  );
};

HolidayModal.propTypes = {
  closeModal: PT.func.isRequired,
  capturedRejectionReasonText: PT.string.isRequired,
  capturedRejectionReponseText: PT.string.isRequired,
  toggleHolidayModalExpansion: PT.func.isRequired,
  toggled: PT.bool,
  holiday: PT.object.isRequired,
  assignRejectionReasonText: PT.func.isRequired,
  approveHoliday: PT.func.isRequired,
  rejectHoliday: PT.func.isRequired,
  userDetails: PT.object.isRequired,
  showAdminControls: PT.bool.isRequired,
  toggleRejectionMessageResponse: PT.func.isRequired,
  rejectionReasonResponse: PT.bool.isRequired,
  assignRejectionResponseText: PT.func.isRequired,
};

export default container(HolidayModal);
