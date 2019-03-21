import initialState from './initialState';
import { SET_LOADING } from '../actions/actionTypes';

// Reducer
export default function loadingReducer(state = initialState.loading, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload.isLoading,
    startedAt: action.payload.startedAt,
  }),
};

// Private Selectors
export const isLoading = store => store.loading;
export const loadingSince = store => store.startedAt;
