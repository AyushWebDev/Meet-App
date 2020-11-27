const express=require('express');
const User=require('../models/userModel');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const router=express.Router();

router.post('/signup',(req,res)=>{
    User.findOne({email: req.body.email})
    .then(data=>{
        if(data)
            return res.json({error: "Account with that email already exist"});
        
            const user=new User(req.body);
            user.save()
            .then(data=>{
                res.json({
                    msg: "user added",
                    result: data
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error: err
                })
            });
        
    });
   
});

router.post("/signin",(req,res)=>{
    User.findOne({email: req.body.email})
    .then(u=>{
        if(!u){
            return res.json({
                error: "Account doesn't exist with that email"
            })
        }

        if(!u.authenticate(req.body.password)){
            return res.json({
                error: "Password is Incorrect.Please Try with correct password again"
            })
        }

        const token=jwt.sign({_id: u._id},process.env.JWT_SECRET)
        res.cookie("signin",token,{expire: new Date()+9999});

        const {_id,username,email}=u;
        res.json({token,user: {
            _id,
            username,
            email
        },
        msg: "Signed In Successfully"
    })

    })
});

router.get("/signout",(req,res)=>{
    res.clearCookie("signin");
    res.json({msg: "Signed out succesfully"});
})

module.exports=router;