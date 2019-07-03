import React from 'react';
import './App.css';
import coolpic from './puppy.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker.js'

class App extends React.Component { 

 state = {
    messages:[],
    name:'',
    editName:false,
  } 

  gotMessage =(text) => {
    var newMessagesArray =[...this.state.messages,text]
    this.setState({messages: newMessagesArray})
  }


render() {
  var {messages} = this.state
  return (
    <div className="App">
      <header className="header">
        <img src={coolpic} className="logo" alt="logo" />
        chat
      </header>
      <main className="messages">
       {messages.map((m,i)=>{
          return (<div key={i} className="bubble-wrap">
            <div className="bubble">
              <span>{m}</span>
            </div>
          </div>)
       })}
      </main>
      <TextInput sendMessage={this.gotMessage} />
    </div>
  )
}
}
export default App;
