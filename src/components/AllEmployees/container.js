import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes as PT } from 'prop-types';
import { getEmployeesLoading, getAllEmployees, getSelectedEmployeeId } from '../../store/reducers';
import { updateSelectedEmployee } from '../../store/actions/employees';

const AllEmployeesContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      updateSelectedEmployee: PT.func,
      selectedEmployeeId: PT.oneOfType([
        PT.string,
        PT.number,
      ]),
      getEmployeesLoading: PT.object,
      employees: PT.array,
      history: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        userModalVisible: false,
      };
    }

    selectEmployeeHandler = selectedEmployeeId => {
      this.props.updateSelectedEmployee(selectedEmployeeId);
      this.setState({ userModalVisible: true });
    }

    closeUserModal = () => {
      this.setState({ userModalVisible: false });
    };

    render() {

      const { userModalVisible } = this.state;
      const { employees, selectedEmployeeId } = this.props;
      let selectedEmployee = employees.filter(({employeeId}) => employeeId === selectedEmployeeId)[0];

      return (
        <Wrapped
          employees={employees}
          selectedEmployee={selectedEmployee}
          selectEmployee={this.selectEmployeeHandler}
          userModalVisible={userModalVisible}
          closeUserModal={this.closeUserModal}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    getEmployeesLoading: getEmployeesLoading(state),
    employees: getAllEmployees(state),
    selectedEmployeeId: getSelectedEmployeeId(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedEmployee: selectedClient =>
      dispatch(updateSelectedEmployee(selectedClient)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), AllEmployeesContainer);
