import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { getAllEmployees } from '../../../../store/reducers';

const CreateContractFormsContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      employees: PT.array,
      onSuccess: PT.func,
    };

    state = {
      employeesOptions: [],
    };

    handleUserSectionSubmit = ({ employeeId }) => {

      let selectedEmployee = this.state.employeesOptions.filter(
        employee => employee.value == employeeId
      )[0];

      const data = {
        selectedEmployee,
      };

      return this.props.onSuccess(data);
    };

    handleSearchEmployees = (fullName) => {

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

    handleUserFormReset = resetForm => {
      this.setState({
        employeesOptions: [],
      }, () => {
        resetForm();
      });
    };

    render() {
      return (
        <Wrapped
          employees={this.state.employeesOptions}
          handleUserSectionSubmit={this.handleUserSectionSubmit}
          searchEmployees={this.handleSearchEmployees}
          handleFormReset={this.handleUserFormReset}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    employees: getAllEmployees(state),
  };
};

export default compose(connect(mapStateToProps), CreateContractFormsContainer);
