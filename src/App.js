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
        <div className="row">
          <div className="small-12 columns callout app-wrapper">
            <InfoBox />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
