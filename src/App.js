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

  componentDidMount() {
    this.setState();

    const socket = new Socket('ws://soundbox.world.domination:4000/socket');

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
  }

  handleButtonsReceived = buttons => {
    const button_set_0 = buttons.splice(0, 10);
    const button_set_1 = buttons;

    this.setState(prevState => ({
      ...prevState,
      button_set_0: button_set_0,
      button_set_1: button_set_1,
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

  renderButtons = () => {
    if (!this.state.button_set_0) return null;
    return this.state.button_set_0.map(button => (
      <ArcadeButton
        id={button.id}
        key={button.id}
        handlePress={this.handlePressButton}
      >
        {button.title}
      </ArcadeButton>
    ));
  };

  render() {
    return (
      <div className="App">
        {this.renderButtons()}
        <ArcadeButton
          id="btn_shift"
          key="btn_shift"
          handlePress={this.handlePressShift}
        >
          Shift
        </ArcadeButton>
      </div>
    );
  }
}

export default App;
