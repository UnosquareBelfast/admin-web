import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import UserForm from './CreateContractForms/user';
import TeamForm from './CreateContractForms/team';
import DateForm from './CreateContractForms/dates';
import { Steps, Button, StepsUI } from '../common';
import { CornerButton } from '../common_styled';
import { ContractStyle } from './styled';

export const CreateContract = props => {
  const { formRequirements, step, nextStep, submit, contract, history } = props;

  const {
    selectedEmployee,
    selectedTeam,
    selectedClient,
    startDate,
    endDate,
  } = contract;

  const renderRedirect = () => {
    const { employeesExist, teamsExist, clientsExist} = formRequirements;
    if (!employeesExist && !teamsExist && !clientsExist) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div>
      {renderRedirect()}
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/contracts')}
          label="View Contracts"
        />
      </CornerButton>
      <h2>Create Contract</h2>
      <ContractStyle>
        <h3>Contract Details</h3>
        <ul>
          {selectedEmployee ? (
            <li>
              <span>Name: </span>
              {selectedEmployee.displayValue}
            </li>
          ) : (
            <li>No contract details entered yet.</li>
          )}
          {selectedClient ? (
            <li>
              <span>Client: </span>
              {selectedClient.displayValue}
            </li>
          ) : null}
          {selectedTeam ? (
            <li>
              <span>Team: </span>
              {selectedTeam.displayValue}
            </li>
          ) : null}
          {startDate && endDate ? (
            <li>
              <span>Term: </span>
              {startDate.format('Do MMMM YYYY')} to{' '}
              {endDate.format('Do MMMM YYYY')}
            </li>
          ) : null}
        </ul>
      </ContractStyle>
      <StepsUI stepNumber={step} stepCount={3} />
      <Steps
        current={step}
        steps={[
          {},
          {
            title: 'Find Employee',
            component: <UserForm onSuccess={nextStep} />,
          },
          {
            title: 'Find Team',
            component: <TeamForm onSuccess={nextStep} />,
          },
          {
            title: 'Contract Dates',
            component: <DateForm onSuccess={submit} />,
          },
        ]}
      />
    </div>
  );
};

CreateContract.propTypes = {
  formRequirements: PT.object,
  step: PT.number.isRequired,
  nextStep: PT.func.isRequired,
  submit: PT.func.isRequired,
  contract: PT.object.isRequired,
  history: PT.object.isRequired,
};

CreateContract.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateContract);
