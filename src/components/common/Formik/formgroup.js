import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { InputGroup, Label, Error } from './styled';

const FormGroup = (props) => {

  const { 
    layout,
    title, 
    name, 
    error, 
    children,
  } = props;
  
  const formatCss = () => {    

    let formGroupCss = [];
    formGroupCss.push(layout);

    if (error !== '') {
      formGroupCss.push('invalid');
    }

    return formGroupCss.join(' ');
    
  };

  return (
    <InputGroup
      className={formatCss()}
    >
      <Label htmlFor={name}>{title}</Label>
      {children}
      {
        error !== '' &&
        <Error>{error}</Error>
      }
    </InputGroup>
  );
};

FormGroup.propTypes = {
  layout: PT.string,
  title: PT.string, 
  name: PT.string,
  children: PT.node,
  error: PT.string, 
};

FormGroup.defaultProps = {
  layout: 'block-layout',
  error: '',
};

export default FormGroup;
