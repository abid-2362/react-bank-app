import React, { Component } from 'react';
import AccountsList from './AccountsList';
import {Link} from 'react-router-dom';
import accountsApi from '../../api/AccountsApi';
import {connect} from 'react-redux';
import { PropTypes } from "prop-types";
// import {bindActionCreators} from 'redux';

class AccountsPage extends Component {
  state = {
    // accounts: accountsApi.getAllAccounts()
    accounts: this.props.accounts
  };

  render() {
    return(
      <div className="accounts-page">
        <h2>Accounts</h2>
        <Link to="/accounts/create" className="btn btn-primary">Create Account</Link> <br/><br/>
        <AccountsList accounts={this.state.accounts} />
      </div>
    );
  }
}
AccountsPage.propTypes = {
  accounts: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts
  };
};

export default connect(mapStateToProps)(AccountsPage);