import { io } from "socket.io-client";

const socket=io('http://localhost:3000');
socket.emit('send-message',{
    receiverId:"2345678",
    message:"this is not a message"
});
socket.emit('send-notification',"notification is received");