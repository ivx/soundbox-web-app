import React, { Component } from 'react';
import './App.css';
import ArcadeButton from './components/ArcadeButton';
import { Socket } from 'phoenix-socket';

class App extends Component {
  channel = null;

  state = {
    shift: false,
    help: false,
    buttons: null,
  };

  componentDidMount() {
    const socket = new Socket('ws://soundbox.world.domination/socket');

    socket.connect();

    this.channel = socket.channel('sound:lobby', {});
    this.channel
      .join()
      .receive('ok', response => {
        console.log('joined', response);
      })
      .receive('error', response => {
        console.log('error', response);
      });

    this.channel.on('buttons_updated', message => {
      console.log('update', message.data);
      this.handleButtonsReceived(message.data);
    });

    this.channel.push('get_buttons', {}).receive('ok', message => {
      console.log(message.data);
      this.handleButtonsReceived(message.data);
    });
  }

  handleButtonsReceived = buttons => {
    this.setState(prevState => ({
      ...prevState,
      buttons: {
        true: [
          [buttons[19], buttons[17], buttons[15], buttons[13], buttons[11]],
          [buttons[18], buttons[16], buttons[14], buttons[12], buttons[10]],
        ],
        false: [
          [buttons[9], buttons[7], buttons[5], buttons[3], buttons[1]],
          [buttons[8], buttons[6], buttons[4], buttons[2], buttons[0]],
        ],
      },
    }));
  };

  handleKeyDown({ keyCode }) {
    if (keyCode === 16) {
      this.handlePressShift();
    } else if (keyCode > 47 && keyCode < 58) {
      this.handlePressButton(this.state.shift ? keyCode - 38 : keyCode - 48);
    } else if (keyCode === 72) {
      this.setState(prevState => ({
        ...prevState,
        help: true,
      }));
    }
  }

  handleKeyUp({ keyCode }) {
    if (keyCode === 72) {
      this.setState(prevState => ({
        ...prevState,
        help: false,
      }));
    }
  }

  handleLabelChange = (id, title) => {
    this.channel.push('edit_button', { id, title });
  };

  handleSoundUpload = (file, id, title) => {
    this.channel.push('upload_sound', { id, title, file });
  };

  handlePressButton = id => {
    this.channel.push('push_button', { id });
  };

  handlePressShift = () => {
    this.setState(prevState => ({
      ...prevState,
      shift: !prevState.shift,
    }));
  };

  renderButtonRow = buttonRow => {
    return buttonRow.map(button => (
      <ArcadeButton
        btn_id={button.id}
        key={button.id}
        handlePress={this.handlePressButton}
        handleUpload={this.handleSoundUpload}
        handleLabelChange={this.handleLabelChange}
        label={button.title.substr(0, 25)}
        help={this.state.help}
      />
    ));
  };

  renderButtons = () => {
    if (!this.state.buttons) return null;

    const buttonRow = this.state.buttons[this.state.shift];

    return [
      <div className="button-row" key="button-row-1">
        {this.renderButtonRow(buttonRow[0])}
      </div>,
      <div className="button-row" key="button-row-2">
        <ArcadeButton
          btn_id="shift"
          key="btn_shift"
          active={this.state.shift}
          handlePress={this.handlePressShift}
          label="Shift"
          isShift
        />
        {this.renderButtonRow(buttonRow[1])}
      </div>,
    ];
  };

  render() {
    return (
      <div
        className="App"
        onKeyDown={this.handleKeyDown.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
        tabIndex={0}
      >
        <img src="devcon7_logo.svg" />
        {this.renderButtons()}
      </div>
    );
  }
}

export default App;
