import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      modalVisible: PT.bool.isRequired,
      toggleModal: PT.func.isRequired,
      selectedBooking: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    setView = view => this.setState({ view });

    render() {
      const { modalVisible, toggleModal, selectedBooking } = this.props;

      return (
        <Wrapped
          modalVisible={modalVisible}
          toggleModal={toggleModal}
          selectedBooking={selectedBooking}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(connect(mapStateToProps, mapDispatchToProps), Container);
