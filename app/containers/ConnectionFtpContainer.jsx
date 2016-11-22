import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, logOut } from '../actions/authed'
import { ftpListDir, createFtp, removeFtp, moveFtp, uploadFtp } from '../actions/ftp'
import Sidebar from '../components/Sidebar'
import FormFtp from '../components/FormFtp'
import FormManager from '../components/FormManager'

class ConnectionFtpContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rootDirectory: '/',
    }
  }

  componentWillMount() {
    if(this.props.route.path != '/404') this.props.oncheckAuth()
  }


  render() {
    const name      = this.props.user.name  || ''
    const photo     = this.props.user.photo || ''
    const connexion  = this.props.ftp.connexion || false

    return (
      <div className="container-fluid container-fluid-dasboard">

        <div className="row row-dashboard">

          <div className="col-sm-4 col-sidebar">
            <Sidebar name={name} photo={photo} onLogOut={this.props.onLogOut}/>
          </div>

          {
            (!connexion)
            ? <FormFtp
                onFtpListDir = {(ftpInfo) => this.props.onFtpListDir(ftpInfo)}
                ftpInfo      = {this.props.ftp}
              />
            : <FormManager
                onFtpListDir = {(ftpInfo) => this.props.onFtpListDir(ftpInfo)}
                onCreateFtp  = {(ftpInfo) => this.props.onCreateFtp(ftpInfo)}
                onDeleteFtp  = {(ftpInfo) => this.props.onDeleteFtp(ftpInfo)}
                onMoveFtp    = {(ftpInfo) => this.props.onMoveFtp(ftpInfo)}
                onUploadFtp  = {(ftpInfo) => this.props.onUploadFtp(ftpInfo)}
                ftp          = {this.props.ftp}
              />
          }

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
    onFtpListDir: (ftpInfo) => dispatch(ftpListDir(ftpInfo)),
    onCreateFtp:  (ftpInfo) => dispatch(createFtp(ftpInfo)),
    onDeleteFtp:  (ftpInfo) => dispatch(removeFtp(ftpInfo)),
    onMoveFtp:    (ftpInfo) => dispatch(moveFtp(ftpInfo)),
    onUploadFtp:     (body)    => dispatch(uploadFtp(body)),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ConnectionFtpContainer)
