import React, { Component } from 'react';
import './App.css';
import ArcadeButton from './components/ArcadeButton';
import { Socket } from 'phoenix-socket';

class App extends Component {
  channel = null;

  constructor(props) {
    super(props);
    this.state = { shift: false };
  }

  keyDownListener({ keyCode }) {
    if (keyCode === 16) {
      this.handlePressShift();
    } else if (keyCode > 47 && keyCode < 58) {
      this.handlePressButton(this.state.shift ? keyCode - 38 : keyCode - 48);
    }
  }

  componentDidMount() {
    this.setState();

    const socket = new Socket('ws://soundbox.world.domination/socket');

    socket.connect();

    this.channel = socket.channel('sound:lobby', {});
    this.channel
      .join()
      .receive('ok', response => {
        console.log('joined', response);
      })
      .receive('error', response => {
        console.log('error');
      });

    this.channel.push('get_buttons', {}).receive('ok', message => {
      console.log(message.data);
      this.handleButtonsReceived(message.data);
    });
    
    document.addEventListener('keydown', this.keyDownListener.bind(this));
  }
  
  handleSoundUpload = (file, btn_id, btn_title) => {
    this.channel
      .push("upload_sound", { id: btn_id, title: btn_title, file })
      .receive("ok", () => {
        this.channel.push("get_buttons", {}).receive("ok", message => {
          console.log(message.data);
          this.handleButtonsReceived(message.data);
        });
      });
  };

  handleButtonsReceived = buttons => {
    const button_set_0_0 = buttons.splice(0, 5);
    const button_set_0_1 = buttons.splice(0, 5);
    const button_set_1_0 = buttons.splice(0, 5);
    const button_set_1_1 = buttons;

    this.setState(prevState => ({
      ...prevState,
      button_set_0_0: button_set_0_0,
      button_set_0_1: button_set_0_1,
      button_set_1_0: button_set_1_0,
      button_set_1_1: button_set_1_1,
    }));
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

  renderButtonRow = buttons => {
    return buttons.map(button => (
      <ArcadeButton
        btn_id={button.id}
        key={button.id}
        handlePress={this.handlePressButton}
        handleUpload={this.handleSoundUpload}
      >
        {button.title.substr(0, 10)}
      </ArcadeButton>
    ));
  };

  renderButtons = () => {
    if (!this.state.button_set_0_0) return null;

    const row_1 = this.state.shift
      ? this.state.button_set_1_0
      : this.state.button_set_0_0;
    const row_2 = this.state.shift
      ? this.state.button_set_1_1
      : this.state.button_set_0_1;

    return [
      <div className="button-row" key="button-row-1">
        {this.renderButtonRow(row_1)}
      </div>,
      <div className="button-row" key="button-row-2">
        <ArcadeButton
          btn_id="shift"
          key="btn_shift"
          active={this.state.shift}
          handlePress={this.handlePressShift}
        >
          Shift
        </ArcadeButton>

        {this.renderButtonRow(row_2)}
      </div>,
    ];
  };

  render() {
    return (
      <div className="App">
        <img src="devcon7_logo.svg" />
        {this.renderButtons()}
      </div>
    );
  }
}

export default App;
