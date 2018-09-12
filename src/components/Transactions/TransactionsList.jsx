import React from 'react';
import {NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import transactionsApi from '../../api/TransactionsApi';

const TransactionsList = (props) => {
  let trClass;
  // const availableTransactions = transactionsApi.getAllTransactions();
  const availableTransactions = props.transactions;
  const transactionsList = availableTransactions.map((transaction, index)=> {
    trClass = transaction.transactionType == 'deposit' ? "table-success" : "table-danger";
    return(
      <tr key={index} className={trClass}>
        <td><Link className="white" to={`/transactions/${transaction.id}`}>{transaction.id}</Link></td>
        <td>{transaction.amount}</td>
        <td>{transaction.accountNumber}</td>
        <td>{transaction.transactionDate}</td>
      </tr>
    );
  });
  return(
    <div>
      <h2>Transactions ({availableTransactions.length})</h2>
      <table className="accounts-list table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Account Number</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
