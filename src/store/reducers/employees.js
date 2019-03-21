
import initialState from './initialState';

import {
  FETCHING_EMPLOYEES,
  FETCHING_EMPLOYEES_SUCCESS,
  FETCHING_EMPLOYEES_FAILURE,
  UPDATE_SELECTED_EMPLOYEE,
} from '../actions/actionTypes';

// Reducer
export default function employeesReducer(state = initialState.employees, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [FETCHING_EMPLOYEES]: state => ({
    ...state,
    isLoading: true,
    employees: [],
    hasError: false,
    error: null,
  }),
  [FETCHING_EMPLOYEES_SUCCESS]: (state, action) => ({
    ...state,
    resultCount: action.resultCount,
    employees: action.employees,
    isLoading: false,
    hasError: false,
    error: null,
  }),
  [FETCHING_EMPLOYEES_FAILURE]: (state, action) => ({
    ...state,
    resultCount: action.resultCount,
    isLoading: false,
    hasError: true,
    error: action.error,
  }),
  [UPDATE_SELECTED_EMPLOYEE]: (state, action) => ({
    ...state,
    selectedEmployeeId: action.selectedEmployeeId,
  }),
};

// Private selectors
export const getEmployeesLoading = ({ isLoading, hasError, error, resultCount }) => {
  return {
    isLoading,
    hasError,
    error,
    resultCount,
  };
};
export const getAllEmployees = store => store.employees;
export const getEmployeeCount = store => store.resultCount;
export const getSelectedEmployeeId = store => store.selectedEmployeeId;
