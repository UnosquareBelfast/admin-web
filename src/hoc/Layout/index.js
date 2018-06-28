import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import Header from './header';
import { Drawer, LayoutContainer, Input } from './styled';

const Layout = props => {
  console.log('props :', props);
  return (
    <Fragment>
      <Input type="checkbox" id="toggle-drawer" />
      <Drawer>
        <Header
          className="header"
          isAuthenticated={props.isAuthenticated}
          userDetails={props.userDetails}
          history={props.history}
        />
      </Drawer>
      <LayoutContainer history={props.history.location.pathname}>
        {props.children}
      </LayoutContainer>
    </Fragment>
  );
};

Layout.propTypes = {
  userDetails: PT.object,
  history: PT.object,
  isAuthenticated: PT.bool,
  children: PT.node
};

export default Layout;
