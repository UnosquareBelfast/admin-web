import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Container from './container';
import { Modal } from '../../components/common';
import { FormStyleContainer } from '../common_styled/FormStyleContainer';
import { withFormik } from 'formik';

const FormikEnhancer = withFormik({
  displayName: 'Edit Client Form',

  // This updates the form when props change.
  enableReinitialize: true,

  // validateOn

  mapPropsToValues: ({ client }) => ({
    clientName: client ? client.clientName : '',
  }),

  // Custom sync validation
  validate: values => {
    const { clientName } = values;
    let errors = {};
    if (clientName === '') {
      errors.clientName = 'Client name cannot be empty.';
    }
    return errors;
  },

  handleSubmit: (payload, bag) => {
    bag.props.handleFormSubmit(bag.props.client, payload);
  },
});

class EditTeamModal extends Component {
  static propTypes = {
    client: PT.object,
    closeModal: PT.func.isRequired,
    values: PT.object.isRequired,
    errors: PT.object.isRequired,
    handleChange: PT.func.isRequired,
    handleSubmit: PT.func.isRequired,
  };

  render() {
    const {
      client,
      closeModal,
      values,
      errors,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <Modal closeModal={() => closeModal()}>
        <div>
          <h2>Edit {client.clientName}</h2>
          <FormStyleContainer>
            <form onSubmit={handleSubmit}>
              <label htmlFor="clientName">New Client Name</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={values.clientName}
                onChange={handleChange}
                className={errors.clientName ? 'error' : ''}
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
