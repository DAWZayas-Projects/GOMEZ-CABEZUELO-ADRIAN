import React from 'react';
import DirectoryFtp from '../components/DirectoryFtp'
import FileFtp from '../components/FileFtp'
import FileButtons from '../components/FileButtons'
import FormDropzone from '../components/FormDropzone'

class FormManager extends React.Component {

  constructor(props) {
    super(props)
  }

  onCreateDIrOrFile(event) {
    event.stopPropagation()
    const { host, user, password, root } = this.props.ftp
    this.props.onCreateFtp({
      host :        host,
      user :        user,
      password :    password,
      root :        root,
      newDirOrFile: this.refs.newDirOrFile.value,
    })
  }

  onDeleteDIrOrFile(event) {
    event.stopPropagation()
    const { host, user, password, root } = this.props.ftp
    this.props.onDeleteFtp({
      host :        host,
      user :        user,
      password :    password,
      root :        root,
      newDirOrFile: this.refs.newDirOrFile.value,
    })
  }

  onMoveDirOrFile(event) {
    event.stopPropagation()
    const { host, user, password, root } = this.props.ftp
    this.props.onMoveFtp({
      host :        host,
      user :        user,
      password :    password,
      root :        root,
      newDirOrFile: this.refs.newDirOrFile.value,
    })
  }

  onUploadFile(event, body) {
    event.stopPropagation()
    const { host, user, password, root } = this.props.ftp

    body.append(host, host);
    body.append(user, user);
    body.append(password, password);
    body.append(root, root);

    this.props.onUploadFtp(body)
  }

  printDirectory(directory, index) {
    const { host, user, password } = this.props.ftp
    return (
      <DirectoryFtp
        dir           = { directory }
        key           = { index }
        host          = { host }
        user          = { user }
        password      = { password }
        root          = { directory.root }
        ListDirectory = { this.props.onFtpListDir.bind(this) }
        ChangeRoot    = { this.onClickFile.bind(this) }
      />
    )
  }

  printFile(file, index) {
    const { host, user, password } = this.props.ftp
    return (
      <FileFtp
        file          = { file }
        key           = { index }
        host          = { host }
        user          = { user }
        password      = { password }
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
    this.props.onChangeRoot(root)
  }

  render() {
    const hostList  = this.props.ftp.hostList || []

    return (
      <div className="col-sm-offset-3 col-sm-9">
        
        <h1 className="page-header">Host: {this.props.ftp.host}</h1>
        
        <div className="row">
          <div className="col-sm-6">

            <div className="form-group">
              <label htmlFor="actualRoot">Actual root</label>
              <input type="text" className="form-control" id="actualRoot"  ref="actualRoot" readOnly value={this.props.ftp.root} />
            </div>
            
            <div className="form-group">
              <label htmlFor="newDirOrFile">New</label>
              <input type="text" ref="newDirOrFile" id="newDirOrFile" className="form-control" />
            </div>  
            
            <div className="">
              <FileButtons
                onCreate={() => this.onCreateDIrOrFile(event)}
                onDelete={() => this.onDeleteDIrOrFile(event)}
                onMove={() => this.onMoveDirOrFile(event)}
              />
            </div>
            <br />
            <br />
            <FormDropzone
              onUpload = {(file) => this.onUploadFile(event, file)}
              ftp      = { this.props.ftp }
            />

          </div>

          <div className="col-sm-5">
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

FormManager.propTypes = {
  onFtpListDir: React.PropTypes.func,
}

export default FormManager
