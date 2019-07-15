import React from 'react';
import './App.css';
import coolpic from './puppy.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker.js'
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Camera from 'react-snap-pic';

class App extends React.Component { 

  constructor(props) { super(props) ;
  
    this.state = {
    messages:[],
    name:'',
    editName:false,
    showCamera:false
}
  }
  componentWillMount(){
    var name = localStorage.getItem('name')
    if(name){
      this.setState({name})
    }

    /* <=========================> */
    firebase.initializeApp({
      apiKey: "AIzaSyBkpfykf6-EJiOVNd6VCTKy7_HEKV5EBI8",
      authDomain: "chat-fc2cc.firebaseapp.com",
      projectId: "chat-fc2cc",
      storageBucket: "chat-fc2cc.appspot.com",
    });
    
    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
    /* <=========================> */
  }


  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a,b)=>b.ts-a.ts)
    this.setState({messages})
  }

  takePicture = (img) => {
    console.log(img)
    this.setState({showCamera:false})
}

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }

  gotMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages]
    this.setState({messages: newMessagesArray})
}

setEditName = (editName) => {
  if(!editName){
    localStorage.setItem('name', this.state.name)
  }
  this.setState({editName})
}
render() {
  var {messages,name,editName} = this.state
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
          setEditName={this.setEditName}
/>
      </header>
      <main className="messages">
       {messages.map((m,i)=>{
          return <Message key ={i} m={m} name ={name}/>
       })}
      </main>
      <TextInput sendMessage={text=> this.send({text})} 
     showCamera={()=>this.setState({showCamera:true})}

/>
{this.state.showCamera && <Camera takePicture={this.takePicture} />}
    </div>
  )
}
}
export default App;

function Message(props){
  var{m, name} = props
    return(<div className="bubble-wrap" 
  from={m.from=== name ? "me" : "you"}>
    <div className="bubble">
      <span>{m.text}</span>
    </div>
    {m.from!==name && <div className ="bubble-name">
      {m.from}
    </div>}
    </div>)
}