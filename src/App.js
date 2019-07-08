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

  gotMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    var newMessagesArray = [...this.state.messages, message]
    this.setState({messages: newMessagesArray})
}


render() {
  var {messages} = this.state
  return (
    <div className="App">
      <header className="header">
        <div>
        <img src={coolpic} className="logo" alt="logo" />
        chat
        </div>
        <NamePicker 
          name={this.state.name}
          editName={this.state.editName}
          changeName={name=> this.setState({name})}
          setEditName={editName=> this.setState({editName})}
/>
      </header>
      <main className="messages">
       {messages.map((m,i)=>{
          return (<div key={i} className="bubble-wrap">
            <div className="bubble">
              <span>{m.text}</span>
            </div>
            <div className ="bubble-name">
              <span>{m.from}</span>
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
