import React, {Component} from 'react';
import AccountsApi from "../../api/AccountsApi";
import TransactionApi from '../../api/TransactionsApi';
import TextInput from '../common/TextInput';
import toastr from 'toastr';
import NotFound from '../NotFound';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountActions from '../../actions/AccountActions';
import * as transactionActions from '../../actions/TransactionActions';

// const SingleAccountPage = (props) => {
class SingleAccountPage extends Component {
  // console.log(props);
  state = {
    displayForm: false,
    errors: {amount: ''},
    amount: '',
    formType: null,
    // account: AccountsApi.getAccountById(this.props.match.params.id)
    account: this.getAccountById(this.props.accounts, this.props.match.params.id)
  }
  amountUpdate = (event) => {
    let amount = Number(event.target.value).toFixed(2);
    let errors = {};
    if(isNaN(amount)) {
      errors.amount = "Invalid amount, please enter the amount only in digits.";
      return this.setState({errors: errors, amount: event.target.value});
    } else {
      errors.amount = '';
      return this.setState({errors: errors, amount: event.target.value});
    }
  }

  getAccountById(accounts, id) {
    // console.log('getAccountsById', accounts);
    // const account = accounts.filter( account => account.id == id);
    // console.log('account', account);
    // return account[0];
    return accounts.filter( account => account.id == id)[0];
  }

  depositAmount = () => {
    // console.log(this.state.amount + ' has been dposited into the account');
    AccountsApi.depositAmount(this.props.match.params.id, this.state.amount);
    this.props.accountActions.depositAmount(this.props.match.params.id, this.state.amount);
    this.saveTransaction('deposit');
    this.setState({amount: '', account: this.getAccountById(this.props.accounts, this.props.match.params.id)}); //rerender the component to display the changed amount.
  }

  saveTransaction = (type) => {
    let transaction = {};
    transaction.amount = this.state.amount;
    transaction.accountNumber = this.state.account.accountNumber;
    transaction.transactionType = type;
    /*
      transaction = {
        amount: '10',
        accountNumber: '1239123',
        transactionType: 'withdraw'
      }
      this 'transaction' object does not have the transaction id nor the transactionDate yet. it will be created in API's
      saveTransaction function. But when I pass this half object to transactionActions.saveTransaction(transaction)
      it gets completed automatically. I didn't understand why does this is being happening.
    */
    this.props.transactionActions.saveTransaction(transaction);
    TransactionApi.saveTransaction(transaction);
    let msg, alertType ;
    if (type == 'deposit'){
      msg = "Transaction amount " + transaction.amount + " has been deposited into the account number "+ transaction.accountNumber;
      alertType = 'success';
    }else{
      msg = "Transaction amount " + transaction.amount + " has been withdrawn from the account number "+ transaction.accountNumber;
      alertType = 'error';
    }
    toastr[alertType](msg);
  }

  withdrawAmount = () => {
    // console.log(this.state.amount + ' has been withdrawn from the account');
    const result = AccountsApi.withdrawAmount(this.props.match.params.id, this.state.amount);
    if(result.status == "ok"){
      this.props.accountActions.withdrawAmount(this.props.match.params.id, this.state.amount);
      this.saveTransaction('withdraw');
      this.setState({amount: '', account: this.getAccountById(this.props.accounts, this.props.match.params.id)}); //rerender the component to display the changed amount.
    }else{
      toastr.error(result.msg);
    }
  }

  deleteAccount = (id) => {
    if (AccountsApi.deleteAccountById(id)){
      this.props.accountActions.deleteAccount(id);
      this.redirect("/accounts", "info", "Account has been deleted successfully");
    }
  }
  redirect = (route, type, msg) => {
    toastr[type](msg);
    this.props.history.push(route);
  }

  render(){
    // const account = AccountsApi.getAccountById(this.props.match.params.id);
    const {account} = this.state;
    if(!account) {
      return <NotFound />;
    }
    return(
      <div>
        <h2>Account Details</h2>
        <h4>{account.name} ({account.accountNumber})</h4>
        <button type="button" onClick={() => {this.deleteAccount(account.id);}} className="btn btn-danger">Delete This Account</button><br/><br/>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{account.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{account.name}</td>
            </tr>
            <tr>
              <td>CNIC:</td>
              <td>{account.cnicNumber}</td>
            </tr>
            <tr>
              <td>Account Number:</td>
              <td>{account.accountNumber}</td>
            </tr>
            <tr>
              <td>Account Type:</td>
              <td>{account.accountType}</td>
            </tr>
            <tr>
              <td>Account Balance:</td>
              <td>{account.amount}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="btn btn-success" onClick={() => (this.setState({displayForm: true, formType: 'deposit'}))}>Deposit</button>
        <button type="button" className="btn btn-danger" onClick={() => (this.setState({displayForm: true, formType: 'withdraw'}))}>Withdraw</button>
        {
          this.state.displayForm &&
          <button
            type="button"
            className="btn btn-warning"
            onClick={()=> (this.setState({displayForm: false, formType: null}))}
          >
            Close Form
          </button>
        }

        <DisplayForm
          onChange={this.amountUpdate}
          deposit={this.depositAmount}
          withdraw={this.withdrawAmount}
          errors={this.state.errors}
          state={this.state}
          formType={this.state.formType}
        />

      </div>
    );
  }
}

const DisplayForm = (props) => {
  let type;
  let calcFunction;
  if(props.formType == 'withdraw') {
    type = "Withdraw";
    calcFunction = props.withdraw;
  }else{
    type = "Deposit";
    calcFunction = props.deposit;
  }
  return(
    <div className={`form deposit-form ${props.state.displayForm ? "fadeIn": "fadeOut"}`}>
      <TextInput
        name="amount"
        label={`Amount to ${type}`}
        placeholder="eg. 100"
        onChange={props.onChange}
        error={props.errors.amount}
        value={props.state.amount}
      />

      <button
        type="button"
        className={`btn ${props.formType == "withdraw" ? "btn-danger": "btn-success"}`}
        onClick={calcFunction}
        disabled={props.errors.amount.length > 0}
      >{type}</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    accountActions: bindActionCreators(accountActions, dispatch),
    transactionActions: bindActionCreators(transactionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleAccountPage);
