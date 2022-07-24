import { io } from "socket.io-client";

const socket=await io('http://localhost:3000',{
    reconnectionAttempts:5,
    reconnectionDelay:2000
}); // Async Function

const socket2=await io('http://localhost:3000/notification');

socket2.on('connect',()=>{
    displayMessage("Connected to Notification namespace");
})





// socket.emit('send-message',{
//     message:"Helo my first message trough socket"

// });


socket.on('message-sent',(res)=>{
    console.log(res);
})
socket.on('receive-message',message=>{
    displayMessage(message);
})
socket.on('connect',()=>{
    displayMessage(`You are Connected to ${socket.id}`)
});


const messageInput=document.getElementById('message-input');
const messageButton=document.getElementById('message-button');
const form=document.getElementById('form');
const roomButoon=document.getElementById('room-button');
const roomInput=document.getElementById('room-input');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const message=messageInput.value;
    const room=roomInput.value;
    socket.emit('send-message',message,room);
    displayMessage(message);
})


function displayMessage(message){
    const messageDiv=document.getElementById('message-container');
    const msgDiv=document.createElement('div');
    msgDiv.textContent=message;

    messageDiv.append(msgDiv);
}

roomButoon.addEventListener('click',(e)=>{
    e.preventDefault();
    const room=roomInput.value;
    socket.emit('join-room',room,(message)=>{
        displayMessage(message);
    })
})