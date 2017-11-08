import React, { Component } from 'react';
import classnames from 'classnames';

class ArcadeButton extends Component {
  constructor(props) {
    super(props);
    this.labelRotation = Math.floor(Math.random() * 12 + -5);
  }

  handleClick = () => {
    this.props.handlePress(this.props.btn_id);
  };

  render() {
    const classNames = classnames('arcade-button', {
      active: this.props.active
    });

    return (
      <div className="button-wrapper">
        <button
          className={classNames}
          onClick={this.handleClick}
          id={`btn_${this.props.btn_id}`}
        />
        <div style={{ transform: `rotate(${this.labelRotation}deg)` }}>
          <span className="button-label">{this.props.children}</span>
        </div>
      </div>
    );
  }
}

export default ArcadeButton;
