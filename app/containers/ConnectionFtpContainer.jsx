import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, logOut } from '../actions/authed'
import { ftpConnexion } from '../actions/ftp'
import Sidebar from '../components/Sidebar'

class ConnectionFtpContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(this.props.route.path != '/404') this.props.oncheckAuth()
  }

  onSubmit(event) {
      event.preventDefault()
      this.props.onFtpConnexion({host:this.refs.host.value, user:this.refs.user.value, password :this.refs.password.value})
  }

  render() {
    const name      = this.props.user.name  || ''
    const photo     = this.props.user.photo || ''
    const hostList  = this.props.ftp.hostList || []
    return (
      <div className="container-fluid container-fluid-dasboard">

        <div className="row row-dashboard">

          <div className="col-sm-4 col-sidebar">
            <Sidebar name={name} photo={photo} onLogOut={this.props.onLogOut}/>
          </div>

          <div className="col-sm-8">
              <h1 className="page-header">New Connexion</h1>

              <div className="row">
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
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
              </div>
          </div>

          <div className="col-sm-8">
              <h1 className="page-header">List Host</h1>

              <div className="row">
                <ul>
                {
                  hostList.map( (list, index) => <li key={index}>{list.name}</li> )
                }
                </ul>
              </div>

          </div>

        </div>

      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    ftp: state.ftp,
  }
}

function mapActionsToProps(dispatch) {
  return {
    oncheckAuth: () => dispatch(checkAuth()),
    onLogOut: () => dispatch(logOut()),
    onFtpConnexion: (ftpInfo) => dispatch(ftpConnexion(ftpInfo)),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ConnectionFtpContainer)
