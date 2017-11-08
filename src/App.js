import React, { Component } from 'react';
import './App.css';
import ArcadeButton from './components/ArcadeButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ArcadeButton id="btn_0" />
        <ArcadeButton id="btn_1" />
        <ArcadeButton id="btn_2" />
        <ArcadeButton id="btn_3" />
        <ArcadeButton id="btn_4" />
        <ArcadeButton id="btn_5" />
        <ArcadeButton id="btn_6" />
        <ArcadeButton id="btn_7" />
        <ArcadeButton id="btn_8" />
        <ArcadeButton id="btn_9" />
        <ArcadeButton id="btn_shift" />
      </div>
    );
  }
}

export default App;
