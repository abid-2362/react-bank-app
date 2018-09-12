import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = (props) => {
  return(
    <div className="not-found">
      <h2>Oops!</h2>
      <h3>Page you are looking for is no longer available.</h3>
      <p><Link to="/">Go to homepage.</Link></p>
    </div>
  );
};

export default NotFound;
