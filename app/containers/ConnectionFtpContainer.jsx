import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, logOut } from '../actions/authed'
import { ftpListDir, createFtp, removeFtp } from '../actions/ftp'
import Sidebar from '../components/Sidebar'
import DirectoryFtp from '../components/DirectoryFtp'
import FileFtp from '../components/FileFtp'
import FileButtons from '../components/FileButtons'


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

  onSubmit(event, root = '/') {
      event.preventDefault()
      this.props.onFtpListDir({
        host :     this.refs.host.value,
        user :     this.refs.user.value,
        password : this.refs.password.value,
        root,
      })
  }

  onCreateDIrOrFile(event) {
    event.stopPropagation()
    this.props.onCreateFtp({
      host :        this.refs.host.value,
      user :        this.refs.user.value,
      password :    this.refs.password.value,
      root :        this.state.rootDirectory,
      newDirOrFile: this.refs.newDirOrFile.value,
    })
  }

  onDeleteDIrOrFile(event) {
    event.stopPropagation()
    this.props.onDeleteFtp({
      host :        this.refs.host.value,
      user :        this.refs.user.value,
      password :    this.refs.password.value,
      root :        this.state.rootDirectory,
      newDirOrFile: this.refs.newDirOrFile.value,
    })
  }

  printDirectory(directory, index) {
    return (
      <DirectoryFtp
        dir           = { directory }
        key           = { index }
        host          = { this.refs.host.value }
        user          = { this.refs.user.value }
        password      = { this.refs.password.value }
        root          = { directory.root }
        ListDirectory = { this.props.onFtpListDir.bind(this) }
        ChangeRoot    = { this.onClickFile.bind(this) }
      />
    )
  }

  printFile(file, index) {
    return (
      <FileFtp
        file          = { file }
        key           = { index }
        host          = { this.refs.host.value }
        user          = { this.refs.user.value }
        password      = { this.refs.password.value }
        root          = { file.root }
        ChangeRoot    = { this.onClickFile.bind(this) }
      />
    )
  }

  printAllDirectory(directory, index) {
    if (directory.subDir) {
      return (
        <div>
          {this.printDirectory(directory, index)}
          {this.printFiles(directory.subDir)}
        </div>
      )
    }
    return this.printDirectory(directory, index)
  }

  printFiles(files) {
    return(
      <ul>
        {files.map( (file, index) => {
          return file && file.type === 'd'
          ? this.printAllDirectory(file, index)
          : this.printFile(file, index)
        })}
      </ul>
    )
  }

  onClickFile(event, root) {
    event.preventDefault()
    this.setState({
      rootDirectory: root,
    })
  }

  render() {
    const name      = this.props.user.name  || ''
    const photo     = this.props.user.photo || ''
    const hostList  = this.props.ftp.hostList || []
    const connexion = this.props.ftp.connexion || false
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
                  <input type="text" required className="form-control" id="host" ref="host" placeholder="Host" disabled={connexion}/>
                </div>
                <div className="form-group">
                  <label htmlFor="user">User</label>
                  <input type="text" required className="form-control" id="user" ref="user" placeholder="User" disabled={connexion} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" required className="form-control" id="password" ref="password" placeholder="Password" disabled={connexion} />
                </div>
                <button type="submit" className="btn btn-default">Connect</button>
              </form>
            </div>
          </div>

          <div className="col-sm-offset-4 col-sm-8">

            <div className="form-group">
              <label htmlFor="actualRoot">Actual root</label>
              <input type="text" className="form-control" id="actualRoot"  ref="actualRoot" readOnly value={this.state.rootDirectory} />
            </div>
            <div className="form-group">
              <label htmlFor="newDirOrFile">New</label>
              <input type="text" ref="newDirOrFile" id="newDirOrFile" className="form-control" />
            </div>
            <FileButtons
                onCreate={() => this.onCreateDIrOrFile(event)}
                onDelete={() => this.onDeleteDIrOrFile(event)}
            />

            <h1 className="page-header">List Host</h1>

            <div className="row">

              {
                (hostList.length > 0) ? this.printFiles(hostList) : ''
              }

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
    onFtpListDir: (ftpInfo) => dispatch(ftpListDir(ftpInfo)),
    onCreateFtp: (ftpInfo)  => dispatch(createFtp(ftpInfo)),
    onDeleteFtp: (ftpInfo)  => dispatch(removeFtp(ftpInfo)),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ConnectionFtpContainer)
