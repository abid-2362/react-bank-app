import * as types from '../actions/ActionTypes';

export default function transactionsReducer(state = [], action) {
  switch (action.type) {
    case types.SAVE_TRANSACTION:
      return [
        ...state,
        action.transaction
      ];

    case types.DELETE_TRANSACTION:
      return [
        ...state.filter( transaction => transaction.id != action.transactionId )
      ];

    default:
      return state;
  }
}