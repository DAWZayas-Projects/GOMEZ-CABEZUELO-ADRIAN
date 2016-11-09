import React, { PropTypes } from 'react';

class FileButtons extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="btn-group">
        <button type="button" onClick={() => this.props.onCreate()} className="btn btn-success">Create</button>
        <button type="button" onClick={() => this.props.onRename()} className="btn btn-warning">Rename</button>
        <button type="button" onClick={() => this.props.onDelete()} className="btn btn-danger">Remove</button>
      </div>
    )
  }
}

FileButtons.propTypes = {
  onDelete: React.PropTypes.func,
  onRename: React.PropTypes.func,
  onCreate: React.PropTypes.func,
}

export default FileButtons
