import React, { Component } from 'react';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import EditableLabel from '../EditableLabel'

class ArcadeButton extends Component {
  constructor(props) {
    super(props);
    this.labelRotation = Math.floor(Math.random() * 12 + -5);
  }

  handleClick = () => {
    this.props.handlePress(this.props.btn_id);
  };

  handleLabelChange = text => {
    this.props.handleLabelChange(this.props.btn_id, text);
  }

  handleFileUpload = files => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.props.handleUpload(
          reader.result.split(',')[1],
          this.props.btn_id,
          file.name.slice(0, -4),
        );
      };
    }
  };

  render() {
    const classNames = classnames('arcade-button', {
      active: this.props.active,
    });

    return (
      <div className="button-wrapper">
        {this.props.isShift ? (
          <button
            className={classNames}
            onClick={this.handleClick}
            id={`btn_${this.props.btn_id}`}
          />
        ) : (
          <Dropzone
            disableClick
            accept="audio/mp3"
            onDrop={this.handleFileUpload}
            className="dropzone"
            activeClassName="dropzone-active"
          >
            <button
              className={classNames}
              onClick={this.handleClick}
              id={`btn_${this.props.btn_id}`}
            />
          </Dropzone>
        )}
        <EditableLabel 
          text={this.props.label} 
          onLabelChange={this.handleLabelChange} 
          editable={!this.props.isShift}
        />
      </div>
    );
  }
}

export default ArcadeButton;
