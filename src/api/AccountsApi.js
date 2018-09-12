import _ from 'lodash';
import toastr from 'toastr';

const AccountsApi = {

  getAllAccounts: function() {
    let accountsString = localStorage.getItem('accounts');
    let accounts = JSON.parse(accountsString);
    if(accounts == null) {
      return [];
    }else {
      return accounts;
    }
  },

  saveAccount: function(dataObj) {
    let accounts = this.getAllAccounts();
    // check if the account with same id exists
    if( this.getAccountById(dataObj.id) ) {
      // find the key of the account in the accounts list
      let index = accounts.findIndex( (element) => {
        return element.id == dataObj.id;
      });
      // replace the existing account with new account
      accounts[index] = dataObj;
    }else{
      accounts.push(dataObj);
    }
    let accountsString = JSON.stringify(accounts);
    localStorage.setItem('accounts', accountsString);
  },

  saveAllAccounts: function(accounts){
    localStorage.setItem('accounts', JSON.stringify(accounts));
  },

  getAccountById: function(id) {
    let accounts = this.getAllAccounts();
    let requiredAccount = _.find(accounts, (account) => (account.id == id), 0);
    return requiredAccount; // returns object or undefined
  },

  depositAmount: function(accountId, amount) {
    let account = this.getAccountById(accountId);
    let currentAmount = parseFloat(account.amount);
    let newAmount = currentAmount + parseFloat(amount);
    account.amount = newAmount;
    this.saveAccount(account);
    // console.log(account);
  },

  withdrawAmount: function(accountId, amount) {
    let account = this.getAccountById(accountId);
    let currentAmount = parseFloat(account.amount);
    let transactionAmount = parseFloat(amount);
    if(transactionAmount > currentAmount) {
      return {msg: `${transactionAmount} can't be withdrawn. Your total balance is ${currentAmount}`, status: 'error'};
    }
    let newAmount = currentAmount - transactionAmount;
    account.amount = newAmount;
    this.saveAccount(account);
    return {msg: `${transactionAmount} has been withdrawn successfully.`, status: "ok"};
  },
  /*
  accounts: [
    {
      id: 1,
      name: 'test account 1',
      qty: 10,
      description: 'Some nice description',
      video: 'https://www.youtube.com/embed/cbU12Tw7Q4U',
    }
  ]
  */
  deleteAccountById: function(id) {
    if (confirm('Are you sure you want to delete this account?')){
      let accounts = this.getAllAccounts();
      let fromIndex = _.findIndex(accounts, account => (account.id == id), 0);
      accounts.splice(fromIndex, 1);
      this.saveAllAccounts(accounts);
      // toastr.info('Account has been deleted');
      return true;
    }else {
      return false;
    }
  },

  deleteAllAccounts: function() {
    localStorage.removeItem('accounts');
  }

};

export default AccountsApi;