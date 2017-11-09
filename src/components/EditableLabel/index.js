import React, { Component } from 'react';

class EditableLabel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editing: false,
      text: this.props.text,
    };
  }

  changeEditing = editing => {
    this.setState(prevState => ({
      ...prevState,
      editing,
    }));
  }

  handleClick = () => {
    if (this.props.editable) this.changeEditing(true);
  };

  handleChange = (e) => {
    const text = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      text,
    }));
  }

  handleBlur = () => {
    this.changeEditing(false);
    this.setState(prevState => ({
      ...prevState,
      text: this.props.text,
    }));
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.onLabelChange(this.state.text);
      this.changeEditing(false);
    } else if (event.keyCode === 16) {
      event.stopPropagation();
    }
  }

  render() {
    if (this.state.editing) return( 
      <input 
        type='text' 
        value={this.state.text} 
        onChange={this.handleChange} 
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        autoFocus
      />
    );
    return (
      <div onClick={this.handleClick} style={{ transform: `rotate(${this.labelRotation}deg)` }}>
        <span className="button-label">{this.state.text}</span>
      </div>
    );
  }
}

export default EditableLabel;