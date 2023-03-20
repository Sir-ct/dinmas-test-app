// import express from 'express'import path from 'path';
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const Socket = require('./App/socket/socket');
const path = require('path');

//set app env
const app = express();
const server = http.createServer(app);

// Set up socket
const { SocketInstance } = Socket.createSocket(server);
SocketInstance(server);

//set static files
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
	res.sendFile("/index.html")
})



//listen and port
const PORT = 4000 || process.env.port;
server.listen(PORT, () =>
	console.log('Server is runing on port ' + PORT),
);
