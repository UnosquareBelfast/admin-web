import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';

export const CreateTeam = props => {
  return (
    <div>
      <h2>Create Team</h2>
    </div>
  );
};

CreateTeam.propTypes = {};

CreateTeam.defaultProps = {};

export default container(CreateTeam);
