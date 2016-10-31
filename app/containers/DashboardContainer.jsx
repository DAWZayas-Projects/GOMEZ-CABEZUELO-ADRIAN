
import React from 'react';

import { connect } from 'react-redux';
import { checkAuth } from '../actions/authed';

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
      const name = this.props.user.name || ''
      return (
          <div>
              <div className="content">
                  <h1 className="page-header">Dashboard {name}</h1>
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
  };
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardContainer)
