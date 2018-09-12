import React, {Component} from 'react';
import BankAccountForm from './BankAccountForm';
import accountsApi from "../../api/AccountsApi";
import toastr from 'toastr';
import * as accountActions from '../../actions/AccountActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CreateBankAccount extends Component {
  state = {
    account: {id: (1 + Math.floor(Math.random() * 15000)) ,name: '', accountNumber: '', accountType: '', amount: '', cnicNumber: ''},
    errors: {},
    startValidating: false,
    formIsValid: true,
    options: [
      {
        text: 'Current Account',
        value: 'Current Account'
      },
      {
        text: 'Saving Account',
        value: 'Saving Account'
      }
    ]
  }
  onChange = (event) => {
    let fname = event.target.name;
    let account = this.state.account;
    account[fname] = event.target.value;
    this.setState({account});
    if(this.state.startValidating){
      this.formIsValid();
    }
  }

  formIsValid = () => {

    // CreateAccount Form Validation function
    let formIsValid = true;
    let errors = {};

    // name is required, must be atleast 3 characters.
    if(this.state.account.name.length < 3 ) {
      errors.name = "Name should be atleast 3 characters.";
      formIsValid = false;
    }

    // CNIC is required and should not be contain only digits.
    if(this.state.account.cnicNumber.length < 1) {
      errors.cnicNumber = "CNIC Number is required";
      formIsValid = false;
    } else if(this.state.account.cnicNumber.length != 13) {
      errors.cnicNumber = "CNIC Number must be exactly 13 digits";
      formIsValid = false;
    } else if(this.state.account.cnicNumber.search(/[^0-9]/) !== -1) {
      errors.cnicNumber = "CNIC Number can only be digits";
      formIsValid = false;
    }

    // AccountNumber is required and should contain digits and - only.
    if(this.state.account.accountNumber.length < 1) {
      errors.accountNumber = "Account Number is required";
      formIsValid = false;
    }else if(this.state.account.accountNumber.search(/[^0-9-]/) !== -1) {
      errors.accountNumber = 'Account Number can only contain digits and hyphens(-)';
      formIsValid = false;
    }

    // AccountType is required.
    if(this.state.account.accountType.length < 1) {
      errors.accountType = "Account Type is required";
      formIsValid = false;
    }
    /*
      account: {
        id: (1 + Math.floor(Math.random() * 15000)),
        name: '',
        accountNumber: '',
        accountType: '',
        amount: '',
        cnicNumber: ''
      },
    */
    // Amount is required and should be digits only.
    if(this.state.account.amount.length < 1) {
      errors.amount = "Amount is required";
      formIsValid = false;
    }else if(this.state.account.amount.search(/[^0-9]/) !== -1) {
      errors.amount = "Invalid Amount. Amount should be only in digits.";
      formIsValid = false;
    }
    this.setState({errors, formIsValid});
    return formIsValid;
  }

  onSave = () => {
    if(!this.formIsValid()){
      return this.setState({startValidating: true});
    }
    // console.log('on save button clicked');

    accountsApi.saveAccount(this.state.account);
    this.props.actions.createAccount(this.state.account);
    this.redirect("/accounts", "success", "Account has been created successfully.");
  }
  redirect = (route, type, msg) => {
    toastr[type](msg);
    this.props.history.push(route);
  }

  render() {
    return(
      <div>
        <BankAccountForm
          onSave={this.onSave}
          onChange={this.onChange}
          options={this.state.options}
          errors={this.state.errors}
          account={this.state.account}
          formIsValid={this.state.formIsValid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // accounts: state.accounts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBankAccount);
