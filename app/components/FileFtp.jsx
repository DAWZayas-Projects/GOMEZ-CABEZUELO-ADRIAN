import React, { PropTypes } from 'react';

class FileFtp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
        <li className="custom-file" onClick={() => this.props.ChangeRoot(event, this.props.root)} >
          { this.props.file.name }
          <i className="fa fa-file-o fa-sm" aria-hidden="true"></i>
        </li>
    )
  }
}

FileFtp.propTypes = {
  file: React.PropTypes.object,
  host: React.PropTypes.string,
  user: React.PropTypes.string,
  password: React.PropTypes.string,
  root: React.PropTypes.string,
  ChangeRoot: React.PropTypes.func,
}

export default FileFtp
