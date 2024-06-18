// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Simulating router data retrieval
    const routerData = {
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces(),
        uptime: os.uptime(),
    };
    
    socket.emit('routerData', routerData);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
