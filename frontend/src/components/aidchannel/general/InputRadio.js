import React from "react";

const InputRadio = ({ label, value, checked, setter }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="status"
        id={value}
        value="completed"
        checked={checked === value}
        onChange={() => setter(value)}
      />
      <label className="form-check-label" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
