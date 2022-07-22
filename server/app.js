const { Socket } = require('socket.io');
const io=require('socket.io')(3000,{
    cors:{
        origin:['http://localhost:8080'],
       
    }
});



io.on('connection',(Socket)=>{
    console.log("receive socket connection",Socket.id);

    Socket.on('send-message',(message,room)=>{
        console.log(message)
        if(!room){
            Socket.broadcast.emit('receive-message',message);  
        }
        else{
            Socket.to(room).emit('receive-message',message);
        }
    })
        
        // Socket.emit("message-sent",{
        //     message:"Succesfully sent",
        //     data:message
        // })
    
        Socket.on('join-room',(room,cb)=>{
            Socket.join(room);
            cb(`joined the room ${room}`); 
        })
})