import * as types from '../actions/ActionTypes';

export default function accountsReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      return [
        ...state,
        action.account
      ];

    case types.DELETE_ACCOUNT:
      return [
        ...state.filter(account => account.id != action.id)
      ];

    case types.DEPOSIT_AMOUNT: {
      let accountToDeposit = (state.filter( account => account.id == action.accountId))[0];
      accountToDeposit.amount =  (parseFloat(accountToDeposit.amount) + parseFloat(action.amount)).toString();
      return [
        ...state.filter( account => account.id != action.accountId),
        accountToDeposit
      ];
    }

    case types.WITHDRAW_AMOUNT: {
      let accountToWithdraw = (state.filter( account => account.id == action.accountId))[0];
      accountToWithdraw.amount =  (parseFloat(accountToWithdraw.amount) - parseFloat(action.amount)).toString();
      return [
        ...state.filter( account => account.id != action.accountId),
        accountToWithdraw
      ];
    }

    default:
      return state;
  }
}