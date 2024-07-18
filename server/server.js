const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

const PORT = 8765;

app.use(cors());
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log("New connection: ", socket.id);

    // Example of emitting sensor data for testing purposes
    setInterval(() => {
        const sensorData = 'Humidity: 84.00% Temperature: 27.10°C 80.78°F Heat index: 30.37°C 86.67°F';
        socket.emit('sensor_data', sensorData);
    }, 5000);

    socket.on('disconnect', () => {
        console.log('Client disconnected: ', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
