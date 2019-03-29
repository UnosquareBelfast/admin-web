import * as actionTypes from './actionTypes';

import { getAllUsers } from '../../services/userService';

const _fetchAllEmployees = () => {
  return {
    type: actionTypes.FETCHING_EMPLOYEES,
  };
};

const _fetchAllEmployeesFailed = error => {
  return {
    type: actionTypes.FETCHING_EMPLOYEES_FAILURE,
    error,
    resultCount: 0,
  };
};

const _fetchAllEmployeesSuccess = (employees, resultCount) => {
  return {
    type: actionTypes.FETCHING_EMPLOYEES_SUCCESS,
    employees,
    resultCount,
  };
};

export const updateSelectedEmployee = selectedEmployeeId => {
  return {
    type: actionTypes.UPDATE_SELECTED_EMPLOYEE,
    selectedEmployeeId,
  };
};

// Thunks

export const fetchAllEmployees = () => dispatch => {
  dispatch(_fetchAllEmployees());

  getAllUsers()
    .then(({data: employees}) => {
      dispatch(_fetchAllEmployeesSuccess(employees, employees.length));
    })
    .catch( error => {
      dispatch(_fetchAllEmployeesFailed(error));
    });
};
