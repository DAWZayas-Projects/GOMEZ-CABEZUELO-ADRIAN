
import React from 'react';

import { connect } from 'react-redux';
import { checkAuth } from '../actions/authed';

class DashboardContainer extends React.Component {
  componentDidMount() {
      document.body.classList.remove('bg-white')
      document.getElementById('page-container').classList.add('page-sidebar-fixed')
      document.getElementById('page-container').classList.add('page-header-fixed')

      if(this.props.route.path != '/404') {
          this.props.dispatch(checkAuth())
      }

  }
    render() {

        return (
            <div>
                <div className="content">
                    <h1 className="page-header">Dashboard <small>header small text goes here...</small></h1>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        main : state.main
    }
}

export default connect(mapStateToProps)(DashboardContainer)
