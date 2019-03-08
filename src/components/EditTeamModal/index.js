import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Container from './container';
import { Modal } from '../../components/common';
import { withFormik, Form, Field } from 'formik';
import { InputField } from '../common/Formik';
import { Button } from '../common/Formik/styled';

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
    team: PT.shape({
      clientId: PT.number.isRequired,
      teamId: PT.number.isRequired,
      teamName: PT.string.isRequired,
    }),
    closeModal: PT.func.isRequired,
    isValid: PT.bool.isRequired,
  };

  render() {
    const {
      team,
      closeModal,
      isValid,
    } = this.props;

    return (
      <Modal closeModal={() => closeModal()}>
        <h2>Edit {team.teamName}</h2>
        <Form>
          <Field
            component={InputField}
            title="Team Name"
            name="teamName"
            placeholder="Enter a team name"
          />
          <Button type="submit" disabled={!isValid}>
            Update team
          </Button>
        </Form>
      </Modal>
    );
  }
}

export default Container(FormikEnhancer(EditTeamModal));
