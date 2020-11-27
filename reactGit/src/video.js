import React from 'react';
import io from 'socket.io-client';
import {isAuthenticated} from './form/auth';
import {Redirect} from 'react-router-dom';

class Video extends React.Component{
    render()
    {
        const mystyle={
            display: "grid",
            gridTemplateColumns: "repeat(auto,300px)",
            gridAutoRows: "300px"
        }
        return(
            <div style={mystyle}>
                yo
            </div>
        )
    }
}
export default Video;