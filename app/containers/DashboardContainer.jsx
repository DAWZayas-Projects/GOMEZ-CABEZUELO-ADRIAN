import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, logOut } from '../actions/authed'
import { fetchSummaryData, fetchMainChartData , deleteLineChart } from '../actions/main';
import Sidebar from '../components/Sidebar'
import D3 from '../components/D3'

class DashboardContainer extends React.Component {

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
                  <h1 className="page-header">Dashboard {name}</h1>
                  <D3 
                    main = {this.props.main}
                    fetchSummaryData = { () => this.props.fetchSummaryData()}
                    fetchMainChartData = { () => this.props.fetchMainChartData()}
                    deleteLineChart = { () => this.props.deleteLineChart()}
                  />
              </div>

            </div>

          </div>
      )
  }

}


function mapStateToProps(state) {
    return {
        user : state.user,
        main : state.main,
    }
}
function mapActionsToProps(dispatch) {
  return {
  	oncheckAuth: () => dispatch(checkAuth()),
    onLogOut: () => dispatch(logOut()),
    fetchSummaryData: () => dispatch(fetchSummaryData()),
    fetchMainChartData: () => dispatch(fetchMainChartData()),
    deleteLineChart: () => dispatch(deleteLineChart()),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardContainer)
