import React, { Component } from 'react';
import './App.css';
import InfoBox from './components/InfoBox'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: null
    }
  }

  render() {
    return (
      <div className="app">
        <InfoBox />
      </div>
    );
  }
}

export default App;
