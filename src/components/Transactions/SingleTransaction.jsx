import React, {Component} from 'react';
import transactionApi from '../../api/TransactionsApi';
import TransactionsApi from '../../api/TransactionsApi';
import NotFound from '../NotFound';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as transactionActions from '../../actions/TransactionActions';

class SingleTransaction extends Component {

  getTransactionById = (transactions, id) => {
    return transactions.filter( transaction => transaction.id == id )[0];
  }

  deleteTransactionById = (transactionId) => {
    if (confirm('Are you sure you want to delete this transaction? This can\'t be undone.')){
      this.props.transactionActions.deleteTransaction(transactionId);
      TransactionsApi.deleteTransactionById(transactionId);
      this.props.history.push("/transactions");
    }
  }

  render(){
    const transaction = this.getTransactionById(this.props.transactions, this.props.match.params.id);
    if(!transaction) {
      return <NotFound />;
    } else {
      return(
        <div className="sigle-transaction">
          <h2>Transaction Details</h2>
            <h4>Transaction # {transaction.accountNumber}</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{transaction.id}</td>
                </tr>
                <tr>
                  <td>Account Number:</td>
                  <td>{transaction.accountNumber}</td>
                </tr>
                <tr>
                  <td>Transaction Amount:</td>
                  <td>{transaction.amount}</td>
                </tr>
                <tr>
                  <td>Transaction Type:</td>
                  <td>{transaction.transactionType}</td>
                </tr>
                <tr>
                  <td>Transaction Date:</td>
                  <td>{transaction.transactionDate}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-danger" onClick={() => {this.deleteTransactionById(transaction.id);}}>Delete This Transaction</button>
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    transactionActions: bindActionCreators(transactionActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTransaction);
