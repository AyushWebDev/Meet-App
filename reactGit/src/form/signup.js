import React,{Component} from 'react';
import axios from 'axios';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            email: "",
            password: "",
            open: false,
            error: ""
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
        const {username,email,password}=this.state;
        const user={
            username,
            email,
            password
        }

        axios.post("http://localhost:8080/user/signup",user)
        .then(res=>{
            if(res.data.error)
            {
                console.log("error",res.data.error);
                this.setState({
                    error: res.data.error
                })
            }
            else{
                console.log(res.data);

                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    open: true,
                    error: ""
                })

                
            }
        });

       
        
    }
    

    render(){
        return(
            <div className="container">
            <div className="col-md-4"></div>
            <div>
                 {this.state.open && 
                        <div className="container alert alert-success">
                        
                            <h2>New User Added</h2>
                        
                        </div>
                    }

                    {this.state.error &&
                    <div className="container alert alert-danger">
                         
                            <h6>{this.state.error}</h6>
                        
                    </div>
                    }     
                 <form style={{border: "1px solid",padding : "30px", boxShadow: "5px 5px 10px"}}>
                    <h2>Create User</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.handleChange("username")}/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter Email" onChange={this.handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.handleChange("password")}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-raised"> 
                                SIGN UP
                            </button>
                        </div>
                    </form>
            </div>
            </div>
        )
    }
}
export default Signup;