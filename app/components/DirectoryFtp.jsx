import React, { PropTypes } from 'react';

class DirectoryFtp extends React.Component {

  constructor(props) {
    super(props)
  }

  onClickListDirectory(event) {
    event.preventDefault()
    const {host, user, password, root} = this.props
    this.props.ListDirectory({ host, user, password, root })
  }

  onClickDirectory(event) {
    event.preventDefault()
    const {root} = this.props
    this.props.ChangeRoot(event, root)
  }

  render() {

    return (
        <li className="custom-directory" onClick={ (event) => this.onClickDirectory(event) } >
          { this.props.dir.name } 
          <div>
            <i style={{'marginRight': '10px'}} className="fa fa-eye fa-sm" aria-hidden="true" 
              onClick={ (event) => this.onClickListDirectory(event)}>
            </i>
            <i className="fa fa-folder-open-o" aria-hidden="true"></i>
          </div>   
        </li>
    )
  }
}

DirectoryFtp.propTypes = {
  dir: React.PropTypes.object,
  host: React.PropTypes.string,
  user: React.PropTypes.string,
  password: React.PropTypes.string,
  root: React.PropTypes.string,
  ChangeRoot:  React.PropTypes.func,
  ListDirectory: React.PropTypes.func,
}

export default DirectoryFtp
