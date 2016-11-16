import React, { Component, PropTypes, } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import $ from 'jquery'

class FormDropzone extends Component {

  constructor(props) {
    super(props)

    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: false
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: 'no-url'
    };
  }

  uploadFtp() {

    const files = this.refs.dropzone.dropzone.files
    //need tpo implement
  }



  handleFileAdded(file) {
    console.log(file);
    this.uploadFtp(file)
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    const eventHandlers = {
      addedfile: this.handleFileAdded.bind(this),
    }
    return (
      <div>
        <DropzoneComponent ref="dropzone" config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
        <button className="btn btn-success" type="submit" onClick={() => this.uploadFtp()}>
          Submit
        </button>
      </div>
    );
  }
}

export default FormDropzone
