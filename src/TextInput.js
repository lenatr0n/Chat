import React from 'react'
import { FiSend, FiCamera } from 'react-icons/fi'
class TextInput extends React.Component {


  state={
    text:"",
  }

  send = () => {
    this.props.sendMessage(this.state.text)
    this.setState({text:""})
  }

  keyPress = (e) => {
    if(e.key==='Enter'){
     this.send()
  }  
}
  render(){
    return(<div className = "text-input">
    <button onClick={this.props.showCamera}
    style={{left:10, right:'auto'}}>
    <FiCamera style={{height:15, width:15}} />
</button>
    <input value ={this.state.text}
    placeholder="Write your message here..."
    onChange={e=> this.setState({text: e.target.value})}
    onKeyPress={this.keyPress}
    />
    <button disabled ={!this.state.text}
      onClick ={this.send}>
      <FiSend style={{height:15,width:15}}/>
    </button>
    </div>)
  }

}

export default TextInput