import React, { Fragment } from 'react';
import container from './container';
import { PropTypes as PT } from 'prop-types';
import NavMenu from './nav-menu';
import { LayoutContainer, Input } from './styled';

export const Layout = props => {
  let drawer = null;
  if (props.isAuthenticated) {
    drawer = (
      <Fragment>
        <Input type="checkbox" id="toggle-drawer" />
        <NavMenu
          isAuthenticated={props.isAuthenticated}
          userDetails={props.userDetails}
          history={props.history}
          menuItems={props.menuItems}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {drawer}
      <LayoutContainer history={props.history.location.pathname}>
        {props.children}
      </LayoutContainer>
    </Fragment>
  );
};

Layout.propTypes = {
  menuItems: PT.array,
  userDetails: PT.object,
  history: PT.object,
  isAuthenticated: PT.bool,
  children: PT.node,
};
export default container(Layout);
