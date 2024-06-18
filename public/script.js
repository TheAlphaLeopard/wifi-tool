// script.js
const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('routerData', (data) => {
    document.getElementById('info').textContent = JSON.stringify(data, null, 2);
});
