import React, { Component } from 'react';
import TreeChart from './components/TreeChart';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CSE204 Group Project</h1>
        </header>
        <p className="App-intro"></p>
        <TreeChart />
      </div>
    );
  }
}

export default App;
