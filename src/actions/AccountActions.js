import * as types from './ActionTypes';

// action generatros
export function createAccount(account) {
  return {
    type: types.CREATE_ACCOUNT,
    account
  };
}

export function depositAmount(accountId, amount) {
    return {
      type: types.DEPOSIT_AMOUNT,
      accountId,
      amount
    };
}

export function withdrawAmount(accountId, amount) {
  return {
    type: types.WITHDRAW_AMOUNT,
    accountId,
    amount
  };
}

export function deleteAccount(id) {
  return {
    type: types.DELETE_ACCOUNT,
    id
  };
}