import React from 'react';

const checkbox = ({ buttonText, checked, toggleCheckbox }) => {
  return (
    <div>
      <input
        type="checkbox"
        name={buttonText}
        label={buttonText}
        checked={checked}
        onChange={toggleCheckbox}
      />
      {buttonText}
    </div>
  );
};

export default checkbox;
