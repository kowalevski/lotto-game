import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ time }) => {
  return (
    <div>
      <span role="img" aria-label="time">
        ⏳
      </span>
      <span>{time}s</span>
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired
};

export default Timer;
