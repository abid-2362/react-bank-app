import _ from 'lodash';
import toastr from 'toastr';

// generate transaction id
function _generateID() {
  return (15000 + Math.floor(Math.random()* 15000));
}

function _dateFormatter(dateObject = new Date()) {
  if(!dateObject){
    dateObject = new Date();
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octoboer", "November", "December"];
  // const Hours = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
  const hours = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
  const currentHours = dateObject.getHours();
  const AMPM = currentHours <= 11 ? "AM" : "PM";
  let date = days[dateObject.getDay()];
  date += ' ' + months[dateObject.getMonth()];
  date += ' ' + dateObject.getDate();
  date += ', ' + dateObject.getFullYear();
  date += ' ' + hours[currentHours];
  date += ':' + dateObject.getMinutes();
  date += ':' + dateObject.getSeconds();
  date += ' ' + AMPM;
  return date;
}

function _saveAllTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

let TransactionsApi = {

  getAllTransactions: function() {
    let transactionsString = localStorage.getItem('transactions');
    let transactions = JSON.parse(transactionsString);
    if(transactions == null) {
      return [];
    }else {
      return transactions;
    }
  },

  /**
  ** return void
  ** parameter: Trnsaction Object.
  ** function: Saves passed transaction Object into localStorage.
  */
  saveTransaction: function(transactionData) {
    let td = transactionData;
    td.id = _generateID(); // 15000 to 30000 random id generator
    td.transactionDate = _dateFormatter();
    let transactions = this.getAllTransactions();
    transactions.push(transactionData);
    let transactionsString = JSON.stringify(transactions);
    localStorage.setItem('transactions', transactionsString);
  },

  getTransactionById: function(transactionId) {
    let transactions = this.getAllTransactions();
    let requiredTransaction = _.find(transactions, (transaction) => (transaction.id == transactionId), 0);
    return requiredTransaction; // returns object or undefined
  },

  deleteTransactionById: function(transactionId) {
    let transactions = this.getAllTransactions();
    let fromIndex = _.findIndex(transactions, transaction => (transaction.id == transactionId), 0);
    // console.log(fromIndex);
    // console.log(transactions);
    transactions.splice(fromIndex, 1);
    _saveAllTransactions(transactions);
    toastr.info('Transaction has been deleted');
  }

};

export default TransactionsApi;