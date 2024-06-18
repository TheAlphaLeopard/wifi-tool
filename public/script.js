// script.js
const socket = io();

socket.on('connect', () => {
    fetch('https://ipinfo.io/json?token=YOUR_TOKEN_HERE')
        .then(response => response.json())
        .then(data => {
            document.getElementById('public-ip').textContent = data.ip;
            document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country}`;
            document.getElementById('isp').textContent = data.org;
            document.getElementById('hostname').textContent = data.hostname;
        })
        .catch(error => console.error('Error fetching IP info:', error));
});

socket.on('routerData', (data) => {
    console.log('Received router data from server:', data);
});
