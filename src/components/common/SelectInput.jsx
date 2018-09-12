import React from 'react';
import PropTypes from 'prop-types';
/*
  options should be an array of this type
  let options = [
    {
      text: 'Option Value',
      value: 'option-value'
    }
  ]
*/
const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {
  let wrapperClass = 'form-group';
  if(error && error.length > 0) {
    wrapperClass += ' was-validated';
  }
  // <div class="form-group was-validated">
  //   <select class="custom-select" required>
  //     <option value="">Open this select menu</option>
  //     <option value="1">One</option>
  //     <option value="2">Two</option>
  //     <option value="3">Three</option>
  //   </select>
  //   <div class="invalid-feedback">Example invalid custom select feedback</div>
  // </div>
  return(
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control custom-select"
        required
      >
      <option value="">{defaultOption}</option>
      {options.map((option, index)=> {
        return <option key={index} value={option.value}>{option.text}</option>;
      })}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
