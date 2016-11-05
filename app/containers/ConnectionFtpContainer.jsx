import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, logOut } from '../actions/authed'
import Sidebar from '../components/Sidebar'

class ConnectionFtpContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(this.props.route.path != '/404') this.props.oncheckAuth()
  }

  render() {
    const name  = this.props.user.name  || ''
    const photo = this.props.user.photo || ''

    return (
      <div className="container-fluid container-fluid-dasboard">

        <div className="row row-dashboard">

          <div className="col-sm-4 col-sidebar">
            <Sidebar name={name} photo={photo} onLogOut={this.props.onLogOut}/>
          </div>

          <div className="col-sm-8">
              <h1 className="page-header">New Connexion</h1>

              <div className="row">
                <form>
                  <div className="form-group">
                    <label htmlFor="host">Host</label>
                    <input type="text" required className="form-control" id="host" placeholder="Host" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user">User</label>
                    <input type="text" required className="form-control" id="user" placeholder="User" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required className="form-control" id="password" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
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
  }
}

function mapActionsToProps(dispatch) {
  return {
    oncheckAuth: () => dispatch(checkAuth()),
    onLogOut: () => dispatch(logOut()),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ConnectionFtpContainer)
