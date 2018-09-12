import React, { Component } from 'react';
import TransactionsList from './TransactionsList';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class TransactionsPage extends Component {
  render() {
    return(
      <div className="accounts-page">
        <TransactionsList transactions={this.props.transactions}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions
  };
};


export default connect(mapStateToProps)(TransactionsPage);