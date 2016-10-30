import React, { PropTypes } from 'react';

class Register extends React.Component {

  onSubmit(event) {
      event.preventDefault()
      this.props.onRegisterUser({username:this.refs.username.value, password :this.refs.password.value})
  }

  render() {
    return (

      <form  className="margin-bottom-0" onSubmit={(event) => this.onSubmit(event)}>
          <div className="form-group m-b-15">
              <input type="text" className="form-control input-lg" placeholder="User name" ref='username'/>
          </div>
          <div className="form-group m-b-15">
            <input type="email" className="form-control input-lg" placeholder="Email" ref='email'/>
          </div>
          <div className="form-group m-b-15">
              <input type="password" className="form-control input-lg" placeholder="Password" ref='password'/>
          </div>
          <div className="login-buttons">
              <button type="submit" className="btn btn-block btn-social btn-lg btn-info">
                <span className="fa fa-envelope-o"></span>
                Register
              </button>
          </div>
          <a href="/auth/google" className="btn btn-block btn-social btn-lg btn-google">
            <span className="fa fa-google"></span> Register with Google
          </a>

      </form>
    )
  }
}

Register.propTypes = {
  onRegisterUser: PropTypes.func,
}

export default Register
