import React from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Signin from "./form/signin";
import Signup from "./form/signup";
import Chat from "./chat";
import Video from "./video";
import Navbar from "./main/navbar";

class App extends React.Component{
  render(){
    return(
      
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/" component={Chat}/>
          <Route exact path="/video" component={Video}/>
        </Switch>
      </BrowserRouter>
      
    )
  }
}

export default App;
