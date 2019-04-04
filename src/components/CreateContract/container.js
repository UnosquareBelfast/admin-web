import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getEmployeeCount, getTeamCount, getClientCount } from '../../store/reducers';

import { createContract } from '../../services/contractService';
import swal from 'sweetalert2';
import { Toast } from '../../config/Notifications';

const CreateContractContainer = Wrapped =>
  class extends Component {

    static propTypes = {
      employeeCount: PT.number.isRequired, 
      teamCount: PT.number.isRequired, 
      clientsCount: PT.number.isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {
        contractData: {},
        step: 1,
      };
    }

    updateFormState = formData => {
      this.setState({
        contractData: {
          ...this.state.contractData,
          ...formData,
        },
      });
    };

    nextStep = formData => {
      this.setState({
        step: this.state.step + 1,
      });

      if (formData) {
        this.updateFormState(formData);
      }
    };

    complete = () => {
      Toast({
        type: 'success',
        title: 'Contract created successfully! 👍',
      });
      this.setState({
        contractData: {},
        step: 1,
      });
    };

    submitContract = formData => {
      this.setState(
        {
          contractData: {
            ...this.state.contractData,
            ...formData,
          },
        },
        () => {
          const { 
            contractData:  {
              selectedEmployee, 
              selectedTeam, 
              startDate, 
              endDate, 
              isOpenEnded,
            },
          } = this.state;

          const contractRequest = {
            employeeId: selectedEmployee.value,
            teamId: selectedTeam.value,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          };

          if (isOpenEnded) {
            delete contractRequest.endDate;
          }

          createContract(contractRequest)
            .then(() => this.complete())
            .catch(error =>
              swal('Error Creating Contract', error.message, 'error')
            );
        }
      );
    };

    configFormRequirements = () => {
      const { employeeCount, teamCount, clientsCount } = this.props; 
      return {
        employeesExist: employeeCount > 0,
        teamsExist: teamCount > 0,
        clientsExist: clientsCount > 0,
      };
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          formRequirements={this.configFormRequirements()}
          step={this.state.step}
          nextStep={this.nextStep}
          submit={this.submitContract}
          contract={this.state.contractData}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    employeeCount: getEmployeeCount(state),
    teamCount: getTeamCount(state),
    clientsCount: getClientCount(state),
  };
};

export default compose(connect(mapStateToProps), CreateContractContainer);

