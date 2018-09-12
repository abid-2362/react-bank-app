import React from 'react';
import {NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const AccountsList = (props) => {
  const availableAccounts = props.accounts;
  const accountsList = availableAccounts.map((account, index)=> {
    return(
      <tr key={index}>
        <td><Link to={`/accounts/${account.id}`}>{account.id}</Link></td>
        <td>{account.name}</td>
        <td>{account.cnicNumber}</td>
        <td>{account.accountNumber}</td>
        <td>{account.accountType}</td>
        <td>PKR: {account.amount}</td>
      </tr>
    );
  })
  return(
    <div>
      <table className="accounts-list table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>CNIC Number</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {accountsList}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsList;
