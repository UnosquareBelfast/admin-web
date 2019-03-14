import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {
  Dashboard,
  Login,
  Admin,
  User,
  Profile,
  TeamDashboard,
  Register,
} from './pages';
import { LoginLoader } from './components/';
import { ThemeProvider } from 'styled-components';
import { PropTypes as PT } from 'prop-types';
import { theme } from './styled';
import Layout from './hoc/Layout';
import AuthUserAndStore from './hoc/AuthUserAndStore';

/* 
  Used to extend moment and use moment.range
  throughout the application
*/
import Moment from 'moment';	
import { extendMoment } from 'moment-range';	
const moment = extendMoment(Moment);

const authRoutes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/team" component={TeamDashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/user/:userId" component={User} />
      <Redirect to="/" />
    </Switch>
  </Layout>
);

const loginRoutes = (
  <Switch>
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Redirect to="/login" />
  </Switch>
);

class App extends React.Component {
  static propTypes = {
    drawerOpen: PT.bool,
    history: PT.object,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthUserAndStore
          render={(isAuthenticated, isRegistered, isLoading) => {
            if (isLoading) return <LoginLoader />;
            return isAuthenticated && isRegistered ? authRoutes : loginRoutes;
          }}
        />
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
