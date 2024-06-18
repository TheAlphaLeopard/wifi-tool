const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const compression = require('compression');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(compression());
app.use(express.static(__dirname + '/public', {
    maxAge: '1d' // Cache static files for one day
}));

io.on('connection', (socket) => {
    console.log('New client connected');
    
    const serverData = {
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces(),
        uptime: os.uptime(),
    };
    
    socket.emit('routerData', serverData);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
