import React, { Component } from 'react';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';

class ArcadeButton extends Component {
  constructor(props) {
    super(props);
    this.labelRotation = Math.floor(Math.random() * 12 + -5);
  }

  handleClick = () => {
    this.props.handlePress(this.props.btn_id);
  };

  handleFileUpload = files => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.props.handleUpload(
          reader.result.split(',')[1],
          this.props.btn_id,
          file.name,
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
        <div style={{ transform: `rotate(${this.labelRotation}deg)` }}>
          <span className="button-label">{this.props.children}</span>
        </div>
      </div>
    );
  }
}

export default ArcadeButton;
