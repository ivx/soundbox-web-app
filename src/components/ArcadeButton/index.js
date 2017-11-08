import React, { Component } from 'react';
import classnames from 'classnames';

class ArcadeButton extends Component {
  handleClick = () => {
    this.props.handlePress(this.props.id);
  };

  render() {
    const classNames = classnames('arcade-button');

    return (
      <button
        className={classNames}
        onClick={this.handleClick}
        id={`btn_${this.props.id}`}
      >
        {this.children}
      </button>
    );
  }
}

export default ArcadeButton;
