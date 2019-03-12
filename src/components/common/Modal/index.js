import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Rodal from 'rodal';

const Modal = props => {
  const { children, visible, closeModal, width, height } = props;

  return (
    <Rodal
      visible={visible}
      onClose={closeModal}
      customStyles={{
        width: width,
        minWidth: '400px',
        height: height,
        bottom: 'auto',
        top: '60px',
      }}
    >
      {children}
    </Rodal>
  );
};

Modal.propTypes = {
  width: PT.string,
  height: PT.string,
  children: PT.node.isRequired,
  closeModal: PT.func,
  visible: PT.bool,
};

Modal.defaultProps = {
  width: '35%',
  height: 'auto',
  closeModal: () => { },
  visible: true,
};

export default Modal;
