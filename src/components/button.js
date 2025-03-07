import React from 'react';
import '../styles/button.css'

const Button = ({ onClick }) => {
  return (
    <div className="reset-overlay">
      <button className="reset-button" onClick={onClick}>
        Play again
      </button>
    </div>
  );
};

export default Button;
