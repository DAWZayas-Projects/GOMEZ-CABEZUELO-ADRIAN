import React, { PropTypes } from 'react';

class FileButtons extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="btn-group">
        <button type="button" onClick={this.props.onCreate.bind(null, event)} className="btn btn-success">Create</button>
        <button type="button" onClick={this.props.onMove.bind(null, event)} className="btn btn-warning">Rename/Move</button>
        <button type="button" onClick={this.props.onDelete.bind(null, event)} className="btn btn-danger">Remove</button>
      </div>
    )
  }
}

FileButtons.propTypes = {
  onDelete: React.PropTypes.func,
  onMove: React.PropTypes.func,
  onCreate: React.PropTypes.func,
}

export default FileButtons
