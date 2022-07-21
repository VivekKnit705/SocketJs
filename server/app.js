const { Socket } = require('socket.io');
const io=require('socket.io')(3000,{
    cors:{
        origin:['http://localhost:8080']
    }
});



io.on('connection',(Socket)=>{
    console.log("receive socket connection",Socket.id);

    Socket.on('send-message',(receiverId,message)=>{
        console.log(receiverId,message);
    })
    Socket.on('send-notification',(Notification)=>{
        console.log(Notification);
    })
})
