import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { getAllEmployees, getTeamsOptions } from '../../store/reducers';
import swal from 'sweetalert2';

import {
  getContractsByEmployeeId,
  getContractsByTeamId,
  getContractByEmployeeIdAndTeamId,
} from '../../services/contractService';

const ViewContractsContainer = Wrapped =>
  class extends Component {

    static propTypes = {
      employees: PT.array,
      teams: PT.object,
      history: PT.shape({
        push: PT.func.isRequired,
      }),
    }

    constructor(props) {
      super(props);
      this.state = {
        employeesOptions: [],
        selectedEmployeeId: -1,
        selectedTeamId: -1,
        contracts: [],
      };
    }

    _byEmployeeId = (selectedEmployeeId) => {
      getContractsByEmployeeId(selectedEmployeeId).then(response => {
        const contracts = response.status === 200 ? response.data : [];
        this.setState({ contracts });
      })
        .catch(error =>
          swal('Error'`Error finding contracts: ${error.message}`, 'error')
        );
    }

    _byTeamId = (selectedTeamId) => {
      getContractsByTeamId(selectedTeamId)
        .then(response => {
          const contracts = response.status === 200 ? response.data : [];
          this.setState({ contracts });
        })
        .catch(error =>
          swal('Error'`Error finding contracts: ${error.message}`, 'error')
        );
    }

    _byEmployeeIdAndTeamId = (selectedEmployeeId, selectedTeamId) => {
      getContractByEmployeeIdAndTeamId(selectedEmployeeId, selectedTeamId)
        .then(response => {
          const contracts = response.status === 200 ? response.data : [];
          this.setState({ contracts });
        })
        .catch(error =>
          swal('Error'`Error finding contracts: ${error.message}`, 'error')
        );
    }

    getContracts = (name, id) => {

      const obj = {};
      obj[name] = parseInt(id);

      this.setState(obj, () => {

        const { selectedEmployeeId, selectedTeamId } = this.state;

        const searchByEmployees = selectedEmployeeId !== -1 && selectedTeamId === -1;
        const searchByTeams = selectedTeamId !== -1 && selectedEmployeeId === -1;
        const searchByBoth = selectedTeamId !== -1 && selectedEmployeeId !== -1;

        if (searchByEmployees) {
          this._byEmployeeId(selectedEmployeeId);
        } else if (searchByTeams) {
          this._byTeamId(selectedTeamId);
        } else if (searchByBoth) {
          this._byEmployeeIdAndTeamId(selectedEmployeeId, selectedTeamId);
        } else {
          this.setState({ contracts: [] });
        }
      });

    };

    getEmployees = ({ fullName }) => {

      const employees = this.props.employees.filter(({ forename, surname }) => {
        const fullname = `${forename} ${surname}`;
        return fullname.includes(fullName);
      });

      const employeesOptions = employees.reduce((acc, employee) => {
        acc.push({
          value: employee.employeeId,
          displayValue: `${employee.forename} ${employee.surname} (${employee.email})`,
        });
        return acc;
      }, []);
      employeesOptions.unshift({
        value: '-1',
        displayValue: 'Please select an employee',
      });
      this.setState(
        {
          employeesOptions,
        }
      );
    };

    render() {

      const { history, employees, teams } = this.props;

      return (
        <Wrapped
          navigateTo={history.push}
          employeeCount={employees.length}
          teamOptions={teams.teamOptions}
          employeesOptions={this.state.employeesOptions}
          contracts={this.state.contracts}
          getEmployees={this.getEmployees}
          contractSearch={this.getContracts}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    employees: getAllEmployees(state),
    teams: getTeamsOptions(state),
  };
};

export default compose(connect(mapStateToProps), ViewContractsContainer);