import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Container from './container';
import { Modal } from '../../components/common';
import { withFormik, Form, Field } from 'formik';
import { InputField } from '../common/Formik';
import { Button } from '../common/Formik/styled';

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
    client: PT.shape({
      clientId: PT.number.isRequired,
      clientName: PT.string.isRequired,
    }),
    closeModal: PT.func.isRequired,
    isValid: PT.bool.isRequired,
  };

  render() {
    const {
      client,
      closeModal,
      isValid,
    } = this.props;

    return (
      <Modal closeModal={() => closeModal()}>
        <h2>Edit {client.clientName}</h2>
        <Form>
          <Field
            component={InputField}
            title="Client Name"
            name="clientName"
            placeholder="Enter a client name"
          />
          <Button type="submit" disabled={!isValid}>
            Update client
          </Button>
        </Form>
      </Modal>
    );
  }
}

export default Container(FormikEnhancer(EditTeamModal));
