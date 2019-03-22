import { combineReducers } from 'redux';
import userReducer, * as FromUser from './user';
import employeesReducer, * as FromEmployees from './employees';
import dashboardReducer, * as FromDashboard from './dashboard';
import teamsReducer, * as FromTeams from './teams';
import clientsReducer, * as FromClients from './clients';
import loadingReducer, * as FromLoading from './loading';

const USER = 'USER';
const EMPLOYEES = 'EMPLOYEES';
const TEAMS = 'TEAMS';
const CLIENTS = 'CLIENTS';
const DASHBOARD = 'DASHBOARD';
const LOADING = 'LOADING';

const rootReducer = combineReducers({
  [USER]: userReducer,
  [EMPLOYEES]: employeesReducer,
  [TEAMS]: teamsReducer,
  [CLIENTS]: clientsReducer,
  [DASHBOARD]: dashboardReducer,
  [LOADING]: loadingReducer,
});
export default rootReducer;

// Public Selectors//
/////////////////////

// User
export const getUser = store => FromUser.getUser(store[USER]);
export const getUserId = store => FromUser.getUserId(store[USER]);
export const getHolidayStats = store => FromUser.getHolidayStats(store[USER]);

//Dashboard
export const getEventView = store =>
  FromDashboard.getEventView(store[DASHBOARD]);

export const getAllEvents = store =>
  FromDashboard.getAllEvents(store[DASHBOARD]);

export const eventBeingUpdated = store =>
  FromDashboard.eventBeingUpdated(store[DASHBOARD]);

// Employees
export const getEmployeesLoading = store =>
  FromEmployees.getEmployeesLoading(store[EMPLOYEES]);

export const getAllEmployees = store =>
  FromEmployees.getAllEmployees(store[EMPLOYEES]);

export const getEmployeeCount = store =>
  FromEmployees.getEmployeeCount(store[EMPLOYEES]);

export const getSelectedEmployeeId = store =>
  FromEmployees.getSelectedEmployeeId(store[EMPLOYEES]);

// Teams
export const getTeamsLoading = store =>
  FromTeams.getTeamsLoading(store[TEAMS]);

export const getAllTeams = store =>
  FromTeams.getAllTeams(store[TEAMS]);

export const getTeamCount = store =>
  FromTeams.getTeamCount(store[TEAMS]);

export const getTeamsOptions = (store, clientId = -1) =>
  FromTeams.getTeamsOptions(store[TEAMS], clientId);

export const getSelectedTeamId = store =>
  FromTeams.getSelectedTeamId(store[TEAMS]);

// Clients
export const getClientsLoading = store =>
  FromClients.getClientsLoading(store[CLIENTS]);

export const getAllClients = store =>
  FromClients.getAllClients(store[CLIENTS]);

export const getClientCount = store =>
  FromClients.getClientCount(store[CLIENTS]);

export const getSelectedClientId = store =>
  FromClients.getSelectedClientId(store[CLIENTS]);

export const getClientOptions = store => 
  FromClients.getClientOptions(store[CLIENTS]);

export const getClientsLoadingStatus = store => 
  FromClients.getClientsLoadingStatus(store[CLIENTS]);

//Loading
export const isLoading = store => 
  FromLoading.isLoading(store[LOADING]);

export const loadingSince = store => 
  FromLoading.loadingSince(store[LOADING]);
