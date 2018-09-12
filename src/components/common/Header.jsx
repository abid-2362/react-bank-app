import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../img/bank.png';

const Header = (props) => {
  return(
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/"><img className="header-logo" src={logo} /></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact={true} className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/accounts">Accounts</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link disabled" to="/transactions">Transactions</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;