import * as types from './ActionTypes';

// action generatros
export function saveTransaction(transaction) {
  /*
    console.log(transaction.id) //logs undefined - CORRECT
    console.log(transaction.transactionDate) //logs undefined - CORRECT

    // but this logs the complete object, half at first instance and automatically complete if expanded in scroll
    // and I am unable to understand why this is being happening.
    console.log(transaction);

    // result looks like this in console.
    {amount: "10", accountNumber: "4563879", transactionType: "withdraw"} -> This is correct, currently it has only this information

    but if we expand by clickin on the arrow, it gets completed like this
    {
      accountNumber: "4563879",
      amount: "10"
      id: 15513,
      transactionDate: "Mon January 22, 2018 9:23:8 AM",
      transactionType: "withdraw",
      __proto__: Object
    }

    // can you please tell me if you know how this is being happening.

  */
  console.log(transaction);
  return {
    type: types.SAVE_TRANSACTION,
    transaction
  };
}

export function deleteTransaction(transactionId) {
  return {
    type: types.DELETE_TRANSACTION,
    transactionId
  };
}