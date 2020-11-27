import axios from 'axios';
export const authenticate=(jwt,next)=>{
     if(typeof window != undefined)
    {
        localStorage.setItem("jwt",JSON.stringify(jwt));
    }
    next();
};

export const signout=(next)=>{
    if(typeof window != undefined)
    {
        localStorage.removeItem("jwt");
        next();
        axios.get("http://localhost:8080/signout")
        .then(res=>{
            console.log(res);
        })
        .catch(err=>console.log(err));
    }
};

export const isAuthenticated=()=>{
    if(typeof window != undefined)
    {
        if(localStorage.getItem("jwt"))
            return JSON.parse(localStorage.getItem("jwt"));
        else
            return false;
    }
};
