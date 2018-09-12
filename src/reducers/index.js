import {combineReducers} from 'redux';
import accounts from './AccountsReducer';
import transactions from './TransactionReducer';

export default combineReducers({
  accounts,
  transactions
});