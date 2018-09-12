import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return(
      <div>
        <h2>Abid Ali - Roll # 2362</h2>
        <h4>React-Assignment-02</h4>
        <h4>Saylani Mass Training Program Faisalabad. Batch#01</h4>
        <p>This application is built by using the following technologies.</p>
        <ul>
          <li>React JS</li>
          <li>Bootstrap 4</li>
          <li>Local Storage (for storing the data locally)</li>
          <li>React Router v4</li>
        </ul>
        {/* <b className="text-danger">Source Code Available only through the teacher's recommendation.</b> */}
      </div>
    );
  }
}

export default HomePage;