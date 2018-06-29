import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import container from './container';
import {
  CreateUser,
  UserListing,
  PendingHolidays,
  AllHolidays,
  AdminDashboard,
} from '../../components';
import { withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Container, MainContentContainer, Refresh } from './styled';

export const Admin = props => (
  <Container>
    <MainContentContainer>
      <Switch>
        <Route path="/admin/createEmployee" component={CreateUser} />
        <Route
          path="/admin/employees"
          render={() => (
            <Fragment>
              <h2>Employees</h2>
              <Refresh onClick={props.refreshUsers}>Refresh</Refresh>
              <UserListing history={props.history} users={props.users} />
            </Fragment>
          )}
        />
        <Route path="/admin/pendingHolidays" component={PendingHolidays} />
        <Route path="/admin/holidays" component={AllHolidays} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </MainContentContainer>
  </Container>
);

Admin.propTypes = {
  userDetails: PT.object,
  users: PT.array,
  refreshUsers: PT.func,
  history: PT.object,
};

const enhance = flowRight(withAuth, container);
export default enhance(Admin);
