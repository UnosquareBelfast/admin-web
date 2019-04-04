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

  const disabledLink = text => <a className="disabled">{text}</a>;
  const validLink = text => <Link to={linkTo}>{text}</Link>;
  const sectionLink = () => {
    if (isLoading) { return disabledLink(`${title} are loading...`); }
    if (hasError) { return disabledLink(error); }
    if (resultCount === 0) { return  disabledLink(`No ${title} created`); }
    return validLink(`View All ${title} (${resultCount})`);
  };

  return (
    <div>
      <h3>{title}</h3>
      {sectionLink()}

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
