import React, { PropTypes } from 'react';

class Exception extends React.Component {
  
  render() {
    return (

        <div className="error">
           <div className="error-code m-b-10">404 <i className="fa fa-warning"></i></div>
           <div className="error-content">
                <div className="error-message">We couldn't find it...</div>
                <div className="error-desc m-b-20">
                    The page you're looking for doesn't exist. <br></br>
                    Perhaps, there pages will help find what you're looking for.
                </div>
                <div>
                    <a href="/#/" className="btn btn-success">Go Back to Home Page</a>
                </div>
           </div>
        </div>
    )
  }
}

export default Exception
