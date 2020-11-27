import React from 'react';
import io from 'socket.io-client';
import {isAuthenticated} from './form/auth';
import {Redirect} from 'react-router-dom';

class Chat extends React.Component{
    constructor(props){
      super(props);
      this.state={
        name: "",
        msg: "",
        msgList: [
          {
            name: "",
            msg: ""
          }
        ],
        redirect: false
      }
      this.socket=io('localhost:8080');
      this.socket.on("received",data=>{
        this.setState(state=>({
          msgList: [...state.msgList,data]
        }))
    })
    // if(isAuthenticated())
    //     {
    //         this.setState({
    //             name: isAuthenticated().user.username
    //         })
    //     }
    //     else{
    //         this.setState({
    //             redirect: true
    //         })
    //     }
    }
    
    componentDidMount(){
        if(isAuthenticated())
        {
            this.setState({
                name: isAuthenticated().user.username
            })
        }
        else{
            this.setState({
                redirect: true
            })
        }
    }
  
    handleChange=name=>event=>{
      event.preventDefault();
      this.setState({
        [name]: event.target.value
      })
    }
  
    handleSubmit=event=>{
      const {name,msg}=this.state;
      this.socket.emit('message',{name,msg});
      
    }
    render(){
        if(this.state.redirect)
           return <Redirect to="/signin"/>
      return(
         
        <div className="col-md-4">
          <div>
              {
                this.state.msgList.map(m=>{
                return <p><b>{m.name}</b> {m.msg}</p>
                })
              }
          </div>
          <input type="text" placeholder="type message" onChange={this.handleChange("msg")} value={this.state.msg}></input>
          <button onClick={this.handleSubmit}>Send</button>
        </div>
        
      )
    }
  }

  export default Chat;