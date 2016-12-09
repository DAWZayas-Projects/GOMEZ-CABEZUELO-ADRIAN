import React from 'react';

class FormFtp extends React.Component {

  constructor(props) {
    super(props)
  }

  onSubmit(event) {

    event.preventDefault()
    this.props.onFtpListDir({
      host :     this.refs.host.value,
      user :     this.refs.user.value,
      password : this.refs.password.value,
      root: '/',
    })
  }

  render() {

    return (
      <div className="col-sm-6">
        <div className="row">
          <h1 className="page-header">New Connexion</h1>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="host">Host</label>
              <input type="text" required className="form-control" id="host" ref="host" placeholder="Host" />
            </div>
            <div className="form-group">
              <label htmlFor="user">User</label>
              <input type="text" required className="form-control" id="user" ref="user" placeholder="User" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" required className="form-control" id="password" ref="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-default">Connect</button>
          </form>
        </div>
      </div>
    )
  }
}

FormFtp.propTypes = {
  onFtpListDir: React.PropTypes.func,
}

export default FormFtp
