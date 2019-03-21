import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from './styled';

const StepsUI = (props) => {
  const { stepNumber, stepCount } = props;

  const getStepItemClassName = (currentStep) => {
    if (stepNumber === currentStep) {
      return 'steps__item steps__item--active';
    } else if (currentStep < stepNumber) {
      return 'steps__item steps__item--visited';
    } else {
      return 'steps__item';
    }
  };

  const steps = Array(stepCount).fill().map((_, index) => {
    const currentStep = index + 1;
    const stepItem = getStepItemClassName(currentStep);
    const zIndexStyle = {
      zIndex: stepCount - currentStep,
    };

    return (
      <li
        style={zIndexStyle}
        className={stepItem}
        key={currentStep}
      >
        {currentStep}
      </li>
    );
  });

  return (
    <Steps>
      <ul className="steps align-center">
        {steps}
      </ul>
    </Steps>
  );
};

StepsUI.propTypes = {
  stepNumber: PropTypes.number,
  stepCount: PropTypes.number,
};

StepsUI.defaultProps = {
  stepNumber: 1,
  stepCount: 2
};

export default StepsUI;

/*
  Usage Example - Current step number with tital number of steps
  <StepsUI stepNumber={1} stepCount={2} />
*/
