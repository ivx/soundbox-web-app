import React, { Component } from 'react';
import classnames from 'classnames';

class ArcadeButton extends Component {
  handleClick = () => {
    this.props.handlePress(this.props.btn_id);
  };

  render() {
    const classNames = classnames('arcade-button', {
      active: this.props.active,
    });

    return (
      <button
        className={classNames}
        onClick={this.handleClick}
        id={`btn_${this.props.btn_id}`}
      >
        {this.props.children}
      </button>
    );
  }
}

export default ArcadeButton;
