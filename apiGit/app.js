const express=require('express');
const app=express();
const server=require('http').createServer(app);
const socketio=require('socket.io');
const io=socketio(server);

const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require("body-parser");

mongoose.connect('mongodb://localhost:27017/socketChat',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("DB connected");
});
mongoose.connection.on('error',err=>{
    console.log("Db connection err",err.message);
})

const userRouter=require('./router/userRouter');

app.use(bodyParser.json());
app.use(cors()); 
app.use('/user',userRouter);
io.on('connection',socket=>{
    console.log("user connected");
    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
    socket.on('message',data=>{
        io.emit('received',data);
    })
})


server.listen(8080,()=>{
    console.log("Server started at 8080");
})  


