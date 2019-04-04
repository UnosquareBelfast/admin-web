import { UPDATE_USER, RESET_USER } from '../actions/actionTypes';
import initialState from './initialState';

// Reducer
export default function userReducer(state = initialState.user, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [UPDATE_USER]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [RESET_USER]: () => ({
    ...initialState,
  }),
};

// Private Selectors
export const getUser = store => store;
export const getUserId = store => store.employeeId;
export const getHolidayStats = store => store.holidays;
