import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Dashboard, Login, Admin, User, Profile, TeamDashboard } from './pages';
import { ThemeProvider } from 'styled-components';
import { PropTypes as PT } from 'prop-types';
import { theme } from './styled';
import Layout from './hoc/Layout';
import AuthUserAndStore from './hoc/AuthUserAndStore';

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
          render={(isAuthenticated, isLoading) => {
            if (isLoading) return <p>loading..</p>;
            return isAuthenticated ? authRoutes : loginRoutes;
          }}
        />
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
