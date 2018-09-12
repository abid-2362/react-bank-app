import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, label, onChange, placeholder, value, error}) => {
  let wrapperClass = 'form-group';
  let inputClass = 'form-control';
  if(error && error.length > 0) {
    wrapperClass += ' has-danger';
    inputClass += ' is-invalid';
  }
  return(
    <div className={wrapperClass}>
      <label className="form-control-label" htmlFor={name}>{label}</label>
      <div className="field">
        <input type="text"
          name={name}
          id={name}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
}

export default TextInput;