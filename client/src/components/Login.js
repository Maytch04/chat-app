import React, { Component } from 'react'
import { login } from '../api/messaging'
import '../styles/login.css'


class Login extends Component{
    constructor(){
        super()
        this.state = {
            username:''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        login(this.state.username)
        this.setState({
            username:''
        })
        this.props.history.push('/chatroom')
    }
    
    render(){
        console.log(this.state.username)
        return(
            
            <div className="loginContainer">
                <div className="name"><p>Let's Chat</p></div>
                    <form className="formLogin" onSubmit={this.handleSubmit}>
                        <div className="textField"><input placeholder="Enter Your Username" name="username" onChange={this.handleChange} value={this.state.username}/>
                        </div>
                    </form>
                
            </div>
        )
    }
}

export default Login