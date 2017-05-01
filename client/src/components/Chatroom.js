import React, { Component } from 'react'
import '../styles/chatroom.css'
import { addMessage } from '../api/messaging'
import {connect} from 'react-redux'
import moment from 'moment';
import Login from './Login'

class Chatroom extends Component {
  constructor() {
    super()
    this.state = {
      message: '', 
      
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

     handleSubmit = (e) => {
       e.preventDefault()
    addMessage({
      message:this.state.message,
      username:this.props.username,
      timeNow:moment().format('LTS')
      })
    this.setState({
      message:''
      })
    }
  componentWillUpdate() {
        var node = this.refs.messages
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            var node = this.refs.messages
            node.scrollTop = node.scrollHeight
        }
    }
  

  render() {
 
    return (
      <div className="chatWindow">
          <div className="messageWindow" ref="messages">
          <ul>
           {this.props.messages.map((message, i)=>(
            <ul className="message">
              <div className="bubbleDiv">
                <div className="nameTime">
                  <li>{message.username}</li><span className="timeStamp"><li>{message.timeNow}</li></span>
                
                </div>
                <li>{message.message}</li>
              </div>
            </ul>
          ))}
         </ul>
         
        </div>
        <div className="formContainer">
          <form className="chatForm" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} name="message" type="text" placeholder="Send a message..." value={this.state.message}/>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(appState){
  return{
    messages: appState.messages, 
    username: appState.username
  }
}

export default connect(mapStateToProps)(Chatroom)
