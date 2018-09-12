import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import { Link } from "react-router-dom";

const BankAccountForm = ({onChange, errors, account, onSave, options, formIsValid }) => {
  // console.log(errors);
  return(
    <div>
      <p><span>ID:</span> <span>{account.id}</span></p>
      <TextInput
        name="name"
        placeholder="Full Name"
        label="Full Name"
        onChange={onChange}
        value={account.name}
        error={errors.name}
      />

      <TextInput
        name="cnicNumber"
        placeholder="CNIC Number"
        label="CNIC Number"
        onChange={onChange}
        value={account.cnicNumber}
        error={errors.cnicNumber}
      />

      <TextInput
        name="accountNumber"
        placeholder="Account Number"
        label="Account Number"
        onChange={onChange}
        value={account.accountNumber}
        error={errors.accountNumber}
      />

      <SelectInput
        name="accountType"
        label="Account Type"
        onChange={onChange}
        options={options}
        defaultOption="Select Account Type"
        value={account.accountType}
        error={errors.accountType}
      />

      <TextInput
        name="amount"
        placeholder="Amount"
        label="Amount"
        onChange={onChange}
        value={account.amount}
        error={errors.amount}
      />

      <input
        type="submit"
        value={formIsValid ? "Create New Account" : "Invalid Account Information"}
        className="btn btn-primary"
        onClick={onSave}
        disabled={!formIsValid}
      />

      <Link className="btn btn-secondary" to="/accounts">Back to accounts</Link>
    </div>
  );
};
BankAccountForm.propTypes = {
  errors: PropTypes.object,
  account: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  formIsValid: PropTypes.bool
};

export default BankAccountForm;
