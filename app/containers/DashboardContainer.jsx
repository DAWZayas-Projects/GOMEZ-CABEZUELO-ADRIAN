
import React from 'react'

import { connect } from 'react-redux'
import { checkAuth, logOut } from '../actions/authed'
import Sidebar from '../components/Sidebar'

class DashboardContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(this.props.route.path != '/404') {
        this.props.oncheckAuth()
    }
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
                  <h1 className="page-header">Dashboard {name}</h1>
              </div>

            </div>

          </div>
      )
  }

}


function mapStateToProps(state) {
    return {
        user : state.user
    }
}
function mapActionsToProps(dispatch) {
  return {
  	oncheckAuth: () => dispatch(checkAuth()),
    onLogOut: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardContainer)
