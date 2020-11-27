import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {authenticate} from './auth';

class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            email: "",
            password: ""
        }
    }

    handleChange=name=>event=>{
        event.preventDefault();
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit=event=>{
        event.preventDefault();
        const {email,password}=this.state;
        const user={
            email,
            password
        }
        axios.post("http://localhost:8080/user/signin",user)
        .then(res=>{
            if(res.data.error)
            {
                this.setState({
                    error: res.data.error
                })
                console.log(res.data)
            }
            else{
                authenticate(res.data,()=>{
                    this.setState({
                        email: "",
                        password: "",
                        open: true,
                        redirect: true
                    })
                });
                
                console.log(res.data);
            }
        })
        .catch(err=>console.log(err));
        
    }
    

    render(){
        if(this.state.redirect)
           return <Redirect to="/"/>
        return(
            <div className="container">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                 {this.state.error && 
                        <div className="alert alert-danger">
                            {this.state.error}
                        </div>
                    }
                    {this.state.open &&
                        <Redirect to="/"/>
                    }
                 <form style={{border: "1px solid",padding : "30px", boxShadow: "5px 5px 10px"}}>
                    <h2>Signin</h2>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter Email" onChange={this.handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.handleChange("password")}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-raised"> 
                                SIGN IN
                            </button>
                        </div>
                    </form>
            </div>
            </div>
        )
    }
}
export default Signin;