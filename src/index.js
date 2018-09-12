import React from 'react';
import {render} from 'react-dom';

// require.context('../src', true, /^\.\//);
require.context('../src', true, /^\.\//);

// import css
// import './css/bootstrap-darkly.min.css';
import './css/bootstrap-spacelab.min.css';
// import './css/bootstrap-v4.0.0.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './css/style.css';
import CustomRoutes from './routes';
// import javascript
import './js/jquery-global.js';
import './js/bootstrap.bundle.min.js';
import {Provider} from  'react-redux';
import configureStore from './store/configureStore';
import accountsApi from './api/AccountsApi';
import transactionsApi from './api/TransactionsApi';

const InitialState = {
  accounts: accountsApi.getAllAccounts(),
  transactions: transactionsApi.getAllTransactions()
};

const store = window.myStore =  configureStore(InitialState);

render(
  <Provider store={store}>
    <CustomRoutes />
  </Provider>,
  document.getElementById('app')
);