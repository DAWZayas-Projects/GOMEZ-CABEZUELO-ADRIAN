import React, { Component, PropTypes, } from 'react';
import DropzoneComponent from 'react-dropzone-component';


class FormDropzone extends Component {

  constructor(props) {
    super(props)

    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: true
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: 'ftp/upload'
    };
  }



  handleFileAdded(file, xhr, formData) {
    formData.append('file', file)
    formData.append('host', this.props.host)
    formData.append('password', this.props.password)
    formData.append('user', this.props.user)
    formData.append('root', this.props.root)
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    const eventHandlers = {
      sending: this.handleFileAdded.bind(this),
    }
    return (
      <div>
        <DropzoneComponent ref="dropzone" config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
      </div>
    );
  }
}

export default FormDropzone
