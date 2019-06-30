import React from 'react';
import './App.css';
import coolpic from './puppy.png'
import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={coolpic} className="logo" alt="logo" />
              chat
      </header>
      <TextInput/>
    </div>
  );
}

export default App;
