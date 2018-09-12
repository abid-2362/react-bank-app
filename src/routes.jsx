import React from 'react';
import { Switch, Router } from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './components/HomePage/HomePage';
import CreateBankAccount from './components/Accounts/CreateBankAccount';
import Accounts from './components/Accounts/Accounts';

import createBrowserHistory from 'history/createBrowserHistory';
import SingleAccountPage from './components/Accounts/SingleAccountPage';
import Transactions from './components/Transactions/Transactions';
import SingleTransaction from './components/Transactions/SingleTransaction';
const history = createBrowserHistory();

const CustomRoutes = () => (
  // <HashRouter history={history}>
  <HashRouter>
    <div>
      <Header />

      <Route exact path="/" component={HomePage}/>
      <Route exact path="/accounts" component={Accounts} />
      <Switch>
        <Route exact path="/accounts/create" component={CreateBankAccount} />
        <Route exact path="/accounts/:id" component={SingleAccountPage} />
      </Switch>
      <Route exact path="/transactions" component={Transactions} />
      <Route exact path="/transactions/:id" component={SingleTransaction} />
    </div>
  </HashRouter>
);

export default CustomRoutes;