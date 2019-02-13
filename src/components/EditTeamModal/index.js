import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Container from './container';
import { Modal } from '../../components/common';
import { FormStyleContainer } from '../common_styled/FormStyleContainer';
import { withFormik } from 'formik';

const FormikEnhancer = withFormik({
  displayName: 'Edit Team Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn

  mapPropsToValues: ({ team }) => ({
    teamName: team ? team.teamName : '',
  }),

  // Custom sync validation
  validate: values => {
    const { teamName } = values;
    let errors = {};
    if (teamName === '') {
      errors.teamName = 'Team name cannot be empty.';
    }
    return errors;
  },

  handleSubmit: (payload, bag) => {
    bag.props.handleFormSubmit(bag.props.team, payload);
  },
});

class EditTeamModal extends Component {
  static propTypes = {
    team: PT.object,
    closeModal: PT.func.isRequired,
    values: PT.object.isRequired,
    errors: PT.object.isRequired,
    handleChange: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
  };

  render() {
    const {
      team,
      closeModal,
      values,
      errors,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <Modal closeModal={() => closeModal()}>
        <div>
          <h2>Edit {team.teamName}</h2>
          <FormStyleContainer>
            <form onSubmit={handleSubmit}>
              <label htmlFor="teamName">New Team Name</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
                className={errors.teamName ? 'error' : ''}
              />
              <button type="submit" disabled={Object.keys(errors).length > 0}>
                Submit
              </button>
            </form>
          </FormStyleContainer>
        </div>
      </Modal>
    );
  }
}

export default Container(FormikEnhancer(EditTeamModal));
