import React, { Component } from 'react';
import classnames from 'classnames';

class ArcadeButton extends Component {
  handleClick = () => {
    alert('alaaarrm!');
  };

  render() {
    const classNames = classnames('arcade-button');

    return (
      <button className={classNames} onClick={this.handleClick}>
        ArcadeButton
      </button>
    );
  }
}

export default ArcadeButton;
