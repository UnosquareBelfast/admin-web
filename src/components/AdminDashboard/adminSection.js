import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Link } from 'react-router-dom';

const AdminSection = (props) => {
  const {
    title,
    linkTo,
    createLinkTo,
    config: {
      isLoading,
      hasError,
      error,
      resultCount,
    },
  } = props;

  return (
    <div>
      <h3>{title}</h3>
      {
        isLoading ?
          <a className="disabled">{title} are loading...</a>
          :
          hasError ?
            <a className="disabled">{error}</a>
            :
            resultCount === 0 ?
              <a className="disabled">No {title} created</a>
              :
              <Link to={linkTo}>View All {title} ({resultCount})</Link>
      }

      {
        createLinkTo !== '/admin' &&
        <Link to={createLinkTo}>Create a {title.slice(0, -1)}</Link>
      }
    </div>
  );
};

AdminSection.propTypes = {
  title: PT.string,
  linkTo: PT.string,
  createLinkTo: PT.string,
  config: PT.shape({
    isLoading: PT.bool,
    hasError: PT.bool,
    error: PT.string,
    resultCount: PT.number,
  }),
};

AdminSection.defaultProps = {
  createLinkTo: '/admin',
  config: {
    isLoading: false,
    hasError: false,
    error: null,
  },
};

export default AdminSection;